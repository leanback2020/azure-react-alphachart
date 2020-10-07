const { MongoClient } = require("mongodb")
const axios = require("axios")

const config = {
  url: process.env.MONGODB,
  dbName: "ReactAlphaChart",
}

async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true,
  })
  const db = connection.db(config.dbName)
  return {
    connection,
    db,
  }
}

async function GetTickerData(symbols) {
  const params = { symbols: symbols }
  var retVal = []
  await axios
    .get("https://query1.finance.yahoo.com/v7/finance/quote?", { params })
    .then((response) => {
      console.log(response)
      msftres = response.data.quoteResponse.result[0].regularMarketPrice
      console.log("RES: " + msftres)
      const apiResponse = response.data.quoteResponse.result

      if (Array.isArray(apiResponse)) {
        apiResponse.forEach((stockData) => {
          var stock = {
            id: stockData["messageBoardId"],
            ticker: stockData["symbol"],
            percent: stockData["regularMarketChangePercent"].toFixed(2),
            last: stockData["regularMarketPrice"],
          }
          retVal.push(stock)
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  return retVal
}

module.exports = async (context, req) => {
  const { db, connection } = await createConnection()
  const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: "Please enter the correct user id!",
    }
    return
  }
  console.log("ID: " + id)
  const WatchList = db.collection("watchlist")
  const result = await WatchList.find({ userid: id })
  const data = await result.toArray()
  var symbols = ""
  data.forEach((stockData) => {
    console.log(`Ticker ${stockData["ticker"]}`)
    symbols = symbols + stockData["ticker"] + ","
  })

  const body = await GetTickerData(symbols.substring(0, symbols.length - 1))
  connection.close()
  context.res = {
    status: 200,
    body,
  }
}

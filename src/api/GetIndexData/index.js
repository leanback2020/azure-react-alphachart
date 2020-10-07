const axios = require("axios")

async function GetIndexData(symbols) {
  const params = { symbols: symbols }
  var retVal = []
  //Nasdaq
  await axios
    .get("https://query1.finance.yahoo.com/v7/finance/quote?", { params })
    .then((response) => {
      console.log(response)
      msftres = response.data.quoteResponse.result[0].regularMarketPrice
      console.log("RES: " + msftres)
      const apiResponse = response.data.quoteResponse.result

      if (Array.isArray(apiResponse)) {
        apiResponse.forEach((stockData) => {
          var name = ""
          if (stockData["symbol"] === "^IXIC") name = "Nasdaq"
          else if (stockData["symbol"] === "^GSPC") name = "S & P 500"
          else if (stockData["symbol"] === "^DJI") name = "Dow Jones"
          else if (stockData["symbol"] === "^RUT") name = "Russel 2000"
          else if (stockData["symbol"] === "^GDAXI") name = "DAX"
          else if (stockData["symbol"] === "^FTSE") name = "FTSE"
          else if (stockData["symbol"] === "^FCHI") name = "CAC 40"
          else if (stockData["symbol"] === "^N225") name = "Nikkei 225"
          else if (stockData["symbol"] === "^HSI") name = "Hang Seng"
          else if (stockData["symbol"] === "OSEBX.OL") name = "Oslo Børs"
          else if (stockData["symbol"] === "^VIX") name = "VIX"

          const stock = {
            id: stockData["messageBoardId"],
            indexName: stockData["shortName"],
            ticker: stockData["symbol"],
            percent: stockData["regularMarketChangePercent"].toFixed(2),
            last: stockData["regularMarketPrice"].toFixed(2),
            name: name,
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
  const symbols = "OSEBX.OL,^IXIC,^GSPC,^DJI,^RUT,^GDAXI,^FTSE,^FCHI,^N225,^HSI,^VIX"
  const body = await GetIndexData(symbols)

  context.res = {
    status: 200,
    body,
  }
}

const { MongoClient } = require("mongodb")
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

module.exports = async function (context, req) {
  const stock = req.body || {}

  if (stock) {
    context.res = {
      status: 400,
      body: "watchlist item data is required! ",
    }
  }

  const { db, connection } = await createConnection()

  const WatchList = db.collection("watchlist")

  try {
    const stocks = await WatchList.insertOne(stock)
    connection.close()

    context.res = {
      status: 201,
      body: stocks.ops[0],
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating a new watchlist item",
    }
  }
}

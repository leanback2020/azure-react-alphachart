const { MongoClient } = require("mongodb")

const config = {
  url: process.env.CONNECTIONSTRING, 
  dbName: "ReactTodo",
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

module.exports = createConnection

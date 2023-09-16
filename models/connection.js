const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

class Connect {
  // #conn = null;
  static async connectDB() {
    if (this.conn) return this.conn;
    let client = new MongoClient("mongodb://root:cedcommerce@127.0.0.1:27017/");
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("flyt");
    this.conn = db;
    return this.conn;
  }
}
Connect.conn = null;

module.exports = Connect;

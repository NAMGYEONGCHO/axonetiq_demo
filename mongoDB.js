const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("axonetiq_ticket");
  dbo.listCollections({name: "tickets"}).next(function(err, collinfo) {
    if (err) throw err;
    if (!collinfo) {
      dbo.createCollection("tickets", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      });
    } else {
      console.log("Collection already exists!");
    }
    db.close();
  });
});

module.exports = { MongoClient, url };

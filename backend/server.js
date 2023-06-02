const server = require('./app')

require("dotenv").config();


const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// import express
const express = require('express')
var DB = require('./backend/services/dbMongo');
var DAO = require('./backend/services/DAO');

// Setup DB
DAO.db = new DB();

const app = express();
const PORT = process.env.PORT || 8080

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Setup view engine
app.set("view-engine", "ejs");

// Parse JSON requests into req.body
app.use(express.json()) 

// Setup routes
app.use('/', require('./backend/routes/router'))

// serve all js, css and html files at client side
app.use(express.static(__dirname+'/frontend'))


// http server and socket
const server = require('http').createServer(app)

// Setup socket?
const {setUpSocket} = require('./backend/sockets/socket')
setUpSocket(server)

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
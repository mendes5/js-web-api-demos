const http = require("http");
const express = require("express");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

const server = http.createServer(app);

app.post("/analytics", (req, res) => {
  const { query } = req;
  console.log(`Received Event: `, query);

  res.status(200).end();
});

const SERVER_PORT = 3000;

server.listen(SERVER_PORT, () =>
  console.log(`Server running at ${SERVER_PORT}`)
);

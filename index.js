const express = require("express");
const cors = require("cors");
const { accountApi } = require("./account");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

app.post("/api/account", (req, res) => {
    accountApi(req, res)
})

app.get("/", (req, res) => {
    res.send("Api in here!")
})


app.listen(PORT, () => {
    console.log(`The server is listening at the port ${PORT}`);
});

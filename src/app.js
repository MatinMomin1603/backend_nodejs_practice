const express = require("express");
require("./db/db");
const app = express();
const router = require("./routers/router");
const port = process.env.PORT || 4000;
app.use(express.json());

app.use(router)
app.listen(port, () => {
    console.log(`Connection Successfuly created at ${port}`);
})
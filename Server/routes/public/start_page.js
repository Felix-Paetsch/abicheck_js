const CONF = require("../../config.js");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", { CONF });
    });
}
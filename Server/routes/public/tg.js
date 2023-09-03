const CONF = require("../../config.js");

module.exports = (app) => {
    app.get("/t/:tg", (req, res) => {
        res.render("tg", {
            CONF 
        });
    });
}
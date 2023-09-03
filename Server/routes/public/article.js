const CONF = require("../../config.js");

module.exports = (app) => {
    app.get("/a/:tg/:article", (req, res) => {
        res.render("article", {
            CONF 
        });
    });
}
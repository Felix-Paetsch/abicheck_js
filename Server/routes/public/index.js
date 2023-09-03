module.exports = (app) => {
    require("./start_page.js")(app);
    require("./tg.js")(app);
    require("./article.js")(app);
}
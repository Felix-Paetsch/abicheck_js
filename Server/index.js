const express = require('express');
const app = express();
const CONF = require("./config");
const port = CONF.port;


require("./use_middleware.js")(app);
require("./routes/admin/index.js")(app);
require("./routes/public/index.js")(app);

app.listen(port, () => {
    console.log(`App listening at PORT :: ${port}`)
});
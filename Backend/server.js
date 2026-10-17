const app = require('../Backend/src/app');
const config = require('../Backend/src/config/config');

app.listen(config.PORT, "0.0.0.0", () =>{
    console.log("Server is running on " + config.PORT + " port");
})
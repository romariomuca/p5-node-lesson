console.log("I'm running ");

let express = require("express"); //we are putting the libriary in a var

let app = express(); //app is the reslut of running the express funtion created before

let port = 3000;

let server = app.listen(port); //the connection will happen on the port 3000

console.log("server is running on http://localhost:" + port);

app.use(express.static("public"));

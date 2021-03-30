import {config} from 'dotenv';
config(); // import les variables d'env
import express,{Express} from "express";
//import {buildRoutes} from "./routes";
import bodyParser from "body-parser";

const app:Express = express();

app.use(bodyParser.json());

//buildRoutes(app);
const port = process.env.PORT || 3000;
app.listen(port,function (){
    console.log(`Listening on ${port}`);
});
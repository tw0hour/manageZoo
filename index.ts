import {config} from 'dotenv';
import express,{Express} from "express";
import {buildRoutes} from "./routes";
import bodyParser from "body-parser";
import {SequelizeManager} from "./models";
config(); // import les variables d'env

const app:Express = express();
export const jwt = require('jsonwebtoken');
export const JWT_KEY = process.env.JWT_KEY || 'secret';
export const JWT_EXPIRY = 24 * 60 * 60;

async function main(){
    const sequelize = await SequelizeManager.getInstance();
    console.log(sequelize);
}
main().then(function (){});


app.use(bodyParser.json());

buildRoutes(app);

const port = process.env.PORT || 4000;

app.listen(port,function (){
    console.log(`Listening on ${port}`);
});
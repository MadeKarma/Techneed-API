import express, { Application } from "express";
import morgan from "morgan";

import router from "./src/routers/index.router";


const app: Application = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(morgan("dev"))

app.use(router);

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
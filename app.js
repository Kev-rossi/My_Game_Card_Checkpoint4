import express from "express";
import cors from 'cors';
import { setupRoutes } from "../Back_Checkpoint4/routes/router.js";

const app = express();
const port= 5000;

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


setupRoutes(app);

app.listen(port, () => console.log('Sever is running on port'  + port));
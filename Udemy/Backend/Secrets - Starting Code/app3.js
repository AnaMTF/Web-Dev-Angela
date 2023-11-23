import dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const app = express();
const port = 3000;

console.log(process.env)
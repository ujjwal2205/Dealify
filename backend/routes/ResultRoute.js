import express from "express";
import fetchingUserSearch from "../controllers/ResultController.js";
const ResultRouter=express.Router();
ResultRouter.post("/data",fetchingUserSearch);
export default ResultRouter;
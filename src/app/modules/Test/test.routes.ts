import express from "express";
import { TestController } from "./test.controller";

const router = express.Router();

router.get("/", TestController.TestGet);

export const TestRoutes = router;

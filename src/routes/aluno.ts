import { Router } from "express";
import { AlunoController } from "../controllers";

const routes = Router()

routes.get("/all", AlunoController.get)

export default routes
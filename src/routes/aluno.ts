import { Router } from "express";
import { AlunoController } from "../controllers";

const routes = Router()

routes.get("/all", AlunoController.get)
routes.post("/", AlunoController.post)

export default routes
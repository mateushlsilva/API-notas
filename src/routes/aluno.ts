import { Router } from "express";
import { AlunoController } from "../controllers";

const routes = Router()

routes.get("/all", AlunoController.get)
routes.post("/", AlunoController.post)
routes.get("/one/:uuid", AlunoController.getOne)
routes.put("/:uuid", AlunoController.put)

export default routes
import AppDataSource from "../data-source";
import { Aluno } from "../models";
import { Request, Response } from "express";

class AlunoController{
    public async get(req: Request, res:Response): Promise<Response> {
        try{
            const rep = AppDataSource.getRepository(Aluno)
            const alunos = await rep.find()
            return res.status(200).json({erro: false, message: "Alunos pegos com sucesso!", aluno: alunos})
        }catch(err){
            return res.status(400).json({erro: true, message: "Erro ao pegar os alunos!", tipoErro: err})
        }
    }
}

export default new AlunoController()
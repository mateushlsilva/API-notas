import { ObjectId } from "typeorm";
import AppDataSource from "../data-source";
import { Aluno } from "../models";
import { Request, Response } from "express";

class AlunoController{
    public async get(req: Request, res:Response): Promise<Response> {
        try{
            const rep = AppDataSource.getRepository(Aluno)
            const alunos = await rep.find()
            return res.status(200).json({erro: false, message: "Alunos pegos com sucesso!", alunos: alunos})
        }catch(err){
            return res.status(400).json({erro: true, message: "Erro ao pegar os alunos!", tipoErro: err})
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response>{
        try{
            const id:any = new ObjectId(req.params.uuid)
            const rep = AppDataSource.getMongoRepository(Aluno)
            const find:any = await rep.findOneOrFail(id).catch((err) => {
                return res.status(404).json({erro: true, message: "Aluno não existe!", tipoErro: err})
            })
        }catch(err){
            return res.status(400).json({erro: true, message: "Erro ao pegar o aluno!", tipoErro: err})
        }
    }


    public async post(req: Request, res: Response): Promise<Response>{
        try{
            const { cpf, ra, nome } = req.body
            const rep = AppDataSource.getRepository(Aluno)
            const aluno = new Aluno()
            aluno.cpf = cpf 
            aluno.nome = nome
            aluno.ra = ra
            await rep.save(aluno)
            return res.status(200).json({erro: false, message: "Aluno cadastrado com sucesso!"})
        }catch(err){
            return res.status(400).json({erro: true, message: "Erro ao cadastrar novo aluno!", tipoErro: err})
        }
    }
}

export default new AlunoController()
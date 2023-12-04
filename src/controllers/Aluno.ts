import { ObjectId } from "mongodb";
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
            return res.status(200).json({erro: false, message: "Aluno pego com sucesso!", aluno: find})
        }catch(err){
            console.log(err);
            
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

    public async put(req: Request, res: Response): Promise<Response>{
        try{
            const id:any = new ObjectId(req.params.uuid)
            const alter = req.body
            const rep = AppDataSource.getMongoRepository(Aluno)
            const find:any = await rep.findOneOrFail(id).catch((err) => {
                return res.status(404).json({erro: true, message: "Aluno não existe!", tipoErro: err})
            })
            if(alter.cpf !== null || alter.cpf !== undefined){
                find.cpf = alter.cpf
            }
            if(alter.ra !== null || alter.ra !== undefined){
                find.ra = alter.ra
            }
            if(alter.nome !== null || alter.nome !== undefined){
                find.nome = alter.nome
            }
            
            await rep.save(find)
            return res.status(200).json({erro: false, message: "Aluno alterado com sucesso!"})
        }catch(err){
            return res.status(400).json({erro: true, message: "Erro ao alterar aluno!", tipoErro: err})
        }
    }
}

export default new AlunoController()
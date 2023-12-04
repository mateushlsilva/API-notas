import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Aluno{
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    nome: string;

    @Column()
    ra: number;
    
    @Column({ type: "varchar", unique: true, length: 30 })
    cpf: string;

    @Column()
    notas: JSON;
}
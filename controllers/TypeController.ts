import {ModelCtor} from "sequelize";
import {TypeCreationProps, TypeInstance} from "../models/type";
import {SequelizeManager} from "../models";
import {symlink} from "fs";

export class TypeController{
    Type:ModelCtor<TypeInstance>;

    private static instance: TypeController;

    public static async getInstance(): Promise<TypeController> {
        if(TypeController.instance === undefined) {
            const {Type} = await SequelizeManager.getInstance();
            TypeController.instance = new TypeController(Type);
        }
        return TypeController.instance;
    }

    private constructor(Type: ModelCtor<TypeInstance>) {
        this.Type = Type;
    }

    public async getAll():Promise<TypeInstance[] | null>{
        return this.Type.findAll();//null;//
    }

    public async addType(props: TypeCreationProps): Promise<TypeInstance | null> {
        return this.Type.create({
            ...props
        });
    }

}
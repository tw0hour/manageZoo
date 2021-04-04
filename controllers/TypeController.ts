import {ModelCtor} from "sequelize";
import {TypeInstance} from "../models/type";
import {SequelizeManager} from "../models";

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

    private constructor(User: ModelCtor<TypeInstance>) {
        this.Type = User;
    }

    public async getAll(id?:number):Promise<TypeInstance | null>{
        return null;
    }
}
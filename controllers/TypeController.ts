import {ModelCtor} from "sequelize";
import {TypeCreationProps, TypeInstance} from "../models/type";
import {SequelizeManager} from "../models";
import {promises} from "dns";

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

    public async getAll(limit:number,offset:number):Promise<TypeInstance[] | null>{
        return await this.Type.findAll({
            limit,
            offset
        });
    }

    public async getById(id:string):Promise<TypeInstance|null>{
        return await this.Type.findOne({where: {
                id
            }});
    }

    public async removeById(id:string):Promise<Boolean>{
        const typeToDelete = await this.getById(id);
        if(typeToDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Type.destroy({
                    where:{
                        id: typeToDelete.id
                    }
                });
                return true;
            }
            catch (err)
            {
                console.error(err);
                return false;
            }
        }
    }

    public async addType(props: TypeCreationProps): Promise<TypeInstance | null> {
        return await this.Type.create({
            ...props
        });
    }

    public async update(options: { name: any; id: any }):Promise<TypeInstance | null>{
        const typeUpdate = await this.getById(options.id.toString());

        if(typeUpdate === null)
        {
            return null;
        }
        else
        {
            return await typeUpdate.update({

                name: options.name
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

}
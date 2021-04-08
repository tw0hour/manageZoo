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
        return this.Type.findAll({
            limit,
            offset
        });
    }

    public async getById(id:number):Promise<TypeInstance|null>{
        return this.Type.findOne({where: {
                id
            }});
    }

    public async removeById(id:string):Promise<Boolean>{
        const type = this.getById(parseInt(id));
        //if(type===undefined) return 0;
        const destroy=this.Type.destroy({
            where:{
                id
            }
        });
        //console.log(destroy);
        //if()

        return false;
    }

    public async addType(props: TypeCreationProps): Promise<TypeInstance | null> {
        return this.Type.create({
            ...props
        });
    }

    public async update(props:TypeInstance):Promise<TypeInstance | null>{
        const typeUpdate = await this.getById(props.id);

        if(typeUpdate === null)
        {
            return null;
        }
        else
        {
            return await typeUpdate.update({

                name: props.name
            }, {
                where: {
                    id: props.id
                }
            });
        }
        return null;
    }

}
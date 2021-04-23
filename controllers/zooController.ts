import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {ZooCreationProps, ZooInstance} from "../models/zoo";


export interface ZooUpdateOption {
    id:string;
    name?:string;
    is_open?:boolean;
}

export class ZooController {

    Zoo: ModelCtor<ZooInstance>;

    private static instance: ZooController;

    public static async getInstance(): Promise<ZooController> {
        if(ZooController.instance == undefined) {
            const {Zoo} = await SequelizeManager.getInstance();
            ZooController.instance = new ZooController(Zoo);
        }
        return  ZooController.instance;
    }

    constructor(Zoo: ModelCtor<ZooInstance>) {
        this.Zoo = Zoo;
    }



    public async add(props: ZooCreationProps): Promise<ZooInstance | null> {
        return await this.Zoo.create({
            ...props
        });
    }

    public async getById(id: string): Promise<ZooInstance | null> {
        return await this.Zoo.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: ZooUpdateOption): Promise<ZooInstance | null> {

        const zooUpdate = await this.getById(options.id);

        if(zooUpdate === null)
        {
            return null;
        }
        else
        {
            return await zooUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const zooDelete = await this.getById(id);
        if(zooDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Zoo.destroy({
                    where:{
                        id: zooDelete.id
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
}
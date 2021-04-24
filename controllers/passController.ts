import {ModelCtor} from "sequelize";
import {PassCreationProps, PassInstance} from "../models/pass";
import {SequelizeManager} from "../models";


export interface PassUpdateOption {
    id: string;
    type?: string;
    description?: string;
    price?:number;
}

export class PassController {

    Pass: ModelCtor<PassInstance>;

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if(PassController.instance == undefined) {
            const {Pass} = await SequelizeManager.getInstance();
            PassController.instance = new PassController(Pass);
        }
        return PassController.instance;
    }

    constructor(Pass: ModelCtor<PassInstance>) {
        this.Pass = Pass;
    }

    public async getAllPass(limit: number, offset: number): Promise<PassInstance[] | null>{
        return await this.Pass.findAll({
            limit,
            offset
        });
    }

    public async addPass(props: PassCreationProps): Promise<PassInstance | null> {
        return await this.Pass.create({
            ...props
        });
    }

    public async getById(id: string): Promise<PassInstance | null> {
        return await this.Pass.findOne({
            where :{
                id: id
            }
        });
    }
    public async updatePass (options: PassUpdateOption): Promise<PassInstance | null> {

        const passUpdate = await this.getById(options.id);

        if(passUpdate === null)
        {
            return null;
        }
        else
        {
            return await passUpdate.update({
                type: options.type,
                description: options.description
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removePassById (id: string):Promise<Boolean> {
        const passDelete = await this.getById(id);
        if(passDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Pass.destroy({
                    where:{
                        id: passDelete.id
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
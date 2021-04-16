import {ModelCtor} from "sequelize";
import {VisitCreationProps, VisitInstance} from "../models/visit";
import {SequelizeManager} from "../models";


export interface VisitUpdateOption {
    id:string;
}

export class VisitController {

    Visit: ModelCtor<VisitInstance>;

    private static instance: VisitController;

    public static async getInstance(): Promise<VisitController> {
        if(VisitController.instance == undefined) {
            const {Visit} = await SequelizeManager.getInstance();
            VisitController.instance = new VisitController(Visit);
        }
        return  VisitController.instance;
    }

    constructor(Visit: ModelCtor<VisitInstance>) {
        this.Visit = Visit;
    }

    public async getAll(limit: number, offset: number): Promise<VisitInstance[] | null>{
        return await this.Visit.findAll({
            limit,
            offset
        });
    }

    public async add(props: VisitCreationProps): Promise<VisitInstance | null> {
        return await this.Visit.create({
            ...props
        });
    }

    public async getById(id: string): Promise<VisitInstance | null> {
        return await this.Visit.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: VisitUpdateOption): Promise<VisitInstance | null> {

        const visitUpdate = await this.getById(options.id);

        if(visitUpdate === null)
        {
            return null;
        }
        else
        {
            return await visitUpdate.update({
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const visitDelete = await this.getById(id);
        if(visitDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Visit.destroy({
                    where:{
                        id: visitDelete.id
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
    public async statistics():Promise<number> {
        return await this.Visit.count();
    }
}
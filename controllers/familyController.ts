import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {FamilyCreationProps, FamilyInstance} from "../models/family";


export interface FamilyUpdateOption {
    id: string;
    name: string;
}

export class FamilyController {

    Family: ModelCtor<FamilyInstance>;

    private static instance: FamilyController;

    public static async getInstance(): Promise<FamilyController> {
        if(FamilyController.instance == undefined) {
            const {Family} = await SequelizeManager.getInstance();
            FamilyController.instance = new FamilyController(Family);
        }
        return FamilyController.instance;
    }

    constructor(Family: ModelCtor<FamilyInstance>) {
        this.Family = Family;
    }

    public async getAllFamily(limit: number, offset: number): Promise<FamilyInstance[] | null>{
        return await this.Family.findAll({
            limit,
            offset
        });
    }

    public async addFamily(props: FamilyCreationProps): Promise<FamilyInstance | null> {
        return await this.Family.create({
            ...props
        });
    }

    public async getById(id: string): Promise<FamilyInstance | null> {
        return await this.Family.findOne({
            where :{
                id: id
            }
        });
    }
    public async updateFamily (options: FamilyUpdateOption): Promise<FamilyInstance | null> {

        const FamilyUpdate = await this.getById(options.id);

        if(FamilyUpdate === null)
        {
            return null;
        }
        else
        {
            return await FamilyUpdate.update({
                name: options.name
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeFamilyById (id: string):Promise<Boolean> {
        const FamilyDelete = await this.getById(id);
        if(FamilyDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Family.destroy({
                    where:{
                        id: FamilyDelete.id
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
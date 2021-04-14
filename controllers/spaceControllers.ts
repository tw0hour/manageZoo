import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {SpaceCreationProps, SpaceInstance} from "../models/space";


export interface SpaceUpdateOption {
    id:string;
    name?:string;
    description?:string;
    image?:string;
    capacity?:number;
    duration?:number;
    hour_open?:string;
    handicapped_access?:boolean;
    status?:boolean;
}

export class SpaceController {

    Space: ModelCtor<SpaceInstance>;

    private static instance: SpaceController;

    public static async getInstance(): Promise<SpaceController> {
        if(SpaceController.instance == undefined) {
            const {Space} = await SequelizeManager.getInstance();
            SpaceController.instance = new SpaceController(Space);
        }
        return  SpaceController.instance;
    }

    constructor(Visit: ModelCtor<SpaceInstance>) {
        this.Space = Visit;
    }

    public async getAll(limit: number, offset: number): Promise<SpaceInstance[] | null>{
        return await this.Space.findAll({
            limit,
            offset
        });
    }

    public async add(props: SpaceCreationProps): Promise<SpaceInstance | null> {
        return await this.Space.create({
            ...props
        });
    }

    public async getById(id: string): Promise<SpaceInstance | null> {
        return await this.Space.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: SpaceUpdateOption): Promise<SpaceInstance | null> {

        const spaceUpdate = await this.getById(options.id);

        if(spaceUpdate === null)
        {
            return null;
        }
        else
        {
            return await spaceUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const spaceDelete = await this.getById(id);
        if(spaceDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Space.destroy({
                    where:{
                        id: spaceDelete.id
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
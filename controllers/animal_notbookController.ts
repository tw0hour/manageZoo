import {ModelCtor} from "sequelize";
import {Animal_notebookCreationProps, Animal_notebookInstance,} from "../models/animal_notebook";
import {SequelizeManager} from "../models";


export interface Animal_notebookUpdateOption {
    id:string;
    description?:string;
    health_status?:string;
    date?:string;

}

export class Animal_notebookController {

    Animal_notebook: ModelCtor<Animal_notebookInstance>;

    private static instance: Animal_notebookController;

    public static async getInstance(): Promise<Animal_notebookController> {
        if(Animal_notebookController.instance == undefined) {
            const {Animal_notebook} = await SequelizeManager.getInstance();
            Animal_notebookController.instance = new Animal_notebookController(Animal_notebook);
        }
        return  Animal_notebookController.instance;
    }

    constructor(Visit: ModelCtor<Animal_notebookInstance>) {
        this.Animal_notebook = Visit;
    }

    public async getAll(limit: number, offset: number): Promise<Animal_notebookInstance[] | null>{
        return await this.Animal_notebook.findAll({
            limit,
            offset
        });
    }

    public async add(props: Animal_notebookCreationProps): Promise<Animal_notebookInstance | null> {
        return await this.Animal_notebook.create({
            ...props
        });
    }

    public async getById(id: string): Promise<Animal_notebookInstance | null> {
        return await this.Animal_notebook.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: Animal_notebookUpdateOption): Promise<Animal_notebookInstance | null> {

        const animal_notebookUpdate = await this.getById(options.id);

        if(animal_notebookUpdate === null)
        {
            return null;
        }
        else
        {
            return await animal_notebookUpdate.update({
                description: options.description,
                health_status: options.health_status,
                date:options.date

            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const animal_notebookDelete = await this.getById(id);
        if(animal_notebookDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Animal_notebook.destroy({
                    where:{
                        id: animal_notebookDelete.id
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
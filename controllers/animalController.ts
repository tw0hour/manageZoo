import {ModelCtor} from "sequelize";
import {AnimalCreationProps, AnimalInstance} from "../models/animal";
import {SequelizeManager} from "../models";


export interface AnimalUpdateOption {
    id:string;
    species?:string;
    name?:string;
}

export class AnimalController {

    Animal: ModelCtor<AnimalInstance>;

    private static instance: AnimalController;

    public static async getInstance(): Promise<AnimalController> {
        if(AnimalController.instance == undefined) {
            const {Animal} = await SequelizeManager.getInstance();
            AnimalController.instance = new AnimalController(Animal);
        }
        return  AnimalController.instance;
    }

    constructor(Animal: ModelCtor<AnimalInstance>) {
        this.Animal = Animal;
    }

    public async getAllAnimal(limit: number, offset: number): Promise<AnimalInstance[] | null>{
        return await this.Animal.findAll({
            limit,
            offset
        });
    }

    public async addAnimal(props: AnimalCreationProps): Promise<AnimalInstance | null> {
        return await this.Animal.create({
            ...props
        });
    }

    public async getById(id: string): Promise<AnimalInstance | null> {
        return await this.Animal.findOne({
            where :{
                id: id
            }
        });
    }
    public async updateAnimal (options: AnimalUpdateOption): Promise<AnimalInstance | null> {

        const animalUpdate = await this.getById(options.id);

        if(animalUpdate === null)
        {
            return null;
        }
        else
        {
            return await animalUpdate.update({
                species: options.species,
                name: options.name
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeAnimalById (id: string):Promise<Boolean> {
        const animalDelete = await this.getById(id);
        if(animalDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Animal.destroy({
                    where:{
                        id: animalDelete.id
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
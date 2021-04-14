import {ModelCtor} from "sequelize";
import {SpaceNotebookCreationProps, SpaceNotebookInstance} from "../models/spaceNotebook";
import {SequelizeManager} from "../models";


export interface spaceNoteBookUpdateOption {
    bestMonth?:string;
    timestamp?:string;
}

export class SpaceNoteBookController {

    spaceNoteBook: ModelCtor<SpaceNotebookInstance>;

    private static instance: SpaceNoteBookController;

    public static async getInstance(): Promise<SpaceNoteBookController> {
        if(SpaceNoteBookController.instance == undefined) {
            const {SpaceNotebook} = await SequelizeManager.getInstance();
            SpaceNoteBookController.instance = new SpaceNoteBookController(SpaceNotebook);
        }
        return  SpaceNoteBookController.instance;
    }

    constructor(spaceNoteBook: ModelCtor<SpaceNotebookInstance>) {
        this.spaceNoteBook = spaceNoteBook;
    }

    public async getAllSpaceNoteBook(): Promise<SpaceNotebookInstance[] | null>{
        return await this.spaceNoteBook.findAll();
    }

    public async addSpaceNoteBook(props: SpaceNotebookCreationProps): Promise<SpaceNotebookInstance | null> {
        return await this.spaceNoteBook.create({
            ...props
        });
    }

    public async getById(id: string): Promise<SpaceNotebookInstance | null> {
        return await this.spaceNoteBook.findOne({
            where :{
                id: id
            }
        });
    }

    public async updateSpaceNoteBook (id:string, props:spaceNoteBookUpdateOption): Promise<SpaceNotebookInstance | null> {

        const spaceNoteBookUpdate = await this.getById(id);

        if(!spaceNoteBookUpdate)return null;

        return await spaceNoteBookUpdate.update({
            ...props,
            where :{
                id
            }
        });

    }

    public async removeSpaceNoteBookById (id: string):Promise<Boolean> {
        const spaceNoteBookDelete = await this.getById(id);
        if(!spaceNoteBookDelete)return false;

        try
        {
            await this.spaceNoteBook.destroy({
                where:{
                    id
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
import {ModelCtor, NOW, Op} from "sequelize";
import {VisitCreationProps, VisitInstance} from "../models/visit";
import {SequelizeManager} from "../models";
import {SpaceController} from "./spaceControllers";
import {PassController} from "./passController";
export {jwt, JWT_EXPIRY, JWT_KEY} from "../index";
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


   public async isValid(idPass:string,idSpace:string):Promise<boolean> {
       const spaceController = await SpaceController.getInstance();
       const space = await spaceController.getById(idSpace);
       if (!space) return false;

       const passController = await PassController.getInstance();
       const pass = await passController.getById(idPass);
       if(!pass) return false;

       switch (pass.id){
           case 1:
               //daily
               break;
           case 2:
               //month
               break;
           case 3:
               //weekend
               break;
           case 4:
               //annuel
               break;
           case 5:
               //pass escape game
               break;
       }
   }

        

    /*public async weeklyVisit():Promise<number>{
        const datenow:Date = new Date();
        const datenowmoin7 =Date();
        const lol =  await this.Visit.findAndCountAll({
            where:{
                createdAt:{
                    $between:[
                        datenow,
                        10
                    ]
                }
            }
        });
        return lol.count;
    }*/
}
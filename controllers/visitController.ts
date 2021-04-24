import {ModelCtor, NOW, Op} from "sequelize";
import {VisitCreationProps, VisitInstance} from "../models/visit";
import {SequelizeManager} from "../models";
import {SpaceController} from "./spaceControllers";
import {PassController} from "./passController";
import {Buy_passController} from "./buy_passController";
import {UserController} from "./userController";
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


   public async isValid(idUser:string,idSpace:string):Promise<boolean> {
       const spaceController = await SpaceController.getInstance();
       const space = await spaceController.getById(idSpace);
       if (!space) return false;

       const userController = await UserController.getInstance();
       const user = await userController.getById(idUser);
       if(!user) return false;

       const buy_passController = await Buy_passController.getInstance();

       // on vérifie tout les abonnements du user
       const buy_pass = await buy_passController.getByIdUser(idUser);
       if(!buy_pass) return false;

       for(var i=0;i<buy_pass.length;i++){
            //appeler is validate pour chaque itération
            // si true , renvoyer true
       }
       return false;
   }
}
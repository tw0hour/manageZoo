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

    /**
     * @param idSpace
     * @return Nombre de visite de l'espace par rapport à la date du jour (sysdate())
     */
    public async dailyVisitPerSpace(idSpace: string): Promise<number> {
        let currentDate = new Date();
        const date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

        return this.Visit.count({
            where:{
                id_space : idSpace,
                createdAt: date
            }
        });
    }

    /**
     * @return Le nombre de visite tout espace confondu par rapport à la date du jour (sysdate())
     */
    public async dailyVisitPerZoo(): Promise<number> {
        let currentDate = new Date();
        const date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

        return this.Visit.count({
            where:{
                createdAt: date
            }
        });
    }

    public async visitPerSpaceAndDate(idSpace: string, dateParam: string): Promise<number> {
        return this.Visit.count({
            where:{
                id_space : idSpace,
                createdAt: dateParam
            }
        });
    }

    /**
     * @return Le nombre de visite tout espace confondu les 7 derniers jours
     */

    public async weeklyVisitPerZoo(): Promise<number> {
        const currentDate = new Date();
        const curDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

        const last_Week = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastWeek = last_Week.getDate() + "/" + (last_Week.getMonth() + 1) + "/" + last_Week.getFullYear();

        console.log("Controller | date : " + curDate);
        console.log("Controller | firstDay - 7 : " + lastWeek);

        return this.Visit.count({
            where:{
                createdAt:{
                    [Op.lt]: curDate,
                    [Op.gt]: lastWeek
                }
            }
        });
    }

    /**
     * @param idSpace
     * @return Nombre de visite de l'espace les 7 derniers jours
     */
    public async weeklyVisitPerSpace(idSpace: string): Promise<number> {
        const currentDate = new Date();
        const curDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

        const last_Week = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastWeek = last_Week.getDate() + "/" + (last_Week.getMonth() + 1) + "/" + last_Week.getFullYear();

        console.log("Controller | date : " + curDate);
        console.log("Controller | firstDay - 7 : " + lastWeek);

        return this.Visit.count({
            where:{
                id_space: idSpace,
                createdAt:{
                    [Op.lt]: curDate,
                    [Op.gt]: lastWeek
                }
            }
        });
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
            if(await buy_passController.isValidPassDate(buy_pass[i].id)){
                return true;
            }
       }
       return false;
   }
}
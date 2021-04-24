import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {Buy_passInstance} from "../models/buy_pass";


export interface Buy_passUpdateOption {
    //id: string;
    //date_bought: string;
    user_id?:number;
    pass_id?:number;
}

export class Buy_passController {

    Buy_Pass: ModelCtor<Buy_passInstance>;

    private static instance: Buy_passController;

    public static async getInstance(): Promise<Buy_passController> {
        if(Buy_passController.instance == undefined) {
            const {Buy_Pass} = await SequelizeManager.getInstance();
            Buy_passController.instance = new Buy_passController(Buy_Pass);
        }
        return Buy_passController.instance;
    }

    constructor(Family: ModelCtor<Buy_passInstance>) {
        this.Buy_Pass = Family;
    }

    public static async isValid(pass:Buy_passInstance):Promise<boolean>{
        //const
        return false;
    }

    public async getAllBought(limit: number, offset: number): Promise<Buy_passInstance[] | null>{
        return await this.Buy_Pass.findAll({
            limit,
            offset
        });
    }

    public async buyPass(user_id:string,pass_id:string): Promise<Buy_passInstance | null> {
        let date=new Date();
        const date_bought = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return await this.Buy_Pass.create({
            user_id,
            pass_id,
            date_bought

        });
    }

    public async getById(id: string): Promise<Buy_passInstance | null> {
        return await this.Buy_Pass.findOne({
            where :{
                id: id
            }
        });
    }

    public async getByIdUser(id: string): Promise<Buy_passInstance | null> {
        return await this.Buy_Pass.findOne({
            where :{
                id: id
            }
        });
    }
}
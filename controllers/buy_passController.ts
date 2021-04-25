import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {Buy_passInstance} from "../models/buy_pass";
import {PassController} from "./passController";
import {UserController} from "./userController";


export interface Buy_passUpdateOption {
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


    public async isValidPassDate(buy_passId:string):Promise<boolean> {
        let date = new Date();
        const dateNow = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        const buy_passController = await Buy_passController.getInstance();
        const buy_pass = await buy_passController.getById(buy_passId);

        if (buy_pass===null)return false;

        const passController = await PassController.getInstance();
        const pass = await passController.getById(buy_pass.pass_id);

        if (pass?.type === "journee") {
            const isWeDay = new Date(buy_pass.date_bought);
            return dateNow === buy_pass.date_bought && (isWeDay.getDay() !== 0 || isWeDay.getDay() !== 6);
        } else if (pass?.type === "week-end") {
            const isWeDay = new Date(buy_pass.date_bought);
            return dateNow === buy_pass.date_bought && (isWeDay.getDay() === 0 || isWeDay.getDay() === 6);
        } else if (pass?.type === "annuel" || pass?.type === "1daymonth") {

            let date_boughtFull = new Date(buy_pass.date_bought);
            let date_boughtNextYear = (date_boughtFull.getMonth()+1)+"/"+date_boughtFull.getDate()+"/"+(date.getFullYear()+1);
            const date_boughtNextYearFull = new Date(date_boughtNextYear);
            return date < date_boughtNextYearFull;
        }
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

        const userController = await UserController.getInstance();
        const user = await userController.getById(user_id);
        const passController = await PassController.getInstance();
        const pass = await passController.getById(pass_id);

        if (user === undefined || pass === undefined) return null;

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

    public async getByIdUser(user_id: string): Promise<Buy_passInstance[] | null> {
        return await this.Buy_Pass.findAll({
            where :{
                user_id
            }
        });
    }
}
import {ModelCtor} from "sequelize";
import employee, {EmployeeCreationProps, EmployeeInstance} from "../models/employee";
import {SequelizeManager} from "../models";
import {jwt, JWT_EXPIRY, JWT_KEY} from "../index";
import {TypeController} from "./TypeController";
import {userRoutes} from "../routes/userRoutes";
import {promises} from "dns";

export interface EmployeePropsController {
    pseudo?:string;
    password?:string;
    type?:string;
    state?:boolean;
}

export class EmployeeController{
    employee:ModelCtor<EmployeeInstance>;

    private static instance: EmployeeController;

    public static async getInstance(): Promise<EmployeeController> {
        if(EmployeeController.instance === undefined) {
            const {Employee} = await SequelizeManager.getInstance();
            EmployeeController.instance = new EmployeeController(Employee);
        }
        return EmployeeController.instance;
    }

    private constructor(employee: ModelCtor<EmployeeInstance>) {
        this.employee = employee;
    }

    public async subscribe(props: EmployeeCreationProps): Promise<any> {
        const employee = await this.getByName(props.pseudo);
        if(employee)return {
            error: "name employee already exist",
            statusCode: 409
        };

        const typeController = await TypeController.getInstance();
        const type = await typeController.getByName(props.type);
        if(!type) return {
            error: "type should be exist",
            statusCode: 409
        };

        const createdEmployee = await this.employee.create({
            ...props
        });
        if (!createdEmployee) return {
            error: "server error",
            statusCode: 500
        };

        const id = createdEmployee.id;
        const token = jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "employee created successfully",
            createdEmployee,
            token : token,
            statusCode: 201
        };
    }

    public async connection(pseudo:string,password:string): Promise<any> {
        const employee = await this.employee.findOne({
            where: {
                pseudo,
                password
            }
        });
        if(!employee) return {
            error:"not found",
            statusCode:404
        };

        const id = employee.id;
        const token = jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "employee connected successfully",
            employee,
            token : token,
            statusCode:200
        };
    }

    public async getByName(pseudo:string): Promise<EmployeeInstance | null> {
        return await this.employee.findOne({
            where: {
                pseudo
            }
        });
    }

    public async getById(id:string): Promise<EmployeeInstance | null> {
        return await this.employee.findOne({
            where: {
                id
            }
        });
    }

    public async getAll(): Promise<EmployeeInstance[] | null> {
        return await this.employee.findAll();
    }

    public async update(id:string,props:EmployeePropsController):Promise<Object | null> {
        const employee = await this.getById(id);
        if(!employee) return null;

        return await this.employee.update(
            {...props},
            {where :{id}}
        );
    }

    public async delete(id:string): Promise<boolean> {
        const employee = await this.getById(id);
        if(!employee)return false;

        const employeeDeleted = await this.employee.destroy({
            where: {
                id
            }
        });

        if(!employeeDeleted)return false;
        return true;
    }


    public async permissionToOpen():Promise<boolean>{
        const employeeReception = await this.employee.findAndCountAll({
            where:{
                type:"acceuil",
                state:1
            }
        });
        if( employeeReception.count < 1) {
            return false;
        }

        const employeeSeller = await this.employee.findAndCountAll({
            where:{
                type:"vendeur",
                state:1
            }
        });
        if( employeeSeller.count < 1) {
            return false;
        }

        const employeeGroomer = await this.employee.findAndCountAll({
            where:{
                type:"soigneur",
                state:1
            }
        });
        if( employeeGroomer.count < 1) {
            return false;
        }

        const employeeMaintenanceAgent = await this.employee.findAndCountAll({
            where:{
                type:"agent d'entretient",
                state:1
            }
        });
        if( employeeMaintenanceAgent.count < 1 ) {
            return false;
        }

        return true;
    }


}
export {jwt, JWT_EXPIRY, JWT_KEY} from "../index";
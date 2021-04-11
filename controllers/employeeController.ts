import {ModelCtor} from "sequelize";
import {EmployeeCreationProps, EmployeeInstance} from "../models/employee";
import {SequelizeManager} from "../models";
import {jwt, JWT_EXPIRY, JWT_KEY} from "../index";
export {jwt, JWT_EXPIRY, JWT_KEY} from "../index";

export interface EmployeePropsController {
    name:string;
    password:string;
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

    public async subscribe(props: EmployeeCreationProps): Promise<Object | null> {
        const employee = await this.getByName(props.pseudo);
        if(employee)return null;

        const createdEmployee = await this.employee.create({
            ...props
        });
        if (!createdEmployee) return null;

        const id = createdEmployee.id;
        const token = jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "employee created successfully",
            createdEmployee,
            token : token
        };
    }

    public async connection(pseudo:string,password:string): Promise<Object | null> {
        const employee = await this.employee.findOne({
            where: {
                pseudo,
                password
            }
        });
        if(!employee) return null;

        const id = employee.id;
        const token = jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "employee connected successfully",
            employee,
            token : token
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
        const employee =  await this.employee.findOne({
            where: {
                id
            }
        });

        if(!employee)return null;
        return employee;
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
}
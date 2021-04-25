import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user";
import {SequelizeManager} from "../models";
import {jwt, JWT_EXPIRY, JWT_KEY} from "../index";
import pass from "../models/pass";
import {PassController} from "./passController";
import {Buy_passController} from "./buy_passController";
export {jwt, JWT_EXPIRY, JWT_KEY} from "../index";

export interface UserPropsController {
    name:string;
    password:string;
    is_handicapped:boolean;
}

export class UserController {
    User:ModelCtor<UserInstance>;

    private static instance: UserController;

    public static async getInstance(): Promise<UserController> {
        if(UserController.instance === undefined) {
            const {User} = await SequelizeManager.getInstance();
            UserController.instance = new UserController(User);
        }
        return UserController.instance;
    }

    private constructor(User: ModelCtor<UserInstance>) {
        this.User = User;
    }

    public async inscription(props: UserCreationProps): Promise<Object | null> {
        const user = await this.getByName(props.name);
        if(user)return null;

        const createdUser = await this.User.create({
            ...props
        });
        if (!createdUser) return null;

        const id = createdUser.id;
        const token = await jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "User created successfully",
            createdUser,
            token : token
        };
    }

    public async connection(name:string,password:string): Promise<Object | null> {
        const user = await this.User.findOne({
            where: {
                name,
                password
            }
        });
        if(!user) return null;

        const id = user.id;
        const token = jwt.sign({id}, JWT_KEY, {
            expiresIn: JWT_EXPIRY
        });

        return {
            message: "User connected successfully",
            user,
            token : token
        };
    }

    public async getByName(name:string): Promise<UserInstance | null> {
        return await this.User.findOne({
            where: {
                name
            }
        });
    }

    public async getById(id:string): Promise<UserInstance | null> {
        const user =  await this.User.findOne({
            where: {
                id
            }
        });

        if(!user)return null;
        return user;
    }

    public async getAll(): Promise<UserInstance[] | null> {
        return await this.User.findAll();
    }

    public async update(id:string,props:UserPropsController):Promise<Object | null> {
        const user = await this.getById(id);

        if(!user) return null;

        return await this.User.update(
            {...props},
            {where :{id}}
        );
    }
    public async subscribe(idUser: string, idPass: string): Promise<boolean> {
        const passController = await PassController.getInstance();
        const pass = await passController.getById(idPass);
        if (!pass){
            return false;
        }
        const buyPassController = await  Buy_passController.getInstance();
        const buyPass = await buyPassController.buyPass(idUser, idPass);

        if(!buyPass) return false;

        return true;
    }

    public async delete(id:string): Promise<boolean> {
        const user = await this.getById(id);
        if(!user)return false;

        const userDeleted = await this.User.destroy({
            where: {
                id
            }
        });

        if(!userDeleted)return false;
        return true;
    }
}
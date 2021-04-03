import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user";
import {SequelizeManager} from "../models";

export class UserController{
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

    public async subscribe(props: UserCreationProps):
        Promise<UserInstance | null> {
        //const passwordHashed = await hash(props.password, 5);
        return this.User.create({
            ...props
        });
    }

}
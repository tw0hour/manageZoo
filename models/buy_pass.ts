import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin, literal,
    Model,
    ModelCtor, NOW,
    Optional,
    Sequelize
} from "sequelize";
import user, {UserInstance} from "./user";
import {PassInstance} from "./pass";

export interface Buy_passProps {
    id: string;
    date_bought:string;
    user_id:string;
    pass_id:string;
}

export  interface Buy_passCreationProps extends Optional<Buy_passProps, "id"> {}

export interface Buy_passInstance extends Model<Buy_passProps, Buy_passCreationProps>, Buy_passProps {
    getUser: HasOneGetAssociationMixin<UserInstance>;
    setUser: HasOneSetAssociationMixin<UserInstance, "id">;

    getPass: HasOneGetAssociationMixin<PassInstance>;
    setPass: HasOneSetAssociationMixin<PassInstance, "id">;
}

export default function (sequelize: Sequelize): ModelCtor<Buy_passInstance> {
    return sequelize.define<Buy_passInstance>("Buy_pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date_bought: {
            type: DataTypes.STRING
        },
        user_id:{
            type:DataTypes.STRING
        },
        pass_id:{
            type:DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
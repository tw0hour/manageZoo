import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, HasManyGetAssociationsMixin, HasManySetAssociationsMixin
} from "sequelize";
import {UserInstance} from "./user";

export interface PassProps {
    id: number;
    type: string;
    price:number;
    description: string;
}

export interface PassCreationProps extends Optional<PassProps, "id"> {}

export interface PassInstance extends Model<PassProps,PassCreationProps>, PassProps {
    getUser: HasManyGetAssociationsMixin<UserInstance>;
    setUser: HasManySetAssociationsMixin<UserInstance, "id">;

}

export default function(sequelize: Sequelize): ModelCtor<PassInstance> {
    return sequelize.define<PassInstance>("pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.BIGINT,
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
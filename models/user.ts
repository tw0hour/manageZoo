import {
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {SpaceInstance} from "./space";
import {PassInstance} from "./pass";

export interface VisitProps {
    id: number;
    name: string;
    password: string;
    is_handicapped: boolean;
}

export  interface UserCreationProps extends Optional<VisitProps, "id"> {}

export interface UserInstance extends Model<VisitProps, UserCreationProps>, VisitProps {
    getSpace: HasManyGetAssociationsMixin<SpaceInstance>;
    setSpace: HasManySetAssociationsMixin<UserInstance, "id">;

    getPass: HasOneGetAssociationMixin<PassInstance>;
    setPass: HasOneSetAssociationMixin<UserInstance, "id">;

}

export default function (sequelize: Sequelize): ModelCtor<UserInstance> {
    return sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        is_handicapped: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
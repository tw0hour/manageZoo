import {
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {EmployeeInstance} from "./employee";

export interface TypeProps {
    id: number;
    name: string;
}

export  interface TypeCreationProps extends Optional<TypeProps, "id"> {}

export interface TypeInstance extends Model<TypeProps, TypeCreationProps>, TypeProps {
    getEmployee: HasManyGetAssociationsMixin<EmployeeInstance>;
    setEmployee: HasManySetAssociationsMixin<EmployeeInstance, "id">;
}

export default function (sequelize: Sequelize): ModelCtor<TypeInstance> {
    return sequelize.define<TypeInstance>("Type", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
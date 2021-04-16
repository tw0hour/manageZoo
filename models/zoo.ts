import {
    Sequelize,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasOneSetAssociationMixin,
    ModelCtor,
    Optional,
    Model
} from "sequelize";
import {SpaceInstance} from "./space";
import {Mode} from "fs";

export interface ZooProps {
    id: number;
    name: string;
    isOpen: boolean;
}

export interface ZooCreationProps extends Optional<ZooProps, "id"> {}

export interface ZooInstance extends Model<ZooProps, ZooCreationProps>, ZooProps {
    getSpace: HasManyGetAssociationsMixin<SpaceInstance>;
    setSpace: HasOneSetAssociationMixin<SpaceInstance, "id">;
}

export default function (sequelize: Sequelize): ModelCtor<ZooInstance> {
    return sequelize.define<ZooInstance>("Zoo", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        isOpen: {
            type: DataTypes.BOOLEAN
        }
        }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}



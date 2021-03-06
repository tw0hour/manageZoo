import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin, literal,
    Model,
    ModelCtor, NOW,
    Optional,
    Sequelize
} from "sequelize";
import {UserInstance} from "./user";
import {SpaceInstance} from "./space";

export interface VisitProps {
    id: number;
    createdAt:Date;
    id_space: string;
}

export  interface VisitCreationProps extends Optional<VisitProps, "id"> {}

export interface VisitInstance extends Model<VisitProps, VisitCreationProps>, VisitProps {
    getUser: HasOneGetAssociationMixin<UserInstance>;
    setUser: HasOneSetAssociationMixin<UserInstance, "id">;

    getSpace: HasOneGetAssociationMixin<SpaceInstance>;
    setSpace: HasOneSetAssociationMixin<SpaceInstance, "id">;
}

export default function (sequelize: Sequelize): ModelCtor<VisitInstance> {
    return sequelize.define<VisitInstance>("Visit", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataTypes.STRING
        },
        id_space :{
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
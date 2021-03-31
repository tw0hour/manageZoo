import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin, HasManySetAssociationsMixin
} from "sequelize";
import {SpaceNotebookInstance} from "./spaceNotebook";
import {AnimalInstance} from "./animal";

export interface SpaceProps {
    id: number;
    name: string;
    description:string;
    image:string;
    capacity:number;
    duration:number;
    hour_open:string;
    handicapped_access:boolean;
    status:boolean;
}

export interface SpaceCreationProps extends Optional<SpaceProps, "id"> {}

export interface SpaceInstance extends Model<SpaceProps,SpaceCreationProps>, SpaceProps {
    getSpaceNoteBook: HasManyGetAssociationsMixin<SpaceNotebookInstance>;
    setSpaceNoteBook: HasManySetAssociationsMixin<SpaceNotebookInstance, "id">;

    getAnimal: HasManyGetAssociationsMixin<AnimalInstance>;
    setAnimal: HasManySetAssociationsMixin<AnimalInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<SpaceInstance> {
    return sequelize.define<SpaceInstance>("Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.BIGINT
        },
        duration: {
            type: DataTypes.BIGINT
        },
        hour_open: {
            type: DataTypes.STRING
        },
        handicapped_access: {
            type: DataTypes.BOOLEAN
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
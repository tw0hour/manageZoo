import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface SpaceProps {
    id: number;
    name: string;
    description:string;
    image:string;
    capacity:number;
    duration:number;
    hour_open:string;
    handicapped_acces:boolean;
    status:boolean;
}

export interface SpaceCreationProps extends Optional<SpaceProps, "id"> {}

export interface SpaceInstance extends Model<SpaceProps,SpaceCreationProps>, SpaceProps {

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
        handicapped_acces: {
            type: DataTypes.BOOLEAN
        },
        status: {asdasad
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
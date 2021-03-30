import {DataTypes, Model, ModelCtor, Optional, Sequelize} from "sequelize";

export interface VisitProps {
    id: number;
    name: string;
}

export  interface VisitCreationProps extends Optional<VisitProps, "id"> {}

export interface VisitInstance extends Model<VisitProps, VisitCreationProps>, VisitProps {

}

export default function (sequelize: Sequelize): ModelCtor<VisitInstance> {
    return sequelize.define<VisitInstance>("Visit", {
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
import {Sequelize, Optional, Model, DataTypes, ModelCtor} from 'sequelize'


export interface SpaceNotebookProps {
    id: number;
    bestMonth: string;
    timestamp: string;
}

export  interface SpaceNotebookCreationProps extends Optional<SpaceNotebookProps, "id"> {}

export interface SpaceNotebookInstance extends Model<SpaceNotebookProps, SpaceNotebookCreationProps>, SpaceNotebookProps {

}

export default function (sequelize: Sequelize): ModelCtor<SpaceNotebookInstance> {
    return sequelize.define<SpaceNotebookInstance>("space_notebook", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        bestMonth: {
            type: DataTypes.BOOLEAN,
        },
        timestamp: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}

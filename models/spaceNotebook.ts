import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin
} from 'sequelize'
import {AnimalInstance} from "./animal";
import {SpaceInstance} from "./space";
import {EmployeeInstance} from "./employee";


export interface SpaceNotebookProps {
    id: number;
    bestMonth: string;
    timestamp: string;
}

export  interface SpaceNotebookCreationProps extends Optional<SpaceNotebookProps, "id"> {}

export interface SpaceNotebookInstance extends Model<SpaceNotebookProps, SpaceNotebookCreationProps>, SpaceNotebookProps {
    getSpace: HasOneGetAssociationMixin<SpaceInstance>;
    setSpace: HasOneSetAssociationMixin<SpaceInstance, "id">;

    getEmployee: HasOneGetAssociationMixin<EmployeeInstance>;
    setEmployee: HasOneSetAssociationMixin<EmployeeInstance, "id">;
}

export default function (sequelize: Sequelize): ModelCtor<SpaceNotebookInstance> {
    return sequelize.define<SpaceNotebookInstance>("space_notebook", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        bestMonth: {
            type: DataTypes.STRING,
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

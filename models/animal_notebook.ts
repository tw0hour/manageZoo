import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToGetAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin
} from "sequelize";
import {AnimalInstance} from "./animal";
import {EmployeeInstance} from "./employee";

export interface Animal_notebookProps{
    id:number;
    description:string;
    health_status:string;
}

export interface Animal_notebookCreationProps extends Optional<Animal_notebookProps, "id">{}

export interface Animal_notebookInstance extends Model<Animal_notebookProps,Animal_notebookCreationProps>,Animal_notebookProps{
    getEmployee: HasOneGetAssociationMixin<EmployeeInstance>;
    setEmployee: HasOneSetAssociationMixin<EmployeeInstance, "id">;

    getAnimal: HasOneGetAssociationMixin<AnimalInstance>;
    setAnimal: HasOneSetAssociationMixin<AnimalInstance, "id">;
}

export default function(sequelize:Sequelize): ModelCtor<Animal_notebookInstance>{
    return sequelize.define<Animal_notebookInstance>("animal_notebook",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type:DataTypes.STRING
        },
        health_status:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin
} from "sequelize";
import {Animal_notebookInstance} from "./animal_notebook";
import {FamilyInstance} from "./family";

export interface AnimalProps{
    id:number;
    species:string;
    name:string;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id">{}

export interface AnimalInstance extends Model<AnimalProps,AnimalCreationProps>,AnimalProps{
    getFamily: HasOneGetAssociationMixin<FamilyInstance>;
    setFamily: HasOneSetAssociationMixin<FamilyInstance, "id">;

    getAnimalNoteBook: HasOneGetAssociationMixin<Animal_notebookInstance>;
    setAnimalNoteBook: HasOneSetAssociationMixin<Animal_notebookInstance, "id">;
}

export default function(sequelize:Sequelize): ModelCtor<AnimalInstance>{
    return sequelize.define<AnimalInstance>("animal",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        species:{
            type:DataTypes.STRING
        },
        name:{
            type:DataTypes.STRING
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
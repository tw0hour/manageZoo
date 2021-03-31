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
import {Animal_notebookInstance} from "./animal_notebook";

export interface AnimalProps{
    id:number;
    species:string;
    name:string;
    family:string;
    id_space:number;
    id_family:number;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id">{}

export interface AnimalInstance extends Model<AnimalProps,AnimalCreationProps>,AnimalProps{
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
        family:{
            type:DataTypes.STRING
        },
        id_space:{
            type:DataTypes.BIGINT
        },
        id_family:{
            type:DataTypes.BIGINT
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
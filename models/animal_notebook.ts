import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin
} from "sequelize";

export interface Animal_notebookProps{
    id:number;
    description:string;
    health_status:string;
    date:string;
    id_EMPLOYEE:number;
    id_ANIMAL:number;
}

export interface Animal_notebookCreationProps extends Optional<Animal_notebookProps, "id">{}

export interface Animal_notebookInstance extends Model<Animal_notebookProps,Animal_notebookCreationProps>,Animal_notebookProps{

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
        },health_status:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.STRING
        },
        id_EMPLOYEE:{
            type:DataTypes.BIGINT
        },
        id_ANIMAL:{
            type:DataTypes.BIGINT
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
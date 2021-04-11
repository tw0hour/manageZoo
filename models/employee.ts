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
    HasOneSetAssociationMixin,
    BelongsToMany,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import {SpaceInstance} from "./space";
import {SpaceNotebookInstance} from "./spaceNotebook";
import {Animal_notebookInstance} from "./animal_notebook";
import {TypeInstance} from "./type";

export interface EmployeeProps{
    id:number;
    pseudo:string;
    password:string;
    state:boolean;
    type:string;
}

export interface EmployeeCreationProps extends Optional<EmployeeProps, "id"> {}

export interface EmployeeInstance extends Model<EmployeeProps,EmployeeCreationProps>,EmployeeProps{

    getType: HasOneGetAssociationMixin<TypeInstance>;
    setType: HasOneSetAssociationMixin<TypeInstance, "id">;

    getSpaceNoteBook: HasManyGetAssociationsMixin<SpaceNotebookInstance>;
    setSpaceNoteBook: HasManySetAssociationsMixin<SpaceNotebookInstance, "id">;

    getSpace: HasManyGetAssociationsMixin<SpaceInstance>;
    setSpace: HasManySetAssociationsMixin<SpaceInstance, "id">;

    getAnimalNoteBook: HasManyGetAssociationsMixin<Animal_notebookInstance>;
    setAnimalNoteBook: HasManySetAssociationsMixin<Animal_notebookInstance, "id">;
}
export default function(sequelize:Sequelize):ModelCtor<EmployeeInstance>{
    return sequelize.define<EmployeeInstance>("employee",{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        state:{
            type:DataTypes.BOOLEAN
        },
        type:{
            type:DataTypes.STRING
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}

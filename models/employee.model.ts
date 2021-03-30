import{
    Sequelize,
        Optional,
        Model,
        DataTypes,
        ModelCtor,
        BelongsToSetAssociationMixin,
        HasManyGetAssociationsMixin, HasManyAddAssociationMixin
} from "sequelize";

export interface EmployeeProps{
    id:number;
    pseudo:string;
    password:string;
    type:string;
    id_type:number;
}

export interface EmployeeCreationProps extends Optional<EmployeeProps, "id"> {}

export interface EmployeeInstance extends Model<EmployeeProps,EmployeeCreationProps>,EmployeeProps{
    /*getSessions: HasManyGetAssociationsMixin<SessionInstance>;
    addSession: HasManyAddAssociationMixin<SessionInstance, "id">;*/
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
        type:{
            type:DataTypes.STRING
        },
        id_type:{
            type:DataTypes.BIGINT
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}

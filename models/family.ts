import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface FamilyProps {
    id: number;
    name: string;
}

export interface FamilyCreationProps extends Optional<FamilyProps, "id"> {}

export interface FamilyInstance extends Model<FamilyProps,FamilyCreationProps>, FamilyProps {

}

export default function(sequelize: Sequelize): ModelCtor<FamilyInstance> {
    return sequelize.define<FamilyInstance>("family", {
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
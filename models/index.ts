import {ModelCtor, Sequelize} from "sequelize";
import {Dialect} from "sequelize/types/lib/sequelize";
import animalCreator, {AnimalInstance} from "./animal";
import animal_notebookCreator, {Animal_notebookInstance} from "./animal_notebook";
import employeeCreator, {EmployeeInstance} from "./employee";
import familyCreator, {FamilyInstance} from "./family";
import passCreator, {PassInstance} from "./pass";
import spaceCreator, {SpaceInstance} from "./space";
import spaceNotebookCreator, {SpaceNotebookInstance} from "./spaceNotebook";
import typeCreator, {TypeInstance} from "./type";
import userCreator, {UserInstance} from "./user";
import visitCreator, {VisitInstance} from "./visit";

export interface SequelizeManagerProps {
    sequelize: Sequelize;
    Animal: ModelCtor<AnimalInstance>;
    Animal_notebook: ModelCtor<Animal_notebookInstance>;
    Employee: ModelCtor<EmployeeInstance>;
    Family: ModelCtor<FamilyInstance>;
    Pass: ModelCtor<PassInstance>;
    Space: ModelCtor<SpaceInstance>;
    SpaceNotebook: ModelCtor<SpaceNotebookInstance>;
    Type: ModelCtor<TypeInstance>;
    User: ModelCtor<UserInstance>;
    Visit: ModelCtor<VisitInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager

    sequelize: Sequelize;
    Animal: ModelCtor<AnimalInstance>;
    Animal_notebook: ModelCtor<Animal_notebookInstance>;
    Employee: ModelCtor<EmployeeInstance>;
    Family: ModelCtor<FamilyInstance>;
    Pass: ModelCtor<PassInstance>;
    Space: ModelCtor<SpaceInstance>;
    SpaceNotebook: ModelCtor<SpaceNotebookInstance>;
    Type: ModelCtor<TypeInstance>;
    User: ModelCtor<UserInstance>;
    Visit: ModelCtor<VisitInstance>;

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string)
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            Animal: animalCreator(sequelize),
            Animal_notebook: animal_notebookCreator(sequelize),
            Employee: employeeCreator(sequelize),
            Family: familyCreator(sequelize),
            Pass: passCreator(sequelize),
            Space: spaceCreator(sequelize),
            SpaceNotebook: spaceNotebookCreator(sequelize),
            User: userCreator(sequelize),
            Visit: visitCreator(sequelize),
            Type: typeCreator(sequelize)

        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        //
        // //emplyee / type
        // props.Employee.hasOne(props.Type);
        // props.Type.hasMany(props.Employee);
        //
        // //employee / space_notebook
        // props.Employee.hasMany(props.SpaceNotebook);
        // props.SpaceNotebook.hasOne(props.Employee);
        //
        // //employee / animlal_nodeBook
        // props.Employee.hasMany(props.Animal_notebook);
        // props.Animal_notebook.hasOne(props.Employee);
        //
        //
        // //animal / animal_nodebook
        // props.Animal_notebook.hasOne(props.Animal);
        // props.Animal.hasMany(props.Animal_notebook);
        //
        //
        // //animal / family
        // props.Animal.hasOne(props.Family);
        // props.Family.hasMany(props.Animal);
        //
        // //animal / space
        // props.Animal.hasOne(props.Space);
        // props.Space.hasMany(props.Animal);
        //
        // //space / visit
        // props.Space.hasMany(props.Visit);
        // props.Visit.hasOne(props.Space);
        //
        // //visit / user
        // props.User.hasMany(props.Visit);
        // props.Visit.hasOne(props.Visit);
        //
        // //user / pass
        // props.User.hasOne(props.Pass);
        // props.Pass.hasOne(props.User);

    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.Animal = props.Animal;
        this.Animal_notebook = props.Animal_notebook;
        this.Employee = props.Employee;
        this.Family = props.Family;
        this.Pass = props.Pass;
        this.Space = props.Space;
        this.SpaceNotebook = props.SpaceNotebook;
        this.Type = props.Type;
        this.User = props.User;
        this.Visit = props.Visit;
    }
}
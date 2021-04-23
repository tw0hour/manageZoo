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
import zooCreator, {ZooInstance} from "./zoo";

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
    Zoo: ModelCtor<ZooInstance>;
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
    Zoo: ModelCtor<ZooInstance>;

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: 'mysql',
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
            Type: typeCreator(sequelize),
            Zoo: zooCreator(sequelize)

        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {

        //employee / type
        props.Employee.belongsTo(props.Type);
        props.Type.hasMany(props.Employee);

        //employee / space_notebook
        props.Employee.hasMany(props.SpaceNotebook);
        props.SpaceNotebook.belongsTo(props.Employee);

        //employee / animlal_nodeBook
        props.Employee.hasMany(props.Animal_notebook);
        props.Animal_notebook.belongsTo(props.Employee);


        //animal / animal_nodebook
        props.Animal_notebook.belongsTo(props.Animal);
        props.Animal.hasMany(props.Animal_notebook);


        //animal / family
        props.Animal.belongsTo(props.Family);
        props.Family.hasMany(props.Animal);

        //animal / space
        props.Animal.belongsTo(props.Space);
        props.Space.hasMany(props.Animal);

        //space / visit
        props.Space.hasMany(props.Visit);
        props.Visit.belongsTo(props.Space);

        //visit / user
        props.User.hasMany(props.Visit);
        props.Visit.belongsTo(props.Visit);

        //user / pass
        props.User.belongsTo(props.Pass);
        props.Pass.hasMany(props.User);

        //zoo / space
        props.Zoo.hasMany(props.Space);
        props.Space.belongsTo(props.Zoo);

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
        this.Zoo = props.Zoo;
    }
}
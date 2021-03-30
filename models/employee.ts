export interface EmployeeProps{
    pseudo:string;
    password:string;
    type:string;
}

export class Employee implements EmployeeProps{
    password: string;
    pseudo: string;
    type: string;


    constructor(password: string, pseudo: string, type: string) {
        this.password = password;
        this.pseudo = pseudo;
        this.type = type;
    }
}
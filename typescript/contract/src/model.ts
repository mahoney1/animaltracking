
export const Namespace = 'org.example.animaltracking';
export const AnimalClass = Namespace + '.' + 'Animal';

// evolutionary superspecies
export enum ImmuneSpecies  {
    SHEEPGOAT = 'SHEEPGOAT',
}

export enum Priority {
    INFO = 1,
    WARN = 2,
    CRITICAL = 3,
}

export enum Species {
    CATTLE = 'CATTLE',
    DEER = 'DEER',
    GOAT = 'GOAT',
    PIG = 'PIG',
    LLAMA = 'LLAMA',
    SHEEP = 'SHEEP',
    SHEEPGOAT = 'SHEEPGOAT',
}

export enum Status {
    IN_FIELD = 'IN_FIELD',
    IN_TRANSIT = 'IN_TRANSIT',
    IN_QUARANTINE = 'IN_QUARANTINE',
    IN_ASSIGNED = 'IN_ASSIGNED',
    IN_EXAMINATION = 'IN_EXAMINATION',
    IN_CERTIFIED = 'IN_CERTIFIED',
    IN_BUTCHERS = 'IN_BUTCHERS',
}

export enum ProductionType {
    DAIRY = 'DAIRY',
    MEAT = 'MEAT',
    WOOL = 'WOOL',
    RESEARCH = 'RESEARCH',
}
// the ? means it is optional.
export interface IGeneric {
    getClass?: (flag: any) => string;
    getFQName?: (flag: any) => string;
    fcn?: string;
    invokingId?: string;
}

class GeneralClass implements IGeneric {
    public fcn?: string;
    public invokingId?: string;

    // constructor() { // eg if you need one
    // };

    public getClass(): string {
        // return 'whatever-you-want-this-function-to-do';
        return this.constructor.name;

    }
    public getFQName(): string {
            return Namespace + this.constructor.name;  // as an example
    }
}

// real Smart Contract context model definitions start here

export interface IQuery {
    selector: {
        class?: string; // minimum param provided
        fcn?: string;
        id?: string;
        dob?: string;
        description?: string;
        owner?: string;
        species?: string;
        location?: string;
        field?: string;
        status?: Status;
        vetId?: string;
        productionType?: ProductionType;
        isVaccinated?: string; // in the query interface, its a string.
    };
}

// EG query results could use..
export interface IResource {
    $class?: string;
}

export interface IAnimalEvent {
    level: number;
    action: string;
    timestamp?: Date;
    animal: IAnimal;
}

export interface IAnimal extends IGeneric {
    species: string;
    class: string;
    id: string;
    dob: string;
    description: string;
    owner: string;
    location: string;
    field: string;
    status: Status;
    productionType: ProductionType;
    vetId?: string;
    isVaccinated: boolean;
}

// declaration merging replaced - now Animal implements IAnimal interface defs with benefits of field checking in VSCode
export class Animal extends GeneralClass implements IAnimal  {
    public species: string;
    public class: string;
    public id: string;
    public dob: string;
    public description: string;
    public owner: string;
    public location: string;
    public field: string;
    public status: Status;
    public productionType: ProductionType;
    public vetId?: string;
    public isVaccinated: boolean;
}

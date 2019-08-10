export declare const Namespace = "org.example.animaltracking";
export declare const AnimalClass: string;
export declare enum ImmuneSpecies {
    SHEEPGOAT = "SHEEPGOAT"
}
export declare enum Priority {
    INFO = 1,
    WARN = 2,
    CRITICAL = 3
}
export declare enum Species {
    CATTLE = "CATTLE",
    DEER = "DEER",
    GOAT = "GOAT",
    PIG = "PIG",
    LLAMA = "LLAMA",
    SHEEP = "SHEEP",
    SHEEPGOAT = "SHEEPGOAT"
}
export declare enum Status {
    IN_FIELD = "IN_FIELD",
    IN_TRANSIT = "IN_TRANSIT",
    IN_QUARANTINE = "IN_QUARANTINE",
    IN_ASSIGNED = "IN_ASSIGNED",
    IN_EXAMINATION = "IN_EXAMINATION",
    IN_CERTIFIED = "IN_CERTIFIED",
    IN_BUTCHERS = "IN_BUTCHERS"
}
export declare enum ProductionType {
    DAIRY = "DAIRY",
    MEAT = "MEAT",
    WOOL = "WOOL",
    RESEARCH = "RESEARCH"
}
export interface IGeneric {
    getClass?: (flag: any) => string;
    getFQName?: (flag: any) => string;
    fcn?: string;
    invokingId?: string;
}
declare class GeneralClass implements IGeneric {
    fcn?: string;
    invokingId?: string;
    getClass(): string;
    getFQName(): string;
}
export interface IQuery {
    selector: {
        class?: string;
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
        isVaccinated?: string;
    };
}
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
export declare class Animal extends GeneralClass implements IAnimal {
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
export {};

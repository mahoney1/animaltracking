import { Animal, ProductionType, Species, Status } from './model';
export declare class MyAnimal extends Animal {
    static createInstance(species: Species, id: string, dob: string, description: string, owner: string, location: string, field: string, status: Status, productionType: ProductionType, isVaccinated: boolean): MyAnimal;
    constructor(obj: object);
    getLocation(): string;
    setInTransit(): void;
    setInQuarantine(): void;
    setVaccinated(): void;
    setInExamine(): void;
    setInAssigned(): void;
    setInField(): void;
    setField(field: string): void;
    setInPurged(): void;
    setLocation(location: string): void;
    setOwner(owner: string): void;
    setCertified(): void;
    assignVet(vetId: string): void;
    isSpeciesExempted(): boolean;
    noVetStatus(): boolean;
}

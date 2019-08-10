import { Animal, ImmuneSpecies, ProductionType, Species, Status } from './model';

export class MyAnimal extends Animal {

    // ANIMAL SPECIFIC METHODS eg.

    public static createInstance(species: Species, id: string, dob: string, description: string, owner: string, location: string, field: string, status: Status, productionType: ProductionType, isVaccinated: boolean) {
            return new MyAnimal({ species, id, dob, description, owner, location, field, status, productionType, isVaccinated });
     }
    constructor(obj: object) {
        super();
        Object.assign(this, obj);
    }

    public getLocation(): string {
        return this.location;
    }

    public setInTransit(): void {
        this.status = Status.IN_TRANSIT;
    }
    public setInQuarantine(): void {
        this.status = Status.IN_QUARANTINE;
    }
    public setVaccinated(): void {
        this.isVaccinated = true;
    }

    public setInExamine(): void {
        this.status = Status.IN_EXAMINATION;
    }

    public setInAssigned(): void {
        this.field = 'INSPECTION.BAY1';
        this.status = Status.IN_ASSIGNED;
    }
    public setInField(): void {
        this.status = Status.IN_FIELD;
    }
    public setField(field: string): void {
           this.field = field;
    }
    public setInPurged(): void {
        this.status = Status.IN_BUTCHERS;
    }
    public setLocation(location: string): void {
        this.location = location;
    }
    public setOwner(owner: string): void {
        this.owner = owner;
    }
    public setCertified(): void {
        this.status =  Status.IN_CERTIFIED;
    }
    public assignVet(vetId: string): void {
        this.vetId = vetId;
    }
    public isSpeciesExempted(): boolean {
        // not recording vaccine status for immune species (ie return false)
        return (this.species in ImmuneSpecies);
    }

    public noVetStatus(): boolean {
        return ((this.vetId === null) || typeof (this.vetId) === 'undefined');
    }
}

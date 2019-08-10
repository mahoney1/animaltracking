import { Contract } from 'fabric-network';

import { Animal, IAnimal, Namespace, ProductionType, Species, Status } from '../../contract/src/model';

export class AnimalTracking {

    private contract: Contract;

    public constructor(contract: Contract) {
        this.contract = contract;
    }

    public async setupdemo(): Promise<void> {
        await this.contract.submitTransaction('setupdemo');
    }

    public async register(species: Species, animalId: string, dob: string, description: string, owner: string, location: string, field: string, status: Status, prodType: ProductionType, isVaccinated: string): Promise<string> {
        const buffer = await this.contract.submitTransaction('register', species, animalId, dob, description, owner, location, field, status, prodType, isVaccinated);
        return buffer.toString('utf8');
    }

    public async depart(species: Species, animalId: string): Promise<void> {
        await this.contract.submitTransaction('depart', species, animalId);
    }

    public async arrive(species: Species, animalId: string, location: string, owner: string): Promise<void> {
        await this.contract.submitTransaction('arrive', species, animalId, location, owner);
    }
    public async move(species: Species, animalId: string, field: string): Promise<void> {
        await this.contract.submitTransaction('move', species, animalId, field);
    }
    public async quarantine(species: Species, animalId: string): Promise<void> {
        await this.contract.submitTransaction('quarantine', species, animalId);
    }
    public async assigninspection(species: Species, animalId: string, vetId: string): Promise<void> {
        await this.contract.submitTransaction('assigninspection', species, animalId, vetId);
    }
    public async certify(species: Species, animalId: string): Promise<void> {
        await this.contract.submitTransaction('certify', species, animalId);
    }
    public async purge(species: Species, animalId: string): Promise<void> {
        await this.contract.submitTransaction('purge', species, animalId);
    }
    public async queryHist(species: Species, animalId: string): Promise<string> {
        const results = await this.contract.submitTransaction('queryHist', species, animalId);
        return results.toString('utf8');
    }
    public async queryByOwner(owner: string): Promise<string> {
        const results = await this.contract.submitTransaction('queryByOwner', owner);
        return results.toString('utf8');
    }
    public async querySGRegistrations(): Promise<string> {
        const results = await this.contract.submitTransaction('querySGRegistrations');
        return results.toString('utf8');
    }
    public async queryAdHoc(querystr: string): Promise<string> {
        const results = await this.contract.submitTransaction('queryAdHoc', querystr);
        return results.toString('utf8');
    }
}

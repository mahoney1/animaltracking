"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class MyAnimal extends model_1.Animal {
    // ANIMAL SPECIFIC METHODS eg.
    static createInstance(species, id, dob, description, owner, location, field, status, productionType, isVaccinated) {
        return new MyAnimal({ species, id, dob, description, owner, location, field, status, productionType, isVaccinated });
    }
    constructor(obj) {
        super();
        Object.assign(this, obj);
    }
    getLocation() {
        return this.location;
    }
    setInTransit() {
        this.status = model_1.Status.IN_TRANSIT;
    }
    setInQuarantine() {
        this.status = model_1.Status.IN_QUARANTINE;
    }
    setVaccinated() {
        this.isVaccinated = true;
    }
    setInExamine() {
        this.status = model_1.Status.IN_EXAMINATION;
    }
    setInAssigned() {
        this.field = 'INSPECTION.BAY1';
        this.status = model_1.Status.IN_ASSIGNED;
    }
    setInField() {
        this.status = model_1.Status.IN_FIELD;
    }
    setField(field) {
        this.field = field;
    }
    setInPurged() {
        this.status = model_1.Status.IN_BUTCHERS;
    }
    setLocation(location) {
        this.location = location;
    }
    setOwner(owner) {
        this.owner = owner;
    }
    setCertified() {
        this.status = model_1.Status.IN_CERTIFIED;
    }
    assignVet(vetId) {
        this.vetId = vetId;
    }
    isSpeciesExempted() {
        // not recording vaccine status for immune species (ie return false)
        return (this.species in model_1.ImmuneSpecies);
    }
    noVetStatus() {
        return ((this.vetId === null) || typeof (this.vetId) === 'undefined');
    }
}
exports.MyAnimal = MyAnimal;
//# sourceMappingURL=animal.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = 'org.example.animaltracking';
exports.AnimalClass = exports.Namespace + '.' + 'Animal';
// evolutionary superspecies
var ImmuneSpecies;
(function (ImmuneSpecies) {
    ImmuneSpecies["SHEEPGOAT"] = "SHEEPGOAT";
})(ImmuneSpecies = exports.ImmuneSpecies || (exports.ImmuneSpecies = {}));
var Priority;
(function (Priority) {
    Priority[Priority["INFO"] = 1] = "INFO";
    Priority[Priority["WARN"] = 2] = "WARN";
    Priority[Priority["CRITICAL"] = 3] = "CRITICAL";
})(Priority = exports.Priority || (exports.Priority = {}));
var Species;
(function (Species) {
    Species["CATTLE"] = "CATTLE";
    Species["DEER"] = "DEER";
    Species["GOAT"] = "GOAT";
    Species["PIG"] = "PIG";
    Species["LLAMA"] = "LLAMA";
    Species["SHEEP"] = "SHEEP";
    Species["SHEEPGOAT"] = "SHEEPGOAT";
})(Species = exports.Species || (exports.Species = {}));
var Status;
(function (Status) {
    Status["IN_FIELD"] = "IN_FIELD";
    Status["IN_TRANSIT"] = "IN_TRANSIT";
    Status["IN_QUARANTINE"] = "IN_QUARANTINE";
    Status["IN_ASSIGNED"] = "IN_ASSIGNED";
    Status["IN_EXAMINATION"] = "IN_EXAMINATION";
    Status["IN_CERTIFIED"] = "IN_CERTIFIED";
    Status["IN_BUTCHERS"] = "IN_BUTCHERS";
})(Status = exports.Status || (exports.Status = {}));
var ProductionType;
(function (ProductionType) {
    ProductionType["DAIRY"] = "DAIRY";
    ProductionType["MEAT"] = "MEAT";
    ProductionType["WOOL"] = "WOOL";
    ProductionType["RESEARCH"] = "RESEARCH";
})(ProductionType = exports.ProductionType || (exports.ProductionType = {}));
class GeneralClass {
    // constructor() { // eg if you need one
    // };
    getClass() {
        // return 'whatever-you-want-this-function-to-do';
        return this.constructor.name;
    }
    getFQName() {
        return exports.Namespace + this.constructor.name; // as an example
    }
}
// declaration merging replaced - now Animal implements IAnimal interface defs with benefits of field checking in VSCode
class Animal extends GeneralClass {
}
exports.Animal = Animal;
//# sourceMappingURL=model.js.map
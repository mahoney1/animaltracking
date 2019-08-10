"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
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
var GeneralClass = /** @class */ (function () {
    function GeneralClass() {
    }
    // constructor() { // eg if you need one
    // };
    GeneralClass.prototype.getClass = function () {
        // return 'whatever-you-want-this-function-to-do';
        return this.constructor.name;
    };
    GeneralClass.prototype.getFQName = function () {
        return exports.Namespace + this.constructor.name; // as an example
    };
    return GeneralClass;
}());
// declaration merging replaced - now Animal implements IAnimal interface defs with benefits of field checking in VSCode
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animal;
}(GeneralClass));
exports.Animal = Animal;

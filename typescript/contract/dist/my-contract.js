"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
const animal_1 = require("./animal");
const ledger_1 = require("./ledger");
const model_1 = require("./model");
const query_1 = require("./query");
const utils_1 = require("./utils");
class AnimalContext extends fabric_contract_api_1.Context {
    constructor() {
        super();
        const animal = new animal_1.MyAnimal(this);
    }
}
exports.AnimalContext = AnimalContext;
// Main Contract
class MyContract extends fabric_contract_api_1.Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super(model_1.Namespace);
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     */
    async instantiate() {
        console.info('instantiate called');
    }
    // below - txn function can be called by client TS (string params), internal demo setup function (JS object), or
    // as a VSCode submit txn (ie string params) - function will handle all 3 scenarios
    /**
     * register an animal
     *
     * @param {Context} ctx the transaction context
     * @param {String} animalDetails full animal string
     */
    async register(ctx, species, id, dob, description, owner, location, field, status, productionType, isVaccinated) {
        let animal;
        // just the comma-separated data parameters provided then, one assumes (eg VSCode submit for example)
        // as its a sample, we will register an object based on order of the fields according to the model
        // parameters passed eg.
        // ["SHEEPGOAT", "000011", "24/07/2019", "BOVIS_ARIES", "FARMER.JOHN", "AVONDALE.LOC1", "ARRIVAL_AV1", "IN_FIELD", "WOOL", "false"]
        // ["SHEEPGOAT", "000012", "01/08/2019", "BOVIS_ARIES", "FARMER.JANE", "YORKDALE.LOC1", "ARRIVAL_Y1", "IN_FIELD", "RESEARCH", "false"]
        animal = animal_1.MyAnimal.createInstance(species, id, dob, description, owner, location, field, status, productionType, JSON.parse(isVaccinated));
        // let classname = animal.getClass();   // fyi generalClass (see model.ts file) methods could be called here
        // console.log('class is ', classname); // eg. shown here for demo purposes
        // Add the invoking CN, to the state - purely for reporting purposes (eg. history of an animal)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        // now register on the ledger using the 'universal' private _register function, it handles diff formats
        await this._register(ctx, animal); // includes putState etc
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
     * depart an animal - from / to a location
     *
     * @param {Context} ctx the transaction context
     * @param {Species} species species
     * @param {String} id animal ID
     */
    async depart(ctx, species, id) {
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        // change movement status to 'in transit'
        animal.setInTransit();
        // Add the invoking CN, to the state - purely for reporting purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
    * 'arrive' an animal - different location or a newborn
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} location location ID
    * @param {String} owner owner ID
    */
    async arrive(ctx, species, id, location, owner) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        animal.setInQuarantine();
        // change location
        animal.setLocation(location);
        animal.setOwner(owner);
        // Add the invoking CN, to the state - purely for reporting purposes only
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
    * Animal in quarantine is under Examination by a Vet
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    */
    async quarantine(ctx, species, id) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        // change movement status to under examination and update status of animal
        animal.setInExamine();
        // Add the invoking CN, to the state - purely for reporting purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        if (animal.species === 'SHEEPGOAT') {
            // fire the contract event for animal tracking
            const events = [];
            const event = { level: model_1.Priority.CRITICAL, action: 'GEEP_ISOLATION', timestamp: utils_1.Utils.getTxDate(ctx), animal };
            events.push(event);
            ctx.stub.setEvent('animaltracking-ev', Buffer.from(JSON.stringify(events)));
        }
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
    * Assign a vet for subsequent vet standard examination
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} vetId vet ID
    */
    async assigninspection(ctx, species, id, vetId) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        animal.assignVet(vetId);
        animal.setInAssigned();
        // Add the invoking CN, to the state - purely for reporting purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        if (animal.species === 'SHEEPGOAT') {
            // fire the contract event for animal tracking
            const events = [];
            const event = { level: model_1.Priority.CRITICAL, action: 'GEEP_INSPECT', timestamp: utils_1.Utils.getTxDate(ctx), animal };
            events.push(event);
            ctx.stub.setEvent('animaltracking-ev', Buffer.from(JSON.stringify(events)));
        }
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
    * Act of certifying an assigned animal by a vet
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    */
    async certify(ctx, species, id) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        if (animal.noVetStatus()) {
            console.log('sorry, cannot certify this animal without a VetId assigned');
            return 'UNASSIGNED';
        }
        // As a super-evolutionary species, SHEEPGOATS don't require vaccination (they're ahead in the evolutionary game)
        // so no need to update vaccine status
        if (!animal.isSpeciesExempted()) {
            animal.setVaccinated();
        }
        // Otherwise, business as usual ...
        animal.setCertified();
        // Add the invoking CN, to the state - purely for reporting purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
     move an animal - within same location (eg farm)
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} field  field ID
    */
    async move(ctx, species, id, field) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        // change status and register as a field movement  eg. QuqueryHarantine.Bay -> FIELD1
        animal.setInField(); // status = IN_FIELDqueryH
        animal.setField(field); // physical field eg. IoT data trqueryHacking input
        // Add the invoking CN, to the state - purely for reportiqueryHng purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /**
        * 'Purge' an animal ..ahem ..
        *
        * @param {Context} ctx the transaction context
        * @param {Species} species species
        * @param {String} id animal ID
    */
    async purge(ctx, species, id) {
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const animal = new animal_1.MyAnimal(await ledger_1.Ledger.getStateByKey(ctx, cKey));
        if ((animal.id === null) || typeof (animal.id) === 'undefined') {
            throw new Error(`Main: Animal with ID ${id} does not exist `);
        }
        animal.setInPurged();
        // Add the invoking CN, to the state - purely for reporting purposes only (obviously, its already available)
        animal.invokingId = utils_1.Utils.getInvoker(ctx);
        animal.fcn = utils_1.Utils.getTxnName(ctx); // again, purely for reporting purposes
        await ledger_1.Ledger.deleteStateByKey(ctx, cKey);
        return Buffer.from(JSON.stringify(animal)); // return buffer to calling client
    }
    /*** Main query functions */
    /**
     queryHist Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {Species} species the species
    * @param {String} id the animal id
    */
    async queryHist(ctx, species, id) {
        // Get a key to be used for History query
        // lookup animal by id
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [species, id]);
        const queryObj = new query_1.Query();
        const results = await queryObj.getHistory(ctx, cKey);
        console.log('main: queryHist was called and returned ' + JSON.stringify(results));
        return results;
    }
    /**
     queryByOwner Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {String} owner animal owner
    */
    async queryByOwner(ctx, owner) {
        const queryObj = new query_1.Query();
        const results = await queryObj.runQuery(ctx, 'selectAnimalsByOwner', owner);
        console.log('main: queryByOwner was called and returned ' + JSON.stringify(results));
        return results;
    }
    /**
     querySGRegistrations Animal Tracking
    * @param {Context} ctx the transaction context
    */
    async querySGRegistrations(ctx) {
        const queryObj = new query_1.Query();
        const results = await queryObj.runQuery(ctx, 'selectsSGRegistrations');
        console.log('main: querySGRegistrations was called and returned ' + JSON.stringify(results));
        return results;
    }
    /**
     queryAdHoc Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {String} queryName the actual query to call (defined in the model)
    * @param {String} queryString the parameters to pass
    */
    async queryAdHoc(ctx, queryString) {
        const queryObj = new query_1.Query();
        const results = await queryObj.runDynamicQuery(ctx, queryString);
        console.log('main: Query: was called with querystring : ' + queryString + 'and returned ' + JSON.stringify(results));
        return results;
    }
    /***** DEMO TXN FUNCTIONS *********************************************************************************/
    /**
    * @param {Context} ctx the transaction context
    */
    async setupdemo(ctx, prefix) {
        // makes it easy to register new data
        if ((prefix === null) || typeof (prefix) === 'undefined') {
            prefix = 'L-'; // for Local - otherwise as you wish - eg I_for IBP
        }
        else {
            prefix = prefix + '-';
        }
        // JS Objects or just raw parameter strings as shown in 'register' main function earlier in this Contract
        const animal1 = new animal_1.MyAnimal({ species: model_1.Species.CATTLE, id: prefix + 'JC22/0001', dob: '18/06/2017', description: 'Jersey Cow', owner: 'G0203', location: 'F23/1', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.MEAT, isVaccinated: false, fcn: 'register' });
        const animal2 = new animal_1.MyAnimal({ species: model_1.Species.CATTLE, id: prefix + 'HB19/0004', dob: '19/06/2017', description: 'Hereford Bullock', owner: 'G0203', location: 'F23/1', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.MEAT, isVaccinated: false, fcn: 'register' });
        const animal3 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0908', dob: '26/07/2019', description: 'BOVIS_ARIES - FEMALE', owner: 'FARMER.JUDE', location: 'SM953-1', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.WOOL, isVaccinated: false, fcn: 'register' });
        const animal4 = new animal_1.MyAnimal({ species: model_1.Species.PIG, id: prefix + '753-8602', dob: '06/10/2018', description: 'Gloucester Old Spot-Male', owner: 'FARMER.JUDE', location: 'H513', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.MEAT, isVaccinated: false, fcn: 'register' });
        const animal5 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0191', dob: '20/06/2018', description: 'BOVIS_ARIES - FEMALE', owner: 'FARMER.JOHN', location: 'F23/1', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal6 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0192', dob: '01/06/2019', description: 'BOVIS_ARIES - MALE', owner: 'FARMER.JOHN', location: 'F23/1', field: 'FIELD_A1', status: model_1.Status.IN_FIELD, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal7 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0193', dob: '11/06/2019', description: 'BOVIS_ARIES - MALE', owner: 'FARMER.JUDE', location: 'F23/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal8 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0194', dob: '20/07/2019', description: 'BOVIS_ARIES - MALE', owner: 'FARMER.JUDE', location: 'F23/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal9 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0195', dob: '21/07/2019', description: 'BOVIS_ARIES - MALE', owner: 'FARMER.JUDE', location: 'F23/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal10 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0196', dob: '22/07/2019', description: 'BOVIS_ARIES - MALE', owner: 'FARMER.JUDE', location: 'F23/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal11 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0197', dob: '23/07/2019', description: 'ARGENTUS_ARIES - MALE', owner: 'FARMER.JAY', location: 'F24/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        const animal12 = new animal_1.MyAnimal({ species: model_1.Species.SHEEPGOAT, id: prefix + 'SG37/0198', dob: '24/07/2019', description: 'ARGENTUS_ARIES - MALE', owner: 'FARMER.JAY', location: 'F24/22', field: 'FIELD_R1', status: model_1.Status.IN_EXAMINATION, productionType: model_1.ProductionType.RESEARCH, isVaccinated: false, fcn: 'register' });
        await this._register(ctx, animal1);
        await this._register(ctx, animal2);
        await this._register(ctx, animal3);
        await this._register(ctx, animal4);
        await this._register(ctx, animal5);
        await this._register(ctx, animal6);
        await this._register(ctx, animal7);
        await this._register(ctx, animal8);
        await this._register(ctx, animal9);
        await this._register(ctx, animal10);
        await this._register(ctx, animal11);
        await this._register(ctx, animal12);
        return 'OK';
    }
    /*********************** private functions for internal contract use ***************************/
    /**
     * register an animal: takes a class object instance as a param target
     *
     * @param {Context} ctx the transaction context
     * @param {MyAnimal} animal animal object
     */
    async _register(ctx, animal) {
        animal.class = model_1.AnimalClass; // set it before any registration occurs
        // check if the animal already exists?
        const cKey = ctx.stub.createCompositeKey(model_1.AnimalClass, [animal.species, animal.id]);
        const check = await ledger_1.Ledger.getStateByKey(ctx, cKey);
        if (check === 'NORECORD') {
            console.log('animal stringified is ' + JSON.stringify(animal)); // for logging purposes
            console.log(`_register:Animal with ID ${animal.id} being registered`); // for logging purposes
            console.log('************************************');
            // console.log("Private Data Testing");
            // let sample = "test";
            // let transactionId = ctx.stub.getTxID();
            // await ctx.stub.putPrivateData("collectionData", transactionId, Buffer.from(sample.toString()));
            //// needs to be a separate transaction (ie already committed) - to be moved
            //// let response = await ctx.stub.getPrivateData("collectionData",transactionId);
            //// console.log("Response",Buffer.from(response.toString()));
            if (animal.species === 'SHEEPGOAT') {
                // fire the contract event for animal tracking
                const events = [];
                const event = { level: model_1.Priority.INFO, action: 'GEEP_REGISTER', timestamp: utils_1.Utils.getTxDate(ctx), animal };
                events.push(event);
                ctx.stub.setEvent('animaltracking-ev', Buffer.from(JSON.stringify(events)));
            }
            await ctx.stub.putState(cKey, Buffer.from(JSON.stringify(animal)));
            // return 'SUBMITTED registration for key: ' + animal.species + animal.id;
        }
        else {
            console.log(`_register:Animal with ID ${animal.id} already exists`);
            throw new Error(`Animal with ID ${animal.id} already exists `);
        }
    }
}
exports.MyContract = MyContract;
//# sourceMappingURL=my-contract.js.map
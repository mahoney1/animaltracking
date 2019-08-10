import { Context, Contract } from 'fabric-contract-api';
import { ProductionType, Species, Status } from './model';
export declare class AnimalContext extends Context {
    constructor();
}
export declare class MyContract extends Contract {
    constructor();
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     */
    instantiate(): Promise<any>;
    /**
     * register an animal
     *
     * @param {Context} ctx the transaction context
     * @param {String} animalDetails full animal string
     */
    register(ctx: Context, species: Species, id: string, dob: string, description: string, owner: string, location: string, field: string, status: Status, productionType: ProductionType, isVaccinated: string): Promise<any>;
    /**
     * depart an animal - from / to a location
     *
     * @param {Context} ctx the transaction context
     * @param {Species} species species
     * @param {String} id animal ID
     */
    depart(ctx: Context, species: Species, id: string): Promise<any>;
    /**
    * 'arrive' an animal - different location or a newborn
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} location location ID
    * @param {String} owner owner ID
    */
    arrive(ctx: Context, species: Species, id: string, location: string, owner: string): Promise<any>;
    /**
    * Animal in quarantine is under Examination by a Vet
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    */
    quarantine(ctx: Context, species: Species, id: string): Promise<any>;
    /**
    * Assign a vet for subsequent vet standard examination
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} vetId vet ID
    */
    assigninspection(ctx: Context, species: Species, id: string, vetId: string): Promise<any>;
    /**
    * Act of certifying an assigned animal by a vet
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    */
    certify(ctx: Context, species: Species, id: string): Promise<any>;
    /**
     move an animal - within same location (eg farm)
    *
    * @param {Context} ctx the transaction context
    * @param {Species} species species
    * @param {String} id animal ID
    * @param {String} field  field ID
    */
    move(ctx: Context, species: Species, id: string, field: string): Promise<any>;
    /**
        * 'Purge' an animal ..ahem ..
        *
        * @param {Context} ctx the transaction context
        * @param {Species} species species
        * @param {String} id animal ID
    */
    purge(ctx: Context, species: Species, id: string): Promise<any>;
    /*** Main query functions */
    /**
     queryHist Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {Species} species the species
    * @param {String} id the animal id
    */
    queryHist(ctx: Context, species: Species, id: string): Promise<any>;
    /**
     queryByOwner Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {String} owner animal owner
    */
    queryByOwner(ctx: Context, owner: string): Promise<any>;
    /**
     querySGRegistrations Animal Tracking
    * @param {Context} ctx the transaction context
    */
    querySGRegistrations(ctx: Context): Promise<any>;
    /**
     queryAdHoc Animal Tracking
    * @param {Context} ctx the transaction context
    * @param {String} queryName the actual query to call (defined in the model)
    * @param {String} queryString the parameters to pass
    */
    queryAdHoc(ctx: Context, queryString: string): Promise<any>;
    /***** DEMO TXN FUNCTIONS *********************************************************************************/
    /**
    * @param {Context} ctx the transaction context
    */
    setupdemo(ctx: Context, prefix: string): Promise<any>;
    /*********************** private functions for internal contract use ***************************/
    /**
     * register an animal: takes a class object instance as a param target
     *
     * @param {Context} ctx the transaction context
     * @param {MyAnimal} animal animal object
     */
    private _register;
}

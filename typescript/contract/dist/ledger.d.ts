import { Context } from 'fabric-contract-api';
export declare class Ledger {
    static getStateByKey(ctx: Context, ledgerKey: string): Promise<any>;
    /**
    * Delete a state in the list. Puts the new state in world state with
    *
    */
    static deleteStateByKey(ctx: Context, ledgerKey: string): Promise<any>;
}


import { Context } from 'fabric-contract-api';
import { Utils } from './utils';

export class Ledger   {

    // ledgerKey passed in, provides the statelist/key combo of the key being queried

    public static async getStateByKey(ctx: Context, ledgerKey: string): Promise<any> {

        const data: Buffer = await ctx.stub.getState(ledgerKey);
        if (( !data.length)  || typeof(data) === 'undefined') {
            console.log(`Ledger: Record with ID ${ledgerKey} doesn't EXIST`);
            return 'NORECORD';
        }
        const state: object = Utils.deserialize(data);
        return state;
    }

    /**
    * Delete a state in the list. Puts the new state in world state with
    *
    */
    public static async deleteStateByKey(ctx: Context, ledgerKey: string): Promise<any> {
        // the check to see if the key is present is done by calling script/function

        const check = await this.getStateByKey(ctx, ledgerKey);

        if (check === 'NORECORD') {
            console.log(`Ledger: Delete check failed for ${ledgerKey} - it doesn't EXIST`);
        } else {
            await ctx.stub.deleteState(ledgerKey);
        }
    }

}

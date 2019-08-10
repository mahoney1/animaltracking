"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Ledger {
    // ledgerKey passed in, provides the statelist/key combo of the key being queried
    static async getStateByKey(ctx, ledgerKey) {
        const data = await ctx.stub.getState(ledgerKey);
        if ((!data.length) || typeof (data) === 'undefined') {
            console.log(`Ledger: Record with ID ${ledgerKey} doesn't EXIST`);
            return 'NORECORD';
        }
        const state = utils_1.Utils.deserialize(data);
        return state;
    }
    /**
    * Delete a state in the list. Puts the new state in world state with
    *
    */
    static async deleteStateByKey(ctx, ledgerKey) {
        // the check to see if the key is present is done by calling script/function
        const check = await this.getStateByKey(ctx, ledgerKey);
        if (check === 'NORECORD') {
            console.log(`Ledger: Delete check failed for ${ledgerKey} - it doesn't EXIST`);
        }
        else {
            await ctx.stub.deleteState(ledgerKey);
        }
    }
}
exports.Ledger = Ledger;
//# sourceMappingURL=ledger.js.map
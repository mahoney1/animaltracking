"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    // Utility functions to be called back in contract or modeled classes
    /**
    * grab the invoking CN from the X509 transactor cert
    * @param {Context} ctx the transaction context
    */
    static getInvoker(ctx) {
        // Use the Client Identity object to get the invoker info.
        const cid = ctx.clientIdentity;
        const id = cid.getID(); // X509 Certificate invoker is in CN form
        const CN = id.substring(id.indexOf('CN=') + 3, id.lastIndexOf('::'));
        return CN;
    }
    static getTxnName(ctx) {
        const ret = ctx.stub.getFunctionAndParameters();
        return ret.fcn.substring(ret.fcn.lastIndexOf(':') + 1); // chop off namespace prefix to get fcn name
    }
    /**
    * @return the Transaction date as a Javascript Date Object.
    */
    static getTxDate(ctx) {
        return new Date(ctx.stub.getTxTimestamp().getSeconds() * 1000);
    }
    static fromBuffer(data) {
        return this.deserialize(Buffer.from(JSON.parse(data)));
    }
    static toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
    /**
     * Deserialize object into one of a set of supported JS classes
     * i.e. Covert serialized data to JS object
     * Typically used after getState() ledger API
     * @param {Buffer} data to deserialize into JSON object
     * @return {Object} object with the data to store
     */
    static deserialize(data) {
        const object = JSON.parse(data.toString());
        return object;
    }
    static checkJSON(data) {
        if ((data !== null) && typeof (data) !== 'undefined') {
            try {
                JSON.parse(data);
                return true; // if exception caught, will return false below
            }
            catch (e) {
                console.log('NOT JSON or VALID JSON');
                return false;
            }
        }
        else {
            return false;
        } // no exceptions for empty string but not valid JSON either
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map
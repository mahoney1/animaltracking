import { Context } from 'fabric-contract-api';

export class Utils   {

    // Utility functions to be called back in contract or modeled classes
    /**
    * grab the invoking CN from the X509 transactor cert
    * @param {Context} ctx the transaction context
    */
    public static getInvoker(ctx: Context): string {

        // Use the Client Identity object to get the invoker info.
        const cid = ctx.clientIdentity;
        const id = cid.getID(); // X509 Certificate invoker is in CN form
        const CN = id.substring(id.indexOf('CN=') + 3, id.lastIndexOf('::'));
        return CN;
    }

    public static getTxnName(ctx: Context) {
        const ret = ctx.stub.getFunctionAndParameters();
        return ret.fcn.substring(ret.fcn.lastIndexOf(':') + 1); // chop off namespace prefix to get fcn name
    }

    /**
    * @return the Transaction date as a Javascript Date Object.
    */
    public static getTxDate(ctx: Context): Date {
        return new Date(ctx.stub.getTxTimestamp().getSeconds() * 1000);
    }
    public static fromBuffer(data: string) {
        return this.deserialize(Buffer.from(JSON.parse(data)));
    }

    public static toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize object into one of a set of supported JS classes
     * i.e. Covert serialized data to JS object
     * Typically used after getState() ledger API
     * @param {Buffer} data to deserialize into JSON object
     * @return {Object} object with the data to store
     */
    public static deserialize(data: Buffer): any {
        const object = JSON.parse(data.toString());
        return object;
    }

    public static checkJSON(data: any): boolean {
        if ( (data !== null) && typeof(data) !== 'undefined') {
          try {
               JSON.parse(data);
               return true; // if exception caught, will return false below
          } catch (e) {
               console.log('NOT JSON or VALID JSON');
               return false;
          }
        } else { return false; } // no exceptions for empty string but not valid JSON either
    }

}

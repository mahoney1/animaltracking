/// <reference types="node" />
import { Context } from 'fabric-contract-api';
export declare class Utils {
    /**
    * grab the invoking CN from the X509 transactor cert
    * @param {Context} ctx the transaction context
    */
    static getInvoker(ctx: Context): string;
    static getTxnName(ctx: Context): string;
    /**
    * @return the Transaction date as a Javascript Date Object.
    */
    static getTxDate(ctx: Context): Date;
    static fromBuffer(data: string): any;
    static toBuffer(): Buffer;
    /**
     * Deserialize object into one of a set of supported JS classes
     * i.e. Covert serialized data to JS object
     * Typically used after getState() ledger API
     * @param {Buffer} data to deserialize into JSON object
     * @return {Object} object with the data to store
     */
    static deserialize(data: Buffer): any;
    static checkJSON(data: any): boolean;
}

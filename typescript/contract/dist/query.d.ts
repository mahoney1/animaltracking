import { Context } from 'fabric-contract-api';
export declare class Query {
    /**
     * run a mango specified query. If the dataset is large, this could have performance impacts
     * so should consider using pagination.
     * @async
     * @param ctx The transaction context
     * @param mango The mango query to run
     * @returns all the results from that query
     */
    runDynamicQuery(ctx: Context, mango: string): Promise<any[]>;
    /**
     * callable method to run a named query defined in this contract. This is just a simple
     * example so only actually allows for a single parameter.
     * @async
     * @param ctx The transaction context
     * @param queryName The name of the query to run
     * @param queryParams the parameters to supply to that query
     * @returns all the results from that query
     */
    runQuery(ctx: Context, queryName: string, queryParams?: string): Promise<any[]>;
    getHistory(ctx: Context, compositeKey: string): Promise<any>;
    /**
         * Helper method to get all the history results from an iterator
         * @async
         * @param ctx The transaction context
         * @param iterator The iterator
         * @returns an array of the objects that represent the information.
         */
    private _getAllHistoryResults;
    /**
     * Helper method to get all the query results from an iterator
     * @async
     * @param ctx The transaction context
     * @param iterator The iterator
     * @returns an array of the objects that represent the information.
     */
    private _getAllResults;
}

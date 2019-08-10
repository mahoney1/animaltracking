import { Context} from 'fabric-contract-api';
import { Iterators, QueryResponseMetadata, StateQueryResponse } from 'fabric-shim';
import { AnimalClass, IQuery, IResource, Species } from './model';

// Define the queries.

const selectAnimalsByClass: IQuery = { selector: {class: AnimalClass}};
const selectAnimalsByOwner: IQuery = { selector: {class: AnimalClass, owner: '%1'}};
const selectAnimalsBySpecies: IQuery = { selector: {class: AnimalClass, species: '%1'}};
const selectsSGRegistrations: IQuery = { selector: {species: Species.SHEEPGOAT, fcn: 'register'}};
// obviously GetByPartialKey can do similar for 1st item below

const queryMap = {
   selectAnimalsByClass,
   selectAnimalsByOwner,
   selectAnimalsBySpecies,
   selectsSGRegistrations,
};

export class Query   {

    // DYNAMIC/AD-HOC QUERY HELPER FUNCTIONS
    /**
     * run a mango specified query. If the dataset is large, this could have performance impacts
     * so should consider using pagination.
     * @async
     * @param ctx The transaction context
     * @param mango The mango query to run
     * @returns all the results from that query
     */
    public async runDynamicQuery(ctx: Context, mango: string): Promise<any[]> {
        // sample code (getQueryResult is not good for large datasets as this code will load
        // the complete result set into memory then return it  - should consider pagination)
        // if the result set is going to get large - see
        // https://fabric-shim.github.io/master/fabric-shim.ChaincodeStub.html#getQueryResultWithPagination
        // for more info on usage, sample code below.

        const iterator: Iterators.StateQueryIterator = await ctx.stub.getQueryResult(mango);
        const results: IResource[] = await this._getAllResults(ctx, iterator);

        /* Pagination
        const info: StateQueryResponse<Iterators.StateQueryIterator> = await ctx.stub.getQueryResultWithPagination(mango, 100);
        const iterator2: Iterators.StateQueryIterator = info.iterator;
        const md: QueryResponseMetadata = info.metadata;
        const bm: string = md.bookmark;
        const cc: number = md.fetched_records_count;
        */

        return results;
    }

    /**
     * callable method to run a named query defined in this contract. This is just a simple
     * example so only actually allows for a single parameter.
     * @async
     * @param ctx The transaction context
     * @param queryName The name of the query to run
     * @param queryParams the parameters to supply to that query
     * @returns all the results from that query
     */
    public async runQuery(ctx: Context, queryName: string, queryParams?: string): Promise<any[]> {

        let mango: string = JSON.stringify(queryMap[queryName]);

        if (mango) {
            // if no %1 param, then the param is hardcoded (eg. 'register' gets all 'register' txn types)
            if (mango.indexOf('%1') > 0 && queryParams && queryParams.length > 0) {
                mango = mango.replace('%1', queryParams);
            }
            console.log('query is ' + mango);
            return await this.runDynamicQuery(ctx, mango);
        }
        throw new Error(`query ${queryName} does not exist`);
    }

    // HISTORY QUERY HELPER FUNCTIONS
    public async getHistory(ctx: Context, compositeKey: string): Promise<any> {
        // create the composite key in composer format
        // const compositeKey = ctx.stub.createCompositeKey(type + ':' + $class, [id]);
        const historyIterator: Iterators.HistoryQueryIterator = await ctx.stub.getHistoryForKey(compositeKey);
        return await this._getAllHistoryResults(ctx, historyIterator);
    }

    /**
         * Helper method to get all the history results from an iterator
         * @async
         * @param ctx The transaction context
         * @param iterator The iterator
         * @returns an array of the objects that represent the information.
         */
    private async _getAllHistoryResults(ctx: Context, iterator: Iterators.HistoryQueryIterator): Promise<any> {
        const results = [];
        let ts: Date; let ms: number;
        let res: Iterators.NextKeyModificationResult = { done: false, value: null };
        while (!res.done) {
            res = await iterator.next();
            const itVal: Iterators.KeyModification = res.value;
            if (itVal) {
                ts = new Date((itVal.timestamp.getSeconds() * 1000));
                ms = itVal.timestamp.getNanos() / 1000000;
                ts.setMilliseconds(ms);
                const resp: any = {
                    // timestamp: itVal.timestamp,
                    Timestamp: ts,
                    TxId: itVal.tx_id,
                };
                if (itVal.is_delete) {
                    resp.data = 'DELETED';
                } else {
                    resp.data = JSON.parse(itVal.value.toString('utf8'));
                }
                results.push(resp);
            }
            if (res && res.done) {
                try {
                    await iterator.close();
                } catch (err) {
                    console.log(err);
                }
                return results;
            }
        }
    }

    /**
     * Helper method to get all the query results from an iterator
     * @async
     * @param ctx The transaction context
     * @param iterator The iterator
     * @returns an array of the objects that represent the information.
     */
    private async _getAllResults(ctx: Context, iterator: Iterators.StateQueryIterator): Promise<any> {
        const results = [];
        let res: Iterators.NextResult = { done: false, value: null };
        while (!res.done) {
            res = await iterator.next();
            const itVal: Iterators.KV = res.value;
            if (itVal && itVal.value) {
                const val = itVal.value.toString('utf8');
                if (val.length > 0) {
                    results.push(JSON.parse(val));
                }
            }
            if (res && res.done) {
                try {
                    await iterator.close();
                } catch (err) {
                    console.log(err);
                }
                return results;
            }
        }
    }
}

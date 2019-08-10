import {
    FileSystemWallet,
    Gateway,
    GatewayOptions,
} from 'fabric-network';

import {AnimalClass, IAnimal, ProductionType, Species, Status } from '../../contract/src/model';
// load app client config data
import * as CONFIG from '../cfg/clientCfg.json';
import { AnimalTracking } from './AnimalTracking';

import fs = require('fs');
import path = require('path');
import util = require('util');

const readFileAsync = util.promisify(fs.readFile);

let contract: any = null; // set, in setupContract() then we use evaluationTransaction for queries (no blocks committed)

let gw: any = null ; // gateway object set in setupContract, then disconnected in main function

// Wallet directory and Connection Profile sources
const WALLET_DIRECTORY = path.join(CONFIG.HOME, CONFIG.WALLETDIR, CONFIG.WALLET);
const CCP = path.join(CONFIG.HOME, CONFIG.CCP_FILE);

export class QueryClient {

    public async run(): Promise<void> {

        const animalTracking = await this.setupContract();

        // these fields are just used as demo settings - animals are created by the accompanying tutorial
        const id = CONFIG.HISTORY_ID;
        const species = 'SHEEPGOAT';
        const owner = 'FARMER.JUDE';
        const productionType = 'RESEARCH';
        console.log('............');

        console.log(' ');
        console.log('Calling queryHist to get the history of Animal with species:' + species + ' and id:' + id);
        console.log('===============================================================================================');
        console.log(' ');
        const queryResponse = await contract.evaluateTransaction('queryHist', species as Species, id);

        const file = await fs.writeFileSync('results.json', queryResponse, 'utf8');
        console.log('the query HISTORY response is ' + queryResponse);
        console.log('Transaction complete.');
        console.log(' ');

        console.log(' ');
        console.log('Calling queryByOwner to get the list of animals owned by ' + owner);
        console.log('===========================================================================');
        console.log(' ');
        const queryResponse2 = await contract.evaluateTransaction('queryByOwner', owner);

        const file2 = await fs.writeFileSync('owners.json', queryResponse2, 'utf8');
        console.log('the query OWNER response is ' + queryResponse2);
        console.log('Transaction complete.');
        console.log(' ');

        console.log(' ');
        console.log('Calling queryAdHoc to get all animals of a particular productionType = ' + productionType);
        console.log('========================================================================================');
        console.log(' ');
        // if using an index (in time), use this selector instead, where index name is one you've created in your chaincode spec
        // const selector = '{"selector":{"productionType":"' + productionType + '"}, "use_index": "selectByTypeDoc"}';
        const selector = '{"selector":{"productionType":"' + productionType + '"}}';
        const queryResponse3 = await contract.evaluateTransaction('queryAdHoc', selector);

        const file3 = await fs.writeFileSync('adhoc.json', queryResponse3, 'utf8');
        console.log('the query ADHOC response is ' + queryResponse3);
        console.log('Transaction complete.');
        console.log(' ');

        console.log(' ');

        console.log('Calling querySGRegistrations to get the list of all SHEEPGOATS registrations ');
        console.log('=============================================================================');
        console.log(' ');
        const queryResponse4 = await contract.evaluateTransaction('querySGRegistrations', species as Species);

        const file4 = await fs.writeFileSync('registrations.json', queryResponse4, 'utf8');
        console.log('the query OWNERs response is ' + queryResponse4);
        console.log('Transaction complete.');
        console.log(' ');

        console.log('............');
        gw.disconnect();

    }

    private async setupContract(): Promise<AnimalTracking> {
        // set up the wallet location
        const wallet = await this.createWallet();
        // check if our Identity has cert/key wallet
        const check = await this.checkWallet(wallet);
        if (check === 'NO_ID') {
            console.log('sorry, no Identity to interact with the Contract....');
        } else {
            console.log('setup/found Wallet location, setting up Gateway ....');
        }

        const gatewayOptions: GatewayOptions = {
            identity: CONFIG.IDENTITY_LABEL,
            wallet,
            discovery: { enabled: true },
        };
        const gateway = new Gateway();
        gw = gateway;
        console.log('Reading connection profile file:', CCP);
        const connectionProfileBuff = await readFileAsync(CCP);
        const connectionProfile = JSON.parse(connectionProfileBuff.toString('utf8'));

        await gateway.connect(connectionProfile, gatewayOptions);
        const network = await gateway.getNetwork(CONFIG.CHANNEL);
        contract = network.getContract(CONFIG.CONTRACT_NAME, CONFIG.CONTRACT_NAMESPACE);

        return new AnimalTracking(contract);
    }

    private async createWallet(): Promise<FileSystemWallet> {
        // console.log("Using wallet directory:", WALLET_DIRECTORY);
        const wallet = new FileSystemWallet(WALLET_DIRECTORY);
        return wallet;
    }

    private async checkWallet(wallet: FileSystemWallet): Promise<string> {
        const identityExists = await wallet.exists(CONFIG.IDENTITY_LABEL);
        if (identityExists) {
            return 'GOOD';
        } else {
            // console.log("No identity credentials found for " + CONFIG.IDENTITY_LABEL);
            return 'NO_ID';
        }
    }
}

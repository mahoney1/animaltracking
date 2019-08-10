import {
    FileSystemWallet,
    Gateway,
    GatewayOptions,
} from 'fabric-network';

import {AnimalClass, IAnimal, ProductionType, Species, Status } from '../../contract/src/model';
// load app client config data
import * as CONFIG from '../cfg/clientCfg.json';
import { AnimalTracking } from './AnimalTracking';
import { EventClient } from './EventClient';

import fs = require('fs');
import path = require('path');
import util = require('util');

const readFileAsync = util.promisify(fs.readFile);

let gw: any = null ; // gateway object set in setupContract, then disconnected in main function
// Wallet directory and Connection Profile sources
const WALLET_DIRECTORY = path.join(CONFIG.HOME, CONFIG.WALLETDIR, CONFIG.WALLET);
const CCP = path.join(CONFIG.HOME, CONFIG.CCP_FILE);

export class EventQueryClient {

    public async run(): Promise<void> {

            const client = new EventClient();

        /*    (async () => {

                try {
                await (client.run())
                console.log("DONE");
                }
                catch(error) {
                     console.error;
                }
		})(); */

            console.log('............');

            console.log(' ');
            console.log('Calling EventQuery');
            console.log('===============================================================================================');
            console.log(' ');
            const queryResponse = await (client.run());

            const file = await fs.writeFileSync('events.json', queryResponse, 'utf8');
            console.log('the query HISTORY response is ' + queryResponse);
            console.log('Transaction complete.');
            console.log(' ');

            console.log('===========================================================================');

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
            // tslint:disable-next-line: object-literal-sort-keys
            discovery: { enabled: true },
            // discovery: { asLocalhost: true, enabled: false }
        };
        const gateway = new Gateway();
        gw = gateway;
        console.log('Reading connection profile file:', CCP);
        const connectionProfileBuff = await readFileAsync(CCP);
        const connectionProfile = JSON.parse(connectionProfileBuff.toString('utf8'));

        await gateway.connect(connectionProfile, gatewayOptions);
        const network = await gateway.getNetwork(CONFIG.CHANNEL);
        const contract = network.getContract(CONFIG.CONTRACT_NAME, CONFIG.CONTRACT_NAMESPACE);

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

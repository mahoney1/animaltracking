import {EventEmitter} from 'events';
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

// let contract = null;

const gw = null ; // gateway object set in setupContract, then disconnected in main function

// Wallet directory and Connection Profile sources
const WALLET_DIRECTORY = path.join(CONFIG.HOME, CONFIG.WALLETDIR, CONFIG.IBP_WALLET);
const CCP = path.join(CONFIG.HOME, CONFIG.IBP_CCP_FILE);

// The instantiable class for running the Event Listener

export class EventClient extends EventEmitter {

    public async run(): Promise<void> {

        console.log(' ');
        console.log('This is the Event Client run from EventListener.ts wrapper ');
        console.log('===============================================================================================');
        console.log(' ');
        console.log('............');
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
            identity: CONFIG.IBP_IDENTITY_LABEL,
            wallet,
            // tslint:disable-next-line: object-literal-sort-keys
            discovery: { enabled: true, asLocalhost: false },
        };
        const gateway = new Gateway();

        console.log('Reading IBP connection profile file: ', CCP);
        const connectionProfileBuff = await readFileAsync(CCP);
        const connectionProfile = JSON.parse(connectionProfileBuff.toString('utf8'));

        await gateway.connect(connectionProfile, gatewayOptions);
        console.log('Getting network...');
        const network = await gateway.getNetwork(CONFIG.IBP_CHANNEL);
        console.log('Getting contract...');
        const contract = network.getContract(CONFIG.CONTRACT_NAME, CONFIG.CONTRACT_NAMESPACE);
        console.log('Getting listener...');
        const file1 = fs.writeFileSync('events.json', '');

        const listener = await contract.addContractListener(CONFIG.LISTENER_NAME, CONFIG.EVENT_NAME, (error: Error, event: any, blockNumber: string, transactionId: string, status: string): any  => {
            if (error) {
               console.error(error);
               return;
            }
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            if (status && status === 'VALID') {
                console.log('Payload Details:');
                const evt = event.payload.toString('utf8');
                const evt1 = JSON.parse(evt);
                console.log('Event PAYLOAD is ' + event.payload.toString('utf8'));
                const file = fs.appendFileSync('rawevents.json', evt);

                if (Array.isArray(evt1)) {
                        for (const oneEvent of evt1) {
                            this.emit('ContractEvent: ', oneEvent);
                        }
                    } else {
                        this.emit('ContractEvent  - single', evt1);
                    }
            }
        } ,
         {filtered: false},
    );

    }

    private async createWallet(): Promise<FileSystemWallet> {
        // console.log("Using wallet directory:", WALLET_DIRECTORY);
        const wallet = new FileSystemWallet(WALLET_DIRECTORY);
        return wallet;
    }

    private async checkWallet(wallet: FileSystemWallet): Promise<string> {
        const identityExists = await wallet.exists(CONFIG.IBP_IDENTITY_LABEL);
        if (identityExists) {
            return 'GOOD';
        } else {
            // console.log("No identity credentials found for " + CONFIG.IBP_IDENTITY_LABEL);
            return 'NO_ID';
        }
    }
}

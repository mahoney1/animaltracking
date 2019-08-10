"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var events_1 = require("events");
var fabric_network_1 = require("fabric-network");
// load app client config data
var CONFIG = require("../cfg/clientCfg.json");
var fs = require("fs");
var path = require("path");
var util = require("util");
var readFileAsync = util.promisify(fs.readFile);
// let contract = null;
var gw = null; // gateway object set in setupContract, then disconnected in main function
// Wallet directory and Connection Profile sources
var WALLET_DIRECTORY = path.join(CONFIG.HOME, CONFIG.WALLETDIR, CONFIG.IBP_WALLET);
var CCP = path.join(CONFIG.HOME, CONFIG.IBP_CCP_FILE);
// The instantiable class for running the Event Listener
var EventClient = /** @class */ (function (_super) {
    __extends(EventClient, _super);
    function EventClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventClient.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, check, gatewayOptions, gateway, connectionProfileBuff, connectionProfile, network, contract, file1, listener;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(' ');
                        console.log('This is the Event Client run from EventListener.ts wrapper ');
                        console.log('===============================================================================================');
                        console.log(' ');
                        console.log('............');
                        return [4 /*yield*/, this.createWallet()];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, this.checkWallet(wallet)];
                    case 2:
                        check = _a.sent();
                        if (check === 'NO_ID') {
                            console.log('sorry, no Identity to interact with the Contract....');
                        }
                        else {
                            console.log('setup/found Wallet location, setting up Gateway ....');
                        }
                        gatewayOptions = {
                            identity: CONFIG.IBP_IDENTITY_LABEL,
                            wallet: wallet,
                            // tslint:disable-next-line: object-literal-sort-keys
                            discovery: { enabled: true, asLocalhost: false }
                        };
                        gateway = new fabric_network_1.Gateway();
                        console.log('Reading IBP connection profile file: ', CCP);
                        return [4 /*yield*/, readFileAsync(CCP)];
                    case 3:
                        connectionProfileBuff = _a.sent();
                        connectionProfile = JSON.parse(connectionProfileBuff.toString('utf8'));
                        return [4 /*yield*/, gateway.connect(connectionProfile, gatewayOptions)];
                    case 4:
                        _a.sent();
                        console.log('Getting network...');
                        return [4 /*yield*/, gateway.getNetwork(CONFIG.IBP_CHANNEL)];
                    case 5:
                        network = _a.sent();
                        console.log('Getting contract...');
                        contract = network.getContract(CONFIG.CONTRACT_NAME, CONFIG.CONTRACT_NAMESPACE);
                        console.log('Getting listener...');
                        file1 = fs.writeFileSync('events.json', '');
                        return [4 /*yield*/, contract.addContractListener(CONFIG.LISTENER_NAME, CONFIG.EVENT_NAME, function (error, event, blockNumber, transactionId, status) {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                console.log("Block Number: " + blockNumber + " Transaction ID: " + transactionId + " Status: " + status);
                                if (status && status === 'VALID') {
                                    console.log('Payload Details:');
                                    var evt = event.payload.toString('utf8');
                                    var evt1 = JSON.parse(evt);
                                    console.log('Event PAYLOAD is ' + event.payload.toString('utf8'));
                                    var file = fs.appendFileSync('rawevents.json', evt);
                                    if (Array.isArray(evt1)) {
                                        for (var _i = 0, evt1_1 = evt1; _i < evt1_1.length; _i++) {
                                            var oneEvent = evt1_1[_i];
                                            _this.emit('ContractEvent: ', oneEvent);
                                        }
                                    }
                                    else {
                                        _this.emit('ContractEvent  - single', evt1);
                                    }
                                }
                            }, { filtered: false })];
                    case 6:
                        listener = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventClient.prototype.createWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                wallet = new fabric_network_1.FileSystemWallet(WALLET_DIRECTORY);
                return [2 /*return*/, wallet];
            });
        });
    };
    EventClient.prototype.checkWallet = function (wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var identityExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wallet.exists(CONFIG.IBP_IDENTITY_LABEL)];
                    case 1:
                        identityExists = _a.sent();
                        if (identityExists) {
                            return [2 /*return*/, 'GOOD'];
                        }
                        else {
                            // console.log("No identity credentials found for " + CONFIG.IBP_IDENTITY_LABEL);
                            return [2 /*return*/, 'NO_ID'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventClient;
}(events_1.EventEmitter));
exports.EventClient = EventClient;

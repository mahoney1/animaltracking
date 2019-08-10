"use strict";
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
var fabric_network_1 = require("fabric-network");
// load app client config data
var CONFIG = require("../cfg/clientCfg.json");
var AnimalTracking_1 = require("./AnimalTracking");
var fs = require("fs");
var path = require("path");
var util = require("util");
var readFileAsync = util.promisify(fs.readFile);
var contract = null; // set, in setupContract() then we use evaluationTransaction for queries (no blocks committed)
var gw = null; // gateway object set in setupContract, then disconnected in main function
// Wallet directory and Connection Profile sources
var WALLET_DIRECTORY = path.join(CONFIG.HOME, CONFIG.WALLETDIR, CONFIG.WALLET);
var CCP = path.join(CONFIG.HOME, CONFIG.CCP_FILE);
var QueryClient = /** @class */ (function () {
    function QueryClient() {
    }
    QueryClient.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var animalTracking, id, species, owner, productionType, queryResponse, file, queryResponse2, file2, selector, queryResponse3, file3, queryResponse4, file4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setupContract()];
                    case 1:
                        animalTracking = _a.sent();
                        id = CONFIG.HISTORY_ID;
                        species = 'SHEEPGOAT';
                        owner = 'FARMER.JUDE';
                        productionType = 'RESEARCH';
                        console.log('............');
                        console.log(' ');
                        console.log('Calling queryHist to get the history of Animal with species:' + species + ' and id:' + id);
                        console.log('===============================================================================================');
                        console.log(' ');
                        return [4 /*yield*/, contract.evaluateTransaction('queryHist', species, id)];
                    case 2:
                        queryResponse = _a.sent();
                        return [4 /*yield*/, fs.writeFileSync('results.json', queryResponse, 'utf8')];
                    case 3:
                        file = _a.sent();
                        console.log('the query HISTORY response is ' + queryResponse);
                        console.log('Transaction complete.');
                        console.log(' ');
                        console.log(' ');
                        console.log('Calling queryByOwner to get the list of animals owned by ' + owner);
                        console.log('===========================================================================');
                        console.log(' ');
                        return [4 /*yield*/, contract.evaluateTransaction('queryByOwner', owner)];
                    case 4:
                        queryResponse2 = _a.sent();
                        return [4 /*yield*/, fs.writeFileSync('owners.json', queryResponse2, 'utf8')];
                    case 5:
                        file2 = _a.sent();
                        console.log('the query OWNER response is ' + queryResponse2);
                        console.log('Transaction complete.');
                        console.log(' ');
                        console.log(' ');
                        console.log('Calling queryAdHoc to get all animals of a particular productionType = ' + productionType);
                        console.log('========================================================================================');
                        console.log(' ');
                        selector = '{"selector":{"productionType":"' + productionType + '"}}';
                        return [4 /*yield*/, contract.evaluateTransaction('queryAdHoc', selector)];
                    case 6:
                        queryResponse3 = _a.sent();
                        return [4 /*yield*/, fs.writeFileSync('adhoc.json', queryResponse3, 'utf8')];
                    case 7:
                        file3 = _a.sent();
                        console.log('the query ADHOC response is ' + queryResponse3);
                        console.log('Transaction complete.');
                        console.log(' ');
                        console.log(' ');
                        console.log('Calling querySGRegistrations to get the list of all SHEEPGOATS registrations ');
                        console.log('=============================================================================');
                        console.log(' ');
                        return [4 /*yield*/, contract.evaluateTransaction('querySGRegistrations', species)];
                    case 8:
                        queryResponse4 = _a.sent();
                        return [4 /*yield*/, fs.writeFileSync('registrations.json', queryResponse4, 'utf8')];
                    case 9:
                        file4 = _a.sent();
                        console.log('the query OWNERs response is ' + queryResponse4);
                        console.log('Transaction complete.');
                        console.log(' ');
                        console.log('............');
                        gw.disconnect();
                        return [2 /*return*/];
                }
            });
        });
    };
    QueryClient.prototype.setupContract = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, check, gatewayOptions, gateway, connectionProfileBuff, connectionProfile, network;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createWallet()];
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
                            identity: CONFIG.IDENTITY_LABEL,
                            wallet: wallet,
                            discovery: { enabled: true }
                        };
                        gateway = new fabric_network_1.Gateway();
                        gw = gateway;
                        console.log('Reading connection profile file:', CCP);
                        return [4 /*yield*/, readFileAsync(CCP)];
                    case 3:
                        connectionProfileBuff = _a.sent();
                        connectionProfile = JSON.parse(connectionProfileBuff.toString('utf8'));
                        return [4 /*yield*/, gateway.connect(connectionProfile, gatewayOptions)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, gateway.getNetwork(CONFIG.CHANNEL)];
                    case 5:
                        network = _a.sent();
                        contract = network.getContract(CONFIG.CONTRACT_NAME, CONFIG.CONTRACT_NAMESPACE);
                        return [2 /*return*/, new AnimalTracking_1.AnimalTracking(contract)];
                }
            });
        });
    };
    QueryClient.prototype.createWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet;
            return __generator(this, function (_a) {
                wallet = new fabric_network_1.FileSystemWallet(WALLET_DIRECTORY);
                return [2 /*return*/, wallet];
            });
        });
    };
    QueryClient.prototype.checkWallet = function (wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var identityExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wallet.exists(CONFIG.IDENTITY_LABEL)];
                    case 1:
                        identityExists = _a.sent();
                        if (identityExists) {
                            return [2 /*return*/, 'GOOD'];
                        }
                        else {
                            // console.log("No identity credentials found for " + CONFIG.IDENTITY_LABEL);
                            return [2 /*return*/, 'NO_ID'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return QueryClient;
}());
exports.QueryClient = QueryClient;

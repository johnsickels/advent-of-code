"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const refreshTokens = {
    nonSubscriber: "3b46970318ae295282a1d5b4d6155ffb24993716c32ae91adb15f88f21bd5480db4df4a9e1f295d157e128aa5ba77c8ecd48389b2f07c4578e317760927836fdd57069c2142a947c32f2ab32220f33f73faa960f942caa15e4fe",
    subscriber: "fa42c6581809ad4af689ffcff2bb23f4741229bab81813bef6633a2ccb97a8cd9c2a3f5ed0c57acc841e5fc61a803f8a060c6897f195c7949bd4cbc55baa4cca39899d4535777bd07dfdf4bb1edb63d1ca7ca133c5c0d83f0326"
};
exports.jwt = {
    nonSubscriber: null,
    subscriber: null,
};
const login = function (refreshToken) {
    return new Promise((resolve, reject) => {
        request.post({
            url: "https://api30.milesplit.com/api/refresh-tokens",
            body: { token: refreshToken },
            json: true
        }, function (err, httpResponse, json) {
            if (err) {
                return reject(err);
            }
            else if (json.token) {
                return resolve(json.token);
            }
            else {
                reject("There was no token in the response. " + JSON.stringify(json));
            }
        });
    });
};
exports.getTokens = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.jwt.nonSubscriber !== null) {
            return true;
        }
        return Promise.all([
            login(refreshTokens.nonSubscriber),
            login(refreshTokens.subscriber)
        ]).then(function (tokens) {
            return __awaiter(this, void 0, void 0, function* () {
                exports.jwt.nonSubscriber = tokens[0];
                exports.jwt.subscriber = tokens[1];
            });
        });
    });
};

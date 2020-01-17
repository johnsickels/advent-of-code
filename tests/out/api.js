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
const flagpole_1 = require("flagpole");
const suite = flagpole_1.Flagpole.suite("Critical Paths of API");
suite
    .verifySslCert(false)
    .json("Meets API Loads List of Meets")
    .open("/api/v1/meets")
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context
        .assert("Should have a respond body", context.response.body.toString().length)
        .greaterThan(0)
        .assert("HTTP status is 200", context.response.statusCode)
        .equals(200)
        .assert("Should load in under a second", context.response.loadTime)
        .optional.lessThan(100);
    const data = yield context.exists("data");
    context
        .assert("Data should be an array", data)
        .type.equals("array")
        .assert("Should be more than one meet in data", data)
        .length.greaterThan(0)
        .comment(`there are ${data.toString().length} meets`);
    const firstMeet = yield context.exists("data[0]");
    context
        .assert(`First meet has a name: ${data.$[0].name}`, data.$[0].name)
        .length.greaterThan(0);
}));

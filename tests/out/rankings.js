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
const auth_1 = require("./helpers/auth");
const util_1 = require("./helpers/util");
const loginAsNonSubscriber = scenario => {
    scenario.setCookie("jwt_token", auth_1.jwt.nonSubscriber);
};
const loginAsSubscriber = scenario => {
    scenario.setCookie("jwt_token", auth_1.jwt.subscriber);
};
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Rankings Sites").beforeAll(auth_1.getTokens);
suite
    .verifySslCert(false)
    .html(`Load Rankings Leader`)
    .open("/rankings/leaders")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Rankings"))
    .next(util_1.expectUrlToContain("/rankings/leaders"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Rankings");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context
        .assert(yield side.find(".trending"))
        .exists()
        .assert(yield side.find("section.trending > header"))
        .contains("Trending")
        .assert(yield side.findAll("section.trending > ul > li"))
        .length.greaterThan(0)
        .assert(yield side.find(".twitter"))
        .exists();
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const tableTitle = yield context.exists("#content h1");
    context.assert(yield tableTitle.getInnerText()).contains("Leaders");
    yield context.exists("#rankingsTable");
    const eventLinks = yield context.findAll("#rankingsTable tr td.event a");
    context
        .assert(`Should be events (${eventLinks.length})`, eventLinks.length)
        .greaterThan(0);
    const eventLink = yield eventLinks[Math.floor(Math.random() * eventLinks.length)].getAttribute("href");
    notLoggedIn.open(eventLink.$);
    loggedInNonsubscriber.open(eventLink.$);
    loggedInSubscriber.open(eventLink.$);
}));
const notLoggedIn = suite
    .html(`Load Events Page: Not Logged In`)
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedOut)
    .next(util_1.expectToSeePaywall)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert(context.response.finalUrl).contains("/pro/");
}));
const loggedInNonsubscriber = suite
    .html(`Load Events Page: Non-Subscriber`)
    .before(loginAsNonSubscriber)
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedIn)
    .next(util_1.expectToSeePaywall)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert(context.response.finalUrl).contains("/pro/");
}));
const loggedInSubscriber = suite
    .html(`Load Events Page: Subscriber`)
    .before(loginAsSubscriber)
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedIn)
    .next(util_1.expectToSeeContent)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert(context.response.finalUrl).not.contains("/pro/");
}));

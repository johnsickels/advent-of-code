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
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Athletes Site").beforeAll(auth_1.getTokens);
const athletes = suite
    .verifySslCert(false)
    .html("Athletes")
    .open("/athletes")
    .next(util_1.basicPageChecks)
    .next(util_1.expectUrlToContain("/athletes"))
    .next(util_1.expectToSeeContent)
    .next("Search Form checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield context.find(".hero form");
    context.assert("Should be a form", form).not.equals(null);
    context
        .assert("Form action attribute should be /athletes/search", yield form.getAttribute("action"))
        .equals("/athletes/search");
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#rankedAthletes");
    const athleteLinks = yield context.findAll("#rankedAthletes a");
    context
        .assert(`Should be athletes (${athleteLinks.length})`, athleteLinks.length)
        .greaterThan(0);
    const randomAthlete = Math.floor(Math.random() * athleteLinks.length);
    yield athleteLinks[randomAthlete].exists(".profile-image");
    const athleteName = yield athleteLinks[randomAthlete].find(".athlete-name");
    context
        .assert("Athlete has a name", yield athleteName.getInnerText())
        .not.equals(null);
    yield athleteLinks[randomAthlete].find(".performance");
    context
        .assert("Athlete has a top performance", yield athleteName.getInnerText())
        .not.equals(null);
    yield context.exists("#loadMore");
}))
    .next("Athlete checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const athleteLink = yield context.find("#rankedAthletes a");
    const athletePageUrl = yield athleteLink.getAttribute("href");
    athletePage.open(athletePageUrl.$);
    athletePageNonSubscriber.open(athletePageUrl.$);
    athletePageSubscriber.open(athletePageUrl.$);
}));
const athletePage = suite
    .html("Load Athlete Page: Not Logged In")
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedOut)
    .next(util_1.expectToSeePaywall)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.comment(context.response.finalUrl.$);
}));
const athletePageNonSubscriber = suite
    .html("Load Athletes Page: Non-Subscriber")
    .before(loginAsNonSubscriber)
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedIn)
    .next(util_1.expectToSeePaywall)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.comment(context.response.finalUrl.$);
}));
const athletePageSubscriber = suite
    .html("Load Events Page: Subscriber")
    .before(loginAsSubscriber)
    .next(util_1.basicPageChecks)
    .next(util_1.isLoggedIn)
    .next(util_1.expectToSeeContent)
    .next((context) => __awaiter(void 0, void 0, void 0, function* () {
    context.comment(context.response.finalUrl.$);
}));

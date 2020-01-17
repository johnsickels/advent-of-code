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
const util_1 = require("./helpers/util");
const faker = require("faker");
const state = faker.address.state();
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Teams Page");
suite
    .verifySslCert(false)
    .html("Teams Home Page Loads")
    .open("/teams")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Teams Search"))
    .next(util_1.expectUrlToContain("/teams"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Teams");
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).contains("Teams Search");
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield context.find("#content form");
    context.assert("Should be a form", form).not.equals(null);
    context
        .assert("Form method attribute should be GET", yield form.getAttribute("method"))
        .equals("GET");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}));
suite
    .html("Teams Search Loads")
    .open(`/teams?q=${state}`)
    .next(util_1.expectTitleToContain("Teams Search"))
    .next(util_1.expectUrlToContain(state))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Teams");
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).contains("Teams Search");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    const sideSections = yield side.findAll("section header");
    context
        .assert("Filter by City exists", sideSections[0])
        .contains("Filter by City");
    context
        .assert("Filter by Category exists", sideSections[1])
        .contains("Filter by Category");
    context
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield context.find("#content form");
    context.assert("Should be a form", form).not.equals(null);
    context
        .assert("Form method attribute should be GET", yield form.getAttribute("method"))
        .equals("GET");
    const results = yield context.findAll(".search-results li");
    context
        .assert(`Should be search results (${results.length})`, results.length)
        .greaterThan(0);
    const teamLink = yield results[Math.floor(Math.random() * results.length)].find("a");
    const teamPath = yield teamLink.getAttribute("href");
    context.assert(teamPath).includes("/teams/");
    teamLink.click(teamPage);
}));
const teamPage = suite
    .browser("Team Page Loads")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Roster"))
    .next(util_1.expectUrlToContain("/teams/"))
    .next(util_1.expectToSeeContent)
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#roster");
    yield context.exists("#roster table");
    const athletes = yield context.findAll("#roster a");
    context
        .assert(`Should be athletes (${athletes.length})`, athletes.length)
        .greaterThan(0);
}));

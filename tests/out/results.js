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
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Results Navbar Tab");
suite
    .verifySslCert(false)
    .html("Results Page Loads")
    .open("/results")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Results"))
    .next(util_1.expectUrlToContain("/results"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Meet Results");
    const title = yield context.find("#content h1");
    context
        .assert(yield title.getInnerText())
        .contains("United States Track & Field and Cross Country Meet Results");
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert("Form filter exists", "#frmFilter").exists();
    context.assert("Month selector exists", "#ddMonth").exists();
    const meetLinks = yield context.findAll(".results tbody tr td.name a");
    context
        .assert(`Table has ${meetLinks.length} results`, meetLinks.length)
        .greaterThan(0);
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context.assert(yield side.find(".videosWidget")).exists();
    context
        .assert(yield side.find("section.widget.videosWidget > header"))
        .contains("Videos");
    context
        .assert(yield side.findAll("section.widget.videosWidget > article"))
        .length.greaterThan(0);
    context.assert(yield side.find(".trending")).exists();
    context
        .assert(yield side.find("section.trending > header"))
        .contains("Trending");
    context
        .assert(yield side.findAll("section.trending > ul > li"))
        .length.greaterThan(0);
    context.assert(yield side.find(".twitter")).exists();
}));

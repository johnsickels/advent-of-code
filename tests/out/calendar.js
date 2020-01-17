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
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Calendar Site");
suite
    .verifySslCert(false)
    .html("Calendar Homepage Loads")
    .open("/calendar")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Meet Calendar"))
    .next(util_1.expectUrlToContain("/calendar"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Race Calendar");
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).contains("Meets");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context
        .assert(yield side.find(".videosWidget"))
        .exists()
        .assert(yield side.find("section.videosWidget > header"))
        .contains("Videos")
        .assert(yield side.findAll("section.videosWidget article"))
        .length.greaterThan(0)
        .assert(yield side.find(".trending"))
        .exists()
        .assert(yield side.find("section.trending > header"))
        .contains("Trending on MileSplit")
        .assert(yield side.findAll("section.trending > ul > li"))
        .length.greaterThan(0)
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#content select#ddSeason");
    yield context.exists("#content select[name='year']");
    yield context.exists("#content select#ddMonth");
    yield context.exists("#content select#ddLevel");
    yield context.exists("input#searchCalendar");
    const calendar = yield context.exists("table#tableCalendar");
    const meets = yield calendar.findAll("tr");
    context
        .assert(`Should be meets (${meets.length})`, meets.length)
        .greaterThan(0);
    const meetLink = yield calendar.find("a");
    meetLink.click(meetPage);
}));
const meetPage = suite
    .html("Meet Page Loads")
    .next(util_1.basicPageChecks)
    .next(util_1.expectToSeeContent)
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield context.findAll("#content article");
    context
        .assert(`Should be articles (${articles.length})`, articles.length)
        .greaterThan(0);
}));

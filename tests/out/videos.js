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
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Videos Page");
suite
    .verifySslCert(false)
    .html("Videos Home Page Loads")
    .open("/videos")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Videos"))
    .next(util_1.expectUrlToContain("/videos"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Videos");
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).contains("Videos");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context.assert(yield side.find(".trending")).exists();
    context
        .assert(yield side.find("section.trending > header"))
        .contains("Popular Videos");
    context
        .assert(yield side.findAll("section.trending > ul > li"))
        .length.greaterThan(0);
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
    yield context.exists(".videos");
    const videos = yield context.findAll(".videos article");
    context
        .assert(`Should be videos (${videos.length})`, videos.length)
        .greaterThan(0);
    yield videos[0].exists("figure");
    const videoLinks = yield videos[0].findAll("a");
    context.assert(videoLinks[0]).contains("/videos/");
    context.assert(videoLinks[2]).contains("/meets/");
    const nextButton = yield context.find("footer.pagination");
    context.assert("Next button exists", nextButton).contains("Next");
    const nextButtonLink = yield nextButton.find("a");
    context
        .assert(yield nextButtonLink.getAttribute("href"))
        .includes("/videos");
    videoLinks[0].click(videoPage);
}));
const videoPage = suite
    .html("Video Page Loads")
    .next(util_1.basicPageChecks)
    .next(util_1.expectUrlToContain("/videos/"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).not.equals(null);
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).not.equals(null);
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context.assert(yield side.find(".taggedAthletes")).exists();
    context
        .assert(yield side.find("section.taggedAthletes > header"))
        .contains("Tagged Athletes");
    context.assert(yield side.find("section.video.list")).exists();
    context
        .assert(yield side.find("section.video.list > header"))
        .contains("Popular Videos");
    context
        .assert(yield side.findAll("section.video.list > ul > li"))
        .length.greaterThan(0);
    context
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert("#content .video").exists();
    const meetLink = yield context.find("#content .video .coverage a");
    context.assert(yield meetLink.getAttribute("href")).includes("/meets/");
    const articles = yield context.findAll(".related.list.videos article");
    context
        .assert(`Should be articles (${articles.length})`, articles.length)
        .greaterThan(0);
    const nextButton = yield context.findAll("#content footer");
    const nextButtonLink = yield nextButton[0].find("a");
    context
        .assert(yield nextButtonLink.getAttribute("href"))
        .includes("/meets/");
    const nextButtonLink2 = yield nextButton[1].find("a");
    context
        .assert(yield nextButtonLink2.getAttribute("href"))
        .includes("/videos");
}));

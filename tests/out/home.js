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
const suite = flagpole_1.Flagpole.suite("Test MileSplit");
suite
    .verifySslCert(false)
    .html("Test MileSplit Hompage")
    .open("/")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("MileSplit"))
    .next(util_1.expectUrlToContain("milesplit"))
    .next(util_1.expectToSeeContent)
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    const meetCoverage = yield context.findAll("section.meetCoverage header");
    context
        .assert("Live Event Coverage exists", meetCoverage[0])
        .contains("Live Event Coverage")
        .assert("Meet Coverage exists", meetCoverage[1])
        .contains("Meet Coverage")
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}))
    .next("Top Stories checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const coverStory = yield context.exists("#content .coverStory");
    const coverStoryImage = yield coverStory.exists("img");
    coverStoryImage.load("Cover Story Image loaded", (image) => __awaiter(void 0, void 0, void 0, function* () {
        context.assert(yield image.find("width")).equals(620);
    }));
    context.assert(yield coverStory.find(".title strong")).exists();
    const coverStoryLink = yield coverStory.find("a");
    context
        .assert(yield coverStoryLink.getAttribute("href"))
        .includes("/articles/");
    yield context.exists("#content .topStories");
    const topStories = yield context.findAll("#content .topStories article");
    context
        .assert(`Should be top stories (${topStories.length})`, topStories.length)
        .greaterThan(0)
        .assert("Every article has an image and a title", topStories)
        .every((story) => __awaiter(void 0, void 0, void 0, function* () {
        const img = yield story.find("imj");
        console.log(img);
        return yield img.hasAttribute("src");
    }));
}))
    .next("Videos", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#content .videos");
    const videoArticles = yield context.findAll("#content .videos article");
    context
        .assert(`Video articles exist (${videoArticles.length})`, videoArticles.length)
        .greaterThan(0);
    const moreVideos = yield context.find("#content .videos footer a");
    context
        .assert("More Videos button links to '/videos'", yield moreVideos.getAttribute("href"))
        .equals("/videos");
}))
    .next("Photo Albums", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#content .albums");
    const photoAlbums = yield context.findAll("#content .albums article");
    context
        .assert(`Photo albums exist (${photoAlbums.length})`, photoAlbums.length)
        .greaterThan(0);
    const morePhotos = yield context.find("#content .albums footer a");
    context
        .assert("More Photos button links to '/photos'", yield morePhotos.getAttribute("href"))
        .equals("/photos");
}))
    .next("More Headlines", (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.exists("#content .moreStories");
    const moreStories = yield context.findAll("#content .moreStories article");
    context
        .assert(`More Headlines exist (${moreStories.length})`, moreStories.length)
        .greaterThan(0);
    const moreArticles = yield context.find("#content .moreStories footer a");
    context
        .assert("More Articles button links to '/articles'", yield moreArticles.getAttribute("href"))
        .equals("/articles");
}));

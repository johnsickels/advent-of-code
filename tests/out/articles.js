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
const suite = flagpole_1.Flagpole.suite("Basic Smoke Test of Articles Page");
suite
    .verifySslCert(false)
    .html("Articles Home Page Loads")
    .open("/articles")
    .next(util_1.basicPageChecks)
    .next(util_1.expectTitleToContain("Articles"))
    .next(util_1.expectUrlToContain("/articles"))
    .next(util_1.expectToSeeContent)
    .next("Subheader checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const header = yield context.find("#subheader > header");
    context.assert(yield header.getInnerText()).contains("Articles");
    const title = yield context.find("#content h1");
    context.assert(yield title.getInnerText()).contains("News");
}))
    .next("Side checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const side = yield context.find("#side");
    context
        .assert(yield side.find(".trending"))
        .exists()
        .assert(yield side.find("section.trending > header"))
        .contains("Trending")
        .assert("Twitter Widget exists", yield side.find(".twitter"))
        .exists();
}))
    .next("Content checks", (context) => __awaiter(void 0, void 0, void 0, function* () {
    context.assert("Form filter exists", "#frmFilter").exists();
    const articles = yield context.findAll(".articles article");
    context
        .assert(`Should be articles (${articles.length})`, articles.length)
        .greaterThan(0);
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    context
        .assert("Article has a photo", yield randomArticle.find("img"))
        .exists()
        .assert("Article has a title", yield randomArticle.find("strong"))
        .exists()
        .assert("Article has an author", yield randomArticle.find(".author"))
        .exists();
    const articleLink = yield randomArticle.find("a");
    const articlePath = yield articleLink.getAttribute("href");
    context.assert(articlePath).includes("/articles/");
    articleLink.click(articlePage);
}));
const articlePage = suite.html("Article Page Loads").next(util_1.basicPageChecks);

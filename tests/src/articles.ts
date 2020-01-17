import { Flagpole } from "flagpole";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain
} from "./helpers/util";

const suite = Flagpole.suite("Basic Smoke Test of Articles Page");

suite
  .verifySslCert(false)
  .html("Articles Home Page Loads")
  .open("/articles")
  .next(basicPageChecks)
  .next(expectTitleToContain("Articles"))
  .next(expectUrlToContain("/articles"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Articles");
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).contains("News");
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context
      .assert(await side.find(".trending"))
      .exists()
      .assert(await side.find("section.trending > header"))
      .contains("Trending")
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  })

  .next("Content checks", async context => {
    context.assert("Form filter exists", "#frmFilter").exists();
    const articles = await context.findAll(".articles article");
    context
      .assert(`Should be articles (${articles.length})`, articles.length)
      .greaterThan(0);
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    context
      .assert("Article has a photo", await randomArticle.find("img"))
      .exists()
      .assert("Article has a title", await randomArticle.find("strong"))
      .exists()
      .assert("Article has an author", await randomArticle.find(".author"))
      .exists();

    const articleLink = await randomArticle.find("a");
    const articlePath = await articleLink.getAttribute("href");
    context.assert(articlePath).includes("/articles/");
    articleLink.click(articlePage);
  });

const articlePage = suite.html("Article Page Loads").next(basicPageChecks);
// .next(expectUrlToContain("/articles/"));
// Some articles link to '/videos'

// .next(expectToSeePaywall);
// some articles require subscription, conditional testing here...
// or hardcode article id...
// example here, jsut seeing if I can write more code

// conditional testing, not a good idea...
//// if url contains 'pro', then paywall is visible
////    else content is visible

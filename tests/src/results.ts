import { Flagpole } from "flagpole";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain
} from "./helpers/util";

const suite = Flagpole.suite("Basic Smoke Test of Results Navbar Tab");

suite
  .verifySslCert(false)
  .html("Results Page Loads")
  .open("/results")
  .next(basicPageChecks)
  .next(expectTitleToContain("Results"))
  .next(expectUrlToContain("/results"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Meet Results");
    const title = await context.find("#content h1");
    context
      .assert(await title.getInnerText())
      .contains("United States Track & Field and Cross Country Meet Results");
  })

  .next("Content checks", async context => {
    context.assert("Form filter exists", "#frmFilter").exists();
    context.assert("Month selector exists", "#ddMonth").exists();
    const meetLinks = await context.findAll(".results tbody tr td.name a");
    context
      .assert(`Table has ${meetLinks.length} results`, meetLinks.length)
      .greaterThan(0);
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context.assert(await side.find(".videosWidget")).exists();
    context
      .assert(await side.find("section.widget.videosWidget > header"))
      .contains("Videos");
    context
      .assert(await side.findAll("section.widget.videosWidget > article"))
      .length.greaterThan(0);
    context.assert(await side.find(".trending")).exists();
    context
      .assert(await side.find("section.trending > header"))
      .contains("Trending");
    context
      .assert(await side.findAll("section.trending > ul > li"))
      .length.greaterThan(0);
    context.assert(await side.find(".twitter")).exists();
  });

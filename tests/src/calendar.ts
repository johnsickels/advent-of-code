import { Flagpole } from "flagpole";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain
} from "./helpers/util";

const suite = Flagpole.suite("Basic Smoke Test of Calendar Site");

suite
  .verifySslCert(false)
  .html("Calendar Homepage Loads")
  .open("/calendar")
  .next(basicPageChecks)
  .next(expectTitleToContain("Meet Calendar"))
  .next(expectUrlToContain("/calendar"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Race Calendar");
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).contains("Meets");
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context
      .assert(await side.find(".videosWidget"))
      .exists()
      .assert(await side.find("section.videosWidget > header"))
      .contains("Videos")
      .assert(await side.findAll("section.videosWidget article"))
      .length.greaterThan(0)
      .assert(await side.find(".trending"))
      .exists()
      .assert(await side.find("section.trending > header"))
      .contains("Trending on MileSplit")
      .assert(await side.findAll("section.trending > ul > li"))
      .length.greaterThan(0)
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  })

  .next("Content checks", async context => {
    await context.exists("#content select#ddSeason");
    await context.exists("#content select[name='year']");
    await context.exists("#content select#ddMonth");
    await context.exists("#content select#ddLevel");
    await context.exists("input#searchCalendar");
    const calendar = await context.exists("table#tableCalendar");
    const meets = await calendar.findAll("tr");
    context
      .assert(`Should be meets (${meets.length})`, meets.length)
      .greaterThan(0);
    const meetLink = await calendar.find("a");
    meetLink.click(meetPage);
  });

const meetPage = suite
  .html("Meet Page Loads")
  .next(basicPageChecks)
  .next(expectToSeeContent)
  .next("Content checks", async context => {
    const articles = await context.findAll("#content article");
    context
      .assert(`Should be articles (${articles.length})`, articles.length)
      .greaterThan(0);
  });

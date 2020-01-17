import { Flagpole } from "flagpole";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain
} from "./helpers/util";

const suite = Flagpole.suite("Basic Smoke Test of Videos Page");

suite
  .verifySslCert(false)
  .html("Videos Home Page Loads")
  .open("/videos")
  .next(basicPageChecks)
  .next(expectTitleToContain("Videos"))
  .next(expectUrlToContain("/videos"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Videos");
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).contains("Videos");
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context.assert(await side.find(".trending")).exists();
    context
      .assert(await side.find("section.trending > header"))
      .contains("Popular Videos");
    context
      .assert(await side.findAll("section.trending > ul > li"))
      .length.greaterThan(0);
    context
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  })

  .next("Content checks", async context => {
    const form = await context.find("#content form");
    context.assert("Should be a form", form).not.equals(null);
    context
      .assert(
        "Form method attribute should be GET",
        await form.getAttribute("method")
      )
      .equals("GET");
    await context.exists(".videos");
    const videos = await context.findAll(".videos article");
    context
      .assert(`Should be videos (${videos.length})`, videos.length)
      .greaterThan(0);

    await videos[0].exists("figure");
    const videoLinks = await videos[0].findAll("a");
    context.assert(videoLinks[0]).contains("/videos/");
    context.assert(videoLinks[2]).contains("/meets/");

    const nextButton = await context.find("footer.pagination");
    context.assert("Next button exists", nextButton).contains("Next");
    const nextButtonLink = await nextButton.find("a");
    context
      .assert(await nextButtonLink.getAttribute("href"))
      .includes("/videos");

    videoLinks[0].click(videoPage);
  });

const videoPage = suite
  .html("Video Page Loads")
  .next(basicPageChecks)
  .next(expectUrlToContain("/videos/"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).not.equals(null);
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).not.equals(null);
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context.assert(await side.find(".taggedAthletes")).exists();
    context
      .assert(await side.find("section.taggedAthletes > header"))
      .contains("Tagged Athletes");
    context.assert(await side.find("section.video.list")).exists();
    context
      .assert(await side.find("section.video.list > header"))
      .contains("Popular Videos");
    context
      .assert(await side.findAll("section.video.list > ul > li"))
      .length.greaterThan(0);
    context
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  })

  .next("Content checks", async context => {
    context.assert("#content .video").exists();
    const meetLink = await context.find("#content .video .coverage a");
    context.assert(await meetLink.getAttribute("href")).includes("/meets/");
    const articles = await context.findAll(".related.list.videos article");
    context
      .assert(`Should be articles (${articles.length})`, articles.length)
      .greaterThan(0);
    const nextButton = await context.findAll("#content footer");
    const nextButtonLink = await nextButton[0].find("a");
    context
      .assert(await nextButtonLink.getAttribute("href"))
      .includes("/meets/");
    const nextButtonLink2 = await nextButton[1].find("a");
    context
      .assert(await nextButtonLink2.getAttribute("href"))
      .includes("/videos");
  });

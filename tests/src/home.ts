import { Flagpole, iValue } from "flagpole";
import {
  basicPageChecks,
  expectTitleToContain,
  expectUrlToContain,
  expectToSeeContent
} from "./helpers/util";

const suite = Flagpole.suite("Test MileSplit");

suite
  .verifySslCert(false)
  .html("Test MileSplit Hompage")
  .open("/")
  .next(basicPageChecks)
  .next(expectTitleToContain("MileSplit"))
  .next(expectUrlToContain("milesplit"))
  .next(expectToSeeContent)

  .next("Side checks", async context => {
    const side = await context.find("#side");

    const meetCoverage = await context.findAll("section.meetCoverage header");
    context
      .assert("Live Event Coverage exists", meetCoverage[0])
      .contains("Live Event Coverage")
      .assert("Meet Coverage exists", meetCoverage[1])
      .contains("Meet Coverage")
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  })

  .next("Top Stories checks", async context => {
    const coverStory = await context.exists("#content .coverStory");
    const coverStoryImage = await coverStory.exists("img");
    coverStoryImage.load("Cover Story Image loaded", async image => {
      context.assert(await image.find("width")).equals(620);
    });
    context.assert(await coverStory.find(".title strong")).exists();
    const coverStoryLink = await coverStory.find("a");
    context
      .assert(await coverStoryLink.getAttribute("href"))
      .includes("/articles/");

    await context.exists("#content .topStories");
    const topStories = await context.findAll("#content .topStories article");
    context
      .assert(`Should be top stories (${topStories.length})`, topStories.length)
      .greaterThan(0)
      .assert("Every article has an image and a title", topStories)
      .every(async (story: iValue) => {
        const img = await story.find("imj");
        console.log(img);

        // const title = await story.find(".title");
        // return !img.isNull() && !title.isNull();
        return await img.hasAttribute("src");
      });
    // .assert("Every thumbnail links to the article", topStories)
    // .every(async (story: iValue) => {
    //   const link = await story.find("a");
    //   const path = await link.getAttribute("href");
    //   return path.$.contains("/articles/");
    // });
  })

  // Videos
  .next("Videos", async context => {
    await context.exists("#content .videos");
    const videoArticles = await context.findAll("#content .videos article");
    context
      .assert(
        `Video articles exist (${videoArticles.length})`,
        videoArticles.length
      )
      .greaterThan(0);
    const moreVideos = await context.find("#content .videos footer a");
    context
      .assert(
        "More Videos button links to '/videos'",
        await moreVideos.getAttribute("href")
      )
      .equals("/videos");
  })

  // Photo Albums
  .next("Photo Albums", async context => {
    await context.exists("#content .albums");
    const photoAlbums = await context.findAll("#content .albums article");
    context
      .assert(`Photo albums exist (${photoAlbums.length})`, photoAlbums.length)
      .greaterThan(0);
    const morePhotos = await context.find("#content .albums footer a");
    context
      .assert(
        "More Photos button links to '/photos'",
        await morePhotos.getAttribute("href")
      )
      .equals("/photos");
  })

  // More Headlines
  .next("More Headlines", async context => {
    await context.exists("#content .moreStories");
    const moreStories = await context.findAll("#content .moreStories article");
    context
      .assert(
        `More Headlines exist (${moreStories.length})`,
        moreStories.length
      )
      .greaterThan(0);
    const moreArticles = await context.find("#content .moreStories footer a");
    context
      .assert(
        "More Articles button links to '/articles'",
        await moreArticles.getAttribute("href")
      )
      .equals("/articles");
  });

import { Flagpole } from "flagpole";
import { getTokens, jwt } from "./helpers/auth";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain,
  isLoggedOut,
  isLoggedIn,
  expectToSeePaywall
} from "./helpers/util";

const loginAsNonSubscriber = scenario => {
  scenario.setCookie("jwt_token", jwt.nonSubscriber);
};

const loginAsSubscriber = scenario => {
  scenario.setCookie("jwt_token", jwt.subscriber);
};

const suite = Flagpole.suite("Basic Smoke Test of Rankings Sites").beforeAll(
  getTokens
);

suite
  .verifySslCert(false)
  .html(`Load Rankings Leader`)
  .open("/rankings/leaders")
  .next(basicPageChecks)
  .next(expectTitleToContain("Rankings"))
  .next(expectUrlToContain("/rankings/leaders"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Rankings");
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context
      .assert(await side.find(".trending"))
      .exists()
      .assert(await side.find("section.trending > header"))
      .contains("Trending")
      .assert(await side.findAll("section.trending > ul > li"))
      .length.greaterThan(0)
      .assert(await side.find(".twitter"))
      .exists();
  })

  .next("Content checks", async context => {
    const tableTitle = await context.exists("#content h1");
    context.assert(await tableTitle.getInnerText()).contains("Leaders");
    await context.exists("#rankingsTable");
    const eventLinks = await context.findAll("#rankingsTable tr td.event a");
    context
      .assert(`Should be events (${eventLinks.length})`, eventLinks.length)
      .greaterThan(0);
    const eventLink = await eventLinks[
      Math.floor(Math.random() * eventLinks.length)
    ].getAttribute("href");
    notLoggedIn.open(eventLink.$);
    loggedInNonsubscriber.open(eventLink.$);
    loggedInSubscriber.open(eventLink.$);
  });

const notLoggedIn = suite
  .html(`Load Events Page: Not Logged In`)
  .next(basicPageChecks)
  .next(isLoggedOut)
  .next(expectToSeePaywall)
  .next(async context => {
    context.assert(context.response.finalUrl).contains("/pro/");
  });

const loggedInNonsubscriber = suite
  .html(`Load Events Page: Non-Subscriber`)
  .before(loginAsNonSubscriber)
  .next(basicPageChecks)
  .next(isLoggedIn)
  .next(expectToSeePaywall)
  .next(async context => {
    context.assert(context.response.finalUrl).contains("/pro/");
  });

const loggedInSubscriber = suite
  .html(`Load Events Page: Subscriber`)
  .before(loginAsSubscriber)
  .next(basicPageChecks)
  .next(isLoggedIn)
  .next(expectToSeeContent)
  .next(async context => {
    context.assert(context.response.finalUrl).not.contains("/pro/");
  });

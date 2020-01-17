import { Flagpole } from "flagpole";
import { getTokens, jwt } from "./helpers/auth";
import {
  basicPageChecks,
  expectTitleToContain,
  expectUrlToContain,
  expectToSeeContent,
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

const suite = Flagpole.suite("Basic Smoke Test of Athletes Site").beforeAll(
  getTokens
);

const athletes = suite
  .verifySslCert(false)
  .html("Athletes")
  .open("/athletes")
  .next(basicPageChecks)
  // No title on /athletes
  // .next(expectTitleToContain("Athletes"))
  .next(expectUrlToContain("/athletes"))
  .next(expectToSeeContent)

  .next("Search Form checks", async context => {
    const form = await context.find(".hero form");
    context.assert("Should be a form", form).not.equals(null);
    context
      .assert(
        "Form action attribute should be /athletes/search",
        await form.getAttribute("action")
      )
      .equals("/athletes/search");
  })

  .next("Content checks", async context => {
    await context.exists("#rankedAthletes");
    const athleteLinks = await context.findAll("#rankedAthletes a");
    context
      .assert(
        `Should be athletes (${athleteLinks.length})`,
        athleteLinks.length
      )
      .greaterThan(0);
    const randomAthlete = Math.floor(Math.random() * athleteLinks.length);
    await athleteLinks[randomAthlete].exists(".profile-image");
    const athleteName = await athleteLinks[randomAthlete].find(".athlete-name");
    context
      .assert("Athlete has a name", await athleteName.getInnerText())
      .not.equals(null);
    await athleteLinks[randomAthlete].find(".performance");
    context
      .assert("Athlete has a top performance", await athleteName.getInnerText())
      .not.equals(null);
    await context.exists("#loadMore");
  })

  .next("Athlete checks", async context => {
    const athleteLink = await context.find("#rankedAthletes a");
    const athletePageUrl = await athleteLink.getAttribute("href");

    athletePage.open(athletePageUrl.$);
    athletePageNonSubscriber.open(athletePageUrl.$);
    athletePageSubscriber.open(athletePageUrl.$);
  });

const athletePage = suite
  .html("Load Athlete Page: Not Logged In")
  .next(basicPageChecks)
  .next(isLoggedOut)
  .next(expectToSeePaywall)
  .next(async context => {
    context.comment(context.response.finalUrl.$);
  });

const athletePageNonSubscriber = suite
  .html("Load Athletes Page: Non-Subscriber")
  .before(loginAsNonSubscriber)
  .next(basicPageChecks)
  .next(isLoggedIn)
  .next(expectToSeePaywall)
  .next(async context => {
    context.comment(context.response.finalUrl.$);
  });

const athletePageSubscriber = suite
  .html("Load Events Page: Subscriber")
  .before(loginAsSubscriber)
  .next(basicPageChecks)
  .next(isLoggedIn)
  .next(expectToSeeContent)
  .next(async context => {
    context.comment(context.response.finalUrl.$);
  });

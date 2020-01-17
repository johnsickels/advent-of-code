import { Flagpole } from "flagpole";
import {
  basicPageChecks,
  expectToSeeContent,
  expectTitleToContain,
  expectUrlToContain
} from "./helpers/util";

import * as faker from "faker";
const state = faker.address.state();

const suite = Flagpole.suite("Basic Smoke Test of Teams Page");

suite
  .verifySslCert(false)
  .html("Teams Home Page Loads")
  .open("/teams")
  .next(basicPageChecks)
  .next(expectTitleToContain("Teams Search"))
  .next(expectUrlToContain("/teams"))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Teams");
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).contains("Teams Search");
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
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    context
      .assert("Twitter Widget exists", await side.find(".twitter"))
      .exists();
  });

suite
  .html("Teams Search Loads")
  .open(`/teams?q=${state}`)
  .next(expectTitleToContain("Teams Search"))
  .next(expectUrlToContain(state))
  .next(expectToSeeContent)

  .next("Subheader checks", async context => {
    const header = await context.find("#subheader > header");
    context.assert(await header.getInnerText()).contains("Teams");
    const title = await context.find("#content h1");
    context.assert(await title.getInnerText()).contains("Teams Search");
  })

  .next("Side checks", async context => {
    const side = await context.find("#side");
    const sideSections = await side.findAll("section header");
    context
      .assert("Filter by City exists", sideSections[0])
      .contains("Filter by City");
    context
      .assert("Filter by Category exists", sideSections[1])
      .contains("Filter by Category");
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
    const results = await context.findAll(".search-results li");
    context
      .assert(`Should be search results (${results.length})`, results.length)
      .greaterThan(0);
    const teamLink = await results[
      Math.floor(Math.random() * results.length)
    ].find("a");
    const teamPath = await teamLink.getAttribute("href");
    context.assert(teamPath).includes("/teams/");
    teamLink.click(teamPage);
  });

const teamPage = suite
  .browser("Team Page Loads")
  .next(basicPageChecks)
  .next(expectTitleToContain("Roster"))
  .next(expectUrlToContain("/teams/"))
  .next(expectToSeeContent)

  .next("Content checks", async context => {
    await context.exists("#roster");
    await context.exists("#roster table");
    const athletes = await context.findAll("#roster a");
    context
      .assert(`Should be athletes (${athletes.length})`, athletes.length)
      .greaterThan(0);
  });

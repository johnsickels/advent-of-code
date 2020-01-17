import { Flagpole } from "flagpole";
import { iAssertionContext } from "flagpole/dist/interfaces";

export const headfulBrowserOpts = {
  headless: false,
  width: 1280,
  height: 600
};

export const basicPageChecks = context => {
  context
    .assert("Response body is greater than 0", context.response.body.length)
    .greaterThan(0)
    .assert("HTTP status is 200", context.response.statusCode)
    .equals(200);
};

export const expectTitleToContain = title => {
  return async function(context) {
    const titleTag = await context.exists("head > title");
    context
      .assert(`Page title contains "${title}"`, await titleTag.getInnerText())
      .contains(title);
  };
};

export const expectUrlToContain = path => {
  return async function(context) {
    context.assert(context.response.finalUrl).contains(path);
  };
};

export const expectToSeePaywall = async context => {
  const paywall = await context.find("#proCallToAction");
  await context.assert("Paywall is visible", paywall).exists();
};

export const expectToSeeContent = async (context: iAssertionContext) => {
  const paywall = await context.find("#proCallToAction");
  context
    .assert("Content is visible (no paywall)", paywall)
    .optional.not.exists();
};

export const isLoggedOut = async context => {
  const loginLink = await context.find('a[href^="/login"]');
  context.assert("Login link exists", loginLink).optional.exists();
};

export const isLoggedIn = async context => {
  const logoutLink = await context.find('a[href^="/logout"]');
  context.assert("Logout link exists", logoutLink).optional.exists();
};

export const imagesHaveAltAttributes = async context => {
  const allImages = await context.findAll("img");
  context
    .assert("All images have alt attribute", () => {
      return allImages.every(async image => {
        const altValue = (await image.getAttribute("alt")).$;
        return (
          altValue !== null &&
          altValue.length !== 0 &&
          !/^[0-9]+$/.test(altValue)
        );
      });
    })
    .optional.equals(true);
};

// exports.isLoggedIn = async context => {
//   const logoutLink = await context.find('a[href^="/logout"]');
//   context.assert("Is user logged in", logoutLink.$).type.not.equals("null");
// };

import { Flagpole } from "flagpole";

const suite = Flagpole.suite("Critical Paths of API");

suite
  .verifySslCert(false)
  .json("Meets API Loads List of Meets")
  .open("/api/v1/meets")
  .next(async context => {
    context
      .assert(
        "Should have a respond body",
        context.response.body.toString().length
      )
      .greaterThan(0)
      .assert("HTTP status is 200", context.response.statusCode)
      .equals(200)
      .assert("Should load in under a second", context.response.loadTime)
      .optional.lessThan(100);
    const data = await context.exists("data");
    context
      .assert("Data should be an array", data)
      .type.equals("array")
      .assert("Should be more than one meet in data", data)
      .length.greaterThan(0)
      .comment(`there are ${data.toString().length} meets`);
    const firstMeet = await context.exists("data[0]");
    context
      .assert(`First meet has a name: ${data.$[0].name}`, data.$[0].name)
      .length.greaterThan(0);
  });

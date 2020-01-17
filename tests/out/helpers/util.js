"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headfulBrowserOpts = {
    headless: false,
    width: 1280,
    height: 600
};
exports.basicPageChecks = context => {
    context
        .assert("Response body is greater than 0", context.response.body.length)
        .greaterThan(0)
        .assert("HTTP status is 200", context.response.statusCode)
        .equals(200);
};
exports.expectTitleToContain = title => {
    return function (context) {
        return __awaiter(this, void 0, void 0, function* () {
            const titleTag = yield context.exists("head > title");
            context
                .assert(`Page title contains "${title}"`, yield titleTag.getInnerText())
                .contains(title);
        });
    };
};
exports.expectUrlToContain = path => {
    return function (context) {
        return __awaiter(this, void 0, void 0, function* () {
            context.assert(context.response.finalUrl).contains(path);
        });
    };
};
exports.expectToSeePaywall = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const paywall = yield context.find("#proCallToAction");
    yield context.assert("Paywall is visible", paywall).exists();
});
exports.expectToSeeContent = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const paywall = yield context.find("#proCallToAction");
    context
        .assert("Content is visible (no paywall)", paywall)
        .optional.not.exists();
});
exports.isLoggedOut = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const loginLink = yield context.find('a[href^="/login"]');
    context.assert("Login link exists", loginLink).optional.exists();
});
exports.isLoggedIn = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const logoutLink = yield context.find('a[href^="/logout"]');
    context.assert("Logout link exists", logoutLink).optional.exists();
});
exports.imagesHaveAltAttributes = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const allImages = yield context.findAll("img");
    context
        .assert("All images have alt attribute", () => {
        return allImages.every((image) => __awaiter(void 0, void 0, void 0, function* () {
            const altValue = (yield image.getAttribute("alt")).$;
            return (altValue !== null &&
                altValue.length !== 0 &&
                !/^[0-9]+$/.test(altValue));
        }));
    })
        .optional.equals(true);
});

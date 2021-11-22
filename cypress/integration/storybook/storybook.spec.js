/* eslint-disable no-undef */

describe("Storybook", () => {
    it("visits storybook", () => {
        cy.visit("/");

        cy.title().should("eq", "Storybook");
    });
});

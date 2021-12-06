import { Loader } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("Loader", () => {
    it("should be visible with type circleOnly", () => {
        mount(<Loader type="circleOnly" />);

        cy.get('[data-testid="loader-circle-body"]').should("be.visible");
    });
    it("should be visible with type default", () => {
        mount(<Loader />);

        cy.get('[data-testid="loader-default-body"]').should("be.visible");
    });
});

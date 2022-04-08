import { Pill } from "../../components/atoms";
import { mount } from "@cypress/react";

describe("Pill", () => {
    it("should be visible ", () => {
        mount(<Pill data="Helloworld" />);

        cy.get('[data-testid="pill-body"]').should("exist").should("be.visible");
    });

    it("should display CSS correclty if prop className exist ", () => {
        mount(<Pill data="Helloworld" className="bg-neo-light-grey" />);

        cy.get('[data-testid="pill-body"]').should("have.css", "background-color").and("eq", "rgb(218, 229, 229)");
    });
});

import { InputDateShift } from "../../../components/atoms";
import { mount } from "@cypress/react";

describe("InputDateShift", () => {
    it("should be visible", () => {
        mount(<InputDateShift date={new Date()} label="date" refForm="date" tabProps={[{ id: 1, value: "hello" }]} />);

        cy.get('[data-testid="inputDateShift-body"]').should("be.visible");
    });
});

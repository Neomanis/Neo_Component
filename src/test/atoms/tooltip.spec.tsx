import { Tooltip } from "../../components/atoms";
import { mount } from "@cypress/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconScissors } from "../../img/svg";

describe("Tooltip", () => {
    it("should show data on hover", () => {
        mount(
            <Tooltip position="top" text="El data">
                <p>Hey oh</p>
            </Tooltip>
        );
        cy.get('[data-testid="tooltip-body"]').trigger("mouseover");
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "flex");
    });

    it("should show tooltip bubble at the top", () => {
        mount(<Tooltip text="El data" position="top" />);
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "-translate-y-full top-0");
    });

    it("should show tooltip bubble at the bottom", () => {
        mount(<Tooltip text="El data" position="bottom" />);
        cy.get('[data-testid="tooltip-bubble"]').should("have.class", "flex-col-reverse translate-y-full bottom-0");
    });

    it("should show an icon if fontIcon prop exist", () => {
        mount(<Tooltip position="top" text="El data" fontIcon={faUser} />);
        cy.get("svg").should("exist");
    });

    it("should have a svg if svg prop exist", () => {
        mount(
            <Tooltip position="top" text="El data" svg={IconScissors}>
                <p>With SVG</p>
            </Tooltip>
        );
        cy.get('[data-testid="tooltip-svg-body"]').should("exist");
    });

    it("should have a children component", () => {
        mount(
            <Tooltip position="top" text="El data">
                <p>El componente</p>
            </Tooltip>
        );
        cy.get("p").should("exist");
    });
});

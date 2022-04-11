import { Button } from "../../components/atoms";
import { mount } from "@cypress/react";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { IconInfo } from "../../img/svg";

describe("Button", () => {
    it("should be visible and display correctly", () => {
        mount(<Button testId="button-body" data="Hello world" />);

        cy.get('[data-testid="button-body"]').should("exist");
        cy.get('[data-testid="button-body"]').should("be.visible");
        cy.get('[data-testid="button-body"]').should("have.text", "Hello world");
    });

    it("send correctly the callback function", () => {
        const fCallBack = cy.stub().as("send-information");

        mount(<Button testId="button-body" data="Hello world" fCallback={fCallBack} />);

        cy.get('[data-testid="button-body"]').click();
        cy.get("@send-information").should("have.been.called");
    });

    it("not send correctly the callback function if disable true", () => {
        const fCallBack = cy.stub().as("send-information");

        mount(<Button testId="button-body" data="Hello world" fCallback={fCallBack} disabled={true} />);

        cy.get('[data-testid="button-body"]').should("be.disabled");
    });

    it("should change type of the button if prop exist", () => {
        mount(<Button testId="button-body" data="Hello world" type="submit" />);

        cy.get('[data-testid="button-body"]').should("have.attr", "type").and("eq", "submit");
    });

    it("should display icon or svg with good CSS if props exist", () => {
        mount(
            <Button
                testId="button-body"
                data="Hello world"
                className="bg-neo-light-grey"
                fontIcon={faPaintBrush}
                iconClassName="h-24"
                svg={<IconInfo />}
                svgClassName="h-24"
            />
        );

        cy.get('[data-testid="button-body"]').should("have.css", "background-color").and("eq", "rgb(218, 229, 229)");
        cy.get('[data-testid="button-icon"]').should("exist");
        cy.get('[data-testid="button-icon"]').should("be.visible");
        cy.get('[data-testid="button-icon"]').should("have.css", "height").and("eq", "96px");
        cy.get('[data-testid="button-svg"]').should("exist");
        cy.get('[data-testid="button-svg"]').should("be.visible");
        cy.get('[data-testid="button-svg"]').should("have.css", "height").and("eq", "96px");
    });
});

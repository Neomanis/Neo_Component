import { Icon } from "../../components/atoms";
import { mount } from "@cypress/react";

import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { IconAdd } from "../../img/svg";

describe("Icon", () => {
    it("should be visible and display icon link type", () => {
        mount(<Icon type="iconLink" fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-link-body"]').should("be.visible");
    });
    it("should be visible and display icon placeholder type", () => {
        mount(<Icon type="placeholderInput" fontIcon={faCheckSquare} className="p-4 text-neo-bg-B text-4xl" />);
        cy.get('[data-testid="icon-placeholder-body"]').should("be.visible");
    });
    it("should be visible and display icon red dot type", () => {
        mount(<Icon type="iconWithRedDot" fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-reddot-body"]').should("be.visible");
    });
    it("should be visible and display icon default type", () => {
        mount(<Icon fontIcon={faCheckSquare} />);
        cy.get('[data-testid="icon-default-body "]').should("be.visible");
    });

    it("should display svg if svg prop exist and icon prop not exist ", () => {
        mount(<Icon type="iconLink" svg={<IconAdd />} />);
        cy.get('[data-testid="icon-link-body"]').should("be.visible");
    });
    it("should display svg if svg prop exist and icon prop not exist ", () => {
        mount(<Icon type="placeholderInput" svg={<IconAdd />} />);
        cy.get('[data-testid="icon-placeholder-body"]').should("be.visible");
    });
    it("should display svg if svg prop exist and icon prop not exist ", () => {
        mount(<Icon type="iconWithRedDot" svg={<IconAdd />} />);
        cy.get('[data-testid="icon-reddot-body"]').should("be.visible");
    });
    it("should display svg if svg prop exist and icon prop not exist ", () => {
        mount(<Icon svg={<IconAdd />} />);
        cy.get('[data-testid="icon-default-body "]').should("be.visible");
    });

    it("should display redDot if icon is redDot", () => {
        mount(<Icon type="iconWithRedDot" redDot={true} />);
        cy.get('[data-testid="icon-reddot"]').should("be.visible");
    });

    it("should change style if ClassName prop exist", () => {
        mount(<Icon fontIcon={faCheckSquare} className="text-neo-red" style={{ width: "50px" }} />);
        cy.get('[data-testid="icon-default-body "]').should("have.css", "color").and("eq", "rgb(247, 40, 79)");
        cy.get('[data-testid="icon-default-body "]').should("have.css", "width").and("eq", "50px");
    });
    it("should caa Callback il callback props exist", () => {
        const Callback = cy.stub().as("click-action");

        mount(<Icon fontIcon={faCheckSquare} fCallBack={Callback} />);
        cy.get('[data-testid="icon-default-body "]').click();
        cy.get("@click-action").should("have.been.called");
    });
});

import { ButtonSwitch } from "../../components/atoms";
import { mount } from "@cypress/react";

import { faCheckSquare, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { IconLogin, IconLogout } from "../../img/svg";

describe("ButtonSwitch", () => {
    it("should be visible and display correctly", () => {
        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                activeClassName="group  text-white  hover:text-neo-bg-A"
                inactiveClassName="group hover:text-white"
                inactiveData="Byeworld"
                activeFontIcon={faCheckSquare}
                inactiveFontIcon={faCheckDouble}
                activeIconClassName="text-white group-hover:text-neo-bg-A"
                inactiveIconClassName="text-neo-bg-A group-hover:text-white"
            />
        );
        cy.get('[data-testid="buttonSwitch-body"]').should("be.visible");
    });

    it("should display nothing if nothing exist", () => {
        mount(<ButtonSwitch testId="buttonSwitch-body" />);
        cy.get('[data-testid="buttonSwitch-body"]').should("not.be.visible");
        cy.get('[data-testid="buttonSwitch-body"]').should("not.have.text");
        cy.get('[data-testid="buttonSwitch-svg"]').should("not.exist");
        cy.get('[data-testid="buttonSwitch-icon"]').should("not.exist");
    });

    it("should display existing value", () => {
        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                activeClassName="group  text-white  hover:text-neo-bg-A"
                inactiveClassName="group hover:text-white text-neo-yellow-sand"
                inactiveData="Byeworld"
                activeFontIcon={faCheckSquare}
                inactiveFontIcon={faCheckDouble}
                activeIconClassName="text-white group-hover:text-neo-bg-A"
                inactiveIconClassName="text-neo-bg-A group-hover:text-white"
            />
        );
        cy.get('[data-testid="buttonSwitch-body"]').should("have.text", "Byeworld");
        cy.get('[data-testid="buttonSwitch-body"]').should("have.css", "color").and("eq", "rgb(226, 220, 143)");
        cy.get('[data-testid="buttonSwitch-svg"]').should("not.exist");
        cy.get('[data-testid="buttonSwitch-icon"]').should("be.visible");
        cy.get('[data-testid="buttonSwitch-icon"]').should("have.css", "color").and("eq", "rgb(9, 40, 71)");
        cy.get('[data-testid="buttonSwitch-body"]').click();
        cy.get('[data-testid="buttonSwitch-icon"]').should("have.css", "color").and("eq", "rgb(255, 255, 255)");
    });

    it("should call action on click and display new existing value", () => {
        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                activeClassName="group  text-white  hover:text-neo-bg-A"
                inactiveClassName="group hover:text-white"
                inactiveData="Byeworld"
                activeSvg={<IconLogin />}
                inactiveSvg={<IconLogout />}
                activeSvgClassName="text-white group-hover:text-neo-bg-A"
                inactiveSvgClassName="text-neo-bg-A group-hover:text-white"
            />
        );
        cy.get('[data-testid="buttonSwitch-icon"]').should("not.exist");
        cy.get('[data-testid="buttonSwitch-svg"]').should("be.visible");
        cy.get('[data-testid="buttonSwitch-body"]').click();
        cy.get('[data-testid="buttonSwitch-body"]').should("have.text", "Helloworld");
        cy.get('[data-testid="buttonSwitch-body"]').should("have.css", "color").and("eq", "rgb(255, 255, 255)");
        cy.get('[data-testid="buttonSwitch-svg"]').should("have.css", "color").and("eq", "rgb(255, 255, 255)");
    });

    it("should call callback on click if callback exist", () => {
        const callBack = cy.stub().as("click-action");

        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                inactiveData="Byeworld"
                fCallback={callBack}
            />
        );
        cy.get('[data-testid="buttonSwitch-body"]').click();
        cy.get("@click-action").should("have.been.called");
    });

    it("should set attribute if props exists", () => {
        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                inactiveData="Byeworld"
                disabled={true}
                type="submit"
            />
        );
        cy.get('[data-testid="buttonSwitch-body"]').should("have.attr", "disabled", "disabled");
        cy.get('[data-testid="buttonSwitch-body"]').should("have.attr", "type", "submit");
    });

    it("should be active if active equal true", () => {
        mount(
            <ButtonSwitch testId="buttonSwitch-body" activeData="Helloworld" inactiveData="Byeworld" active={true} />
        );
        cy.get('[data-testid="buttonSwitch-body"]').should("have.text", "Helloworld");
    });
});

import Toaster from "../../components/molecules/toaster";
import { mount } from "@cypress/react";

describe("Toaster", () => {
    it("should render data props properly", () => {
        mount(<Toaster data="Ticket updated !" />);
        cy.get('[data-testid="toastData"]').should("have.text", "Ticket updated !");
    });

    it("should render title props properly", () => {
        mount(<Toaster data="Ticket updated !" title="Title" />);
        cy.get('[data-testid="toastTitle"]').should("have.text", "Title");
    });

    it("should render className props properly", () => {
        mount(<Toaster data="Ticket updated !" className="classTest" />);
        cy.get('[data-testid="toastClassName"]').should("have.class", "classTest");
    });

    it("should show an icon", () => {
        mount(<Toaster data="Ticket updated !" closable={true} />);
        cy.get("svg").should("exist");
    });

    it("should show a sad Neobot with shake animation", () => {
        mount(<Toaster data="Ticket updated !" emotion="sad" />);
        cy.get("svg").should("have.class", "animate-shakeX");
    });

    it("should show a happy Neobot with bounce animation", () => {
        mount(<Toaster data="Ticket updated !" emotion="happy" />);
        cy.get("svg").should("have.class", "animate-bounceSlow");
    });

    it("should call the callback function when clicking the icon", () => {
        const fCallback = cy.stub().as("close-callback");
        mount(<Toaster data="Ticket updated !" closable={true} fCallBackCancel={fCallback} />);
        cy.get('[data-testid="toasterClose"]').click();
        cy.get("@close-callback").should("have.been.called");
    });

    it("should check timeout", () => {
        const fCallback = cy.stub().as("refresh-callback");
        mount(<Toaster data="Ticket updated !" refreshing={true} fCallBackRefresh={fCallback} refreshDuration={1} />);
        cy.get("@refresh-callback").should("have.been.called");
    });
});

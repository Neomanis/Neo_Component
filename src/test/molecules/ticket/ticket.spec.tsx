import { mount } from "@cypress/react";
import Ticket from "../../../components/molecules/ticket/ticket";
import { fakeTicket } from "../../../stories/fakeObject";

describe("ticket", () => {
    it("should render properly", () => {
        mount(<Ticket ticket={fakeTicket} />);
        cy.get('[data-testid="ticket-body"]').should("be.visible");
    });

    it("should render properly", () => {
        mount(<Ticket />);
        cy.get('[data-testid="ticket-empty-body"]').should("be.visible");
    });

    it("should have opacity if ticket and current ticket are not the same and in inbox", () => {
        mount(<Ticket ticket={fakeTicket} currentTicket={{ ...fakeTicket, id: 101 }} />);
        cy.get('[data-testid="ticket-opacity"]').should("have.class", "opacity-30");
        cy.get('[data-testid="ticket-fill-svg"]').should("exist");
    });

    it("should render correct icon", () => {
        mount(<Ticket ticket={{ ...fakeTicket, status: 5 }} />);
        cy.get('[data-testid="ticket-icon-solved"]').should("exist");
        cy.get('[data-testid="ticket-fill-svg"]').should("not.exist");
    });

    it("should render correct icon", () => {
        mount(<Ticket ticket={{ ...fakeTicket, status: 6 }} />);
        cy.get('[data-testid="ticket-icon-closed"]').should("exist");
        cy.get('[data-testid="ticket-fill-svg"]').should("not.exist");
    });

    it("should have opacity if ticket and current ticket are not the same and in inventory", () => {
        mount(<Ticket ticket={{ ...fakeTicket, status: 3 }} currentTicket={{ ...fakeTicket, id: 101, status: 3 }} />);
        cy.get('[data-testid="ticket-opacity"]').should("have.class", "opacity-30");
    });

    it("should not have opacity if ticket and current ticket are not in the same place", () => {
        mount(<Ticket ticket={{ ...fakeTicket, status: 1 }} currentTicket={{ ...fakeTicket, id: 101, status: 2 }} />);
        cy.get('[data-testid="ticket-opacity"]').should("not.have.class", "opacity-30");
    });

    it("should not have opacity if ticket and current ticket are the same", () => {
        mount(
            <Ticket
                ticket={{ ...fakeTicket, id: 101 }}
                currentTicket={{ ...fakeTicket, id: 101 }}
                languageUser="fr_FR"
            />
        );
        cy.get('[data-testid="ticket-opacity"]').should("not.have.class", "opacity-30");
    });

    it("should display stale tto", () => {
        const creationDate = new Date();
        creationDate.setHours(creationDate.getHours() - 2);
        const ttoDate = new Date();
        ttoDate.setHours(ttoDate.getHours() - 1);

        mount(
            <Ticket
                ticket={{
                    ...fakeTicket,
                    id: 101,
                    date_creation: creationDate.toISOString(),
                    time_to_own: ttoDate.toISOString(),
                }}
                currentTicket={{ ...fakeTicket, id: 101 }}
                languageUser="fr_FR"
            />
        );
        cy.get('[data-testid="ticket-tto-ttr-warning"]').should("exist").should("have.class", "text-neo-urgency-major");
    });

    it("should display stale ttr", () => {
        const creationDate = new Date();
        creationDate.setHours(creationDate.getHours() - 5);
        const ttrDate = new Date();
        ttrDate.setHours(ttrDate.getHours() + 1);

        mount(
            <Ticket
                ticket={{
                    ...fakeTicket,
                    id: 101,
                    date_creation: creationDate.toISOString(),
                    time_to_resolve: ttrDate.toISOString(),
                    status: 2,
                }}
                languageUser="fr_FR"
            />
        );
        cy.get('[data-testid="ticket-tto-ttr-warning"]').should("exist").should("have.class", "text-neo-urgency");
    });

    it("should trigger callback function on hover and on click", () => {
        const fCallBackClick = cy.stub().as("click-callback");
        const fCallBackHover = cy.stub().as("hover-callback");

        mount(
            <Ticket
                ticket={{ ...fakeTicket, id: 101 }}
                fCallBackClick={fCallBackClick}
                fCallBackHover={fCallBackHover}
            />
        );
        cy.get('[data-testid="ticket-body"]').trigger("mouseover");
        cy.get("@hover-callback").should("have.been.called");
        cy.get('[data-testid="ticket-body"]').trigger("mouseout");
        cy.get("@hover-callback").should("have.been.called");
        cy.get('[data-testid="ticket-body"]').click();
        cy.get("@click-callback").should("have.been.called");
    });
});

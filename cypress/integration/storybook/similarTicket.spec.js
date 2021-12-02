/* eslint-disable no-undef */

describe("SimilarTicket", () => {
    it("should render props properly", () => {
        cy.visit(
            "/iframe.html?id=molecules-ticket-similarticket--similar-ticket-default&args=&globals=locale:en_GB&viewMode=story"
        );

        cy.get('[data-testid="ticketId"]').should("have.text", "Ticket 1");
        cy.get('[data-testid="ticketName"]').should("have.text", "Test JM");
    });
});

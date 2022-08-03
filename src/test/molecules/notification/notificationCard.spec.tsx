import NotificationCard from "../../../components/molecules/notification/notificationCard";
import { mount } from "@cypress/react";

describe("NotificationCard", () => {
    it("should be visible and display title props value", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content=""
                date=""
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="notifCard-title"]').should("have.text", "Notif title");
    });

    it("should be visible and display content props value", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                date=""
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="notifCard-content"]').should("have.text", "Notif content");
    });

    it("should be visible and display date props value", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="notifCard-date"]').should("have.text", "2 days ago");
    });

    it("should display color text props class", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                color="text-neo-light-grey"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="notifCard-color-text"]').should("have.class", "text-neo-light-grey");
    });

    it("should call the callback function when clicking the card and have className props", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                className="bg-neo-bg-A"
                color="text-neo-light-grey"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="notifCard-read"]').should("have.class", "bg-neo-bg-A");
        cy.get('[data-testid="notifCard-read"]').click();
        cy.get("@read-callback").should("have.been.called");
    });

    it("should call the callback function when clicking the close button", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                color="text-neo-light-grey"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="icon-default-body notifCard-close"]').click();
        cy.get("@delete-callback").should("have.been.called");
    });

    it("should display color svg props class", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                color="text-neo-light-grey"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="icon-default-body notifCard-dot"]').should("have.class", "text-neo-red");
    });

    it("should display svg", () => {
        const fDeleteNotification = cy.stub().as("delete-callback");
        const fReadNotification = cy.stub().as("read-callback");
        mount(
            <NotificationCard
                title="Notif title"
                content="Notif content"
                color="text-neo-light-grey"
                date="2 days ago"
                notificationId={0}
                read={false}
                neoId={1}
                fDeleteNotification={fDeleteNotification}
                fReadNotification={fReadNotification}
            />
        );
        cy.get('[data-testid="icon-default-body notifCard-svg"]').should("exist");
    });
});

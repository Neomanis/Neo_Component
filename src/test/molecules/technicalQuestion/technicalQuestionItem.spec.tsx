import { TechnicalQuestionItem } from "../../../components/molecules";
import { mount } from "@cypress/react";

describe("TechnicalQuestionItem", () => {
    it("should call open callback properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-body"]').click();
        cy.get("@open-callback").should("have.been.called");
    });
    it("should call follow callback and display properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-middle-top"]').find(">div").click();
        cy.get("@follow-callback").should("have.been.called");
        cy.get('[data-testid="tq-middle-top"]').find(">div>div").should("have.text", "Unfollow");
        cy.get('[data-testid="tq-middle-top"]').find(">div>div>div>svg").should("have.attr", "data-icon", "eye-slash");
    });
    it("should call unfollow callback and display properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={true}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-middle-top"]').find(">div").click();
        cy.get("@follow-callback").should("have.been.called");
        cy.get('[data-testid="tq-middle-top"]').find(">div>div").should("have.text", "Follow");
        cy.get('[data-testid="tq-middle-top"]').find(">div>div>div>svg").should("have.attr", "data-icon", "eye");
    });
    it("should render unselected props colors properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-head"]').should("have.class", "bg-neo-link");
        cy.get('[data-testid="tq-middle"]').should("have.class", "bg-neo-bg-B");
        cy.get('[data-testid="tq-middle-bottom"]').should("have.class", "text-neo-blue-secondary");
    });
    it("should render selected props colors properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={true}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-head"]').should("have.class", "bg-neo-blue");
        cy.get('[data-testid="tq-middle"]').should("have.class", "bg-neo-blue");
        cy.get('[data-testid="tq-middle-top"]').find(">div>div>div").should("have.class", "text-white");
        cy.get('[data-testid="tq-middle-bottom"]').should("have.class", "text-white");
    });
    it("should render unsolved props colors properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={false}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-pill"]').should("have.class", "bg-neo-red");
    });
    it("should render solved props colors properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-pill"]').should("have.class", "bg-neo-green");
    });
    it("should render title, createDate, createUser and createLevel props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-middle-top"]').find(">h2").should("have.text", "Title");
        cy.get('[data-testid="tq-date"]').should("have.text", "15/11/2021 14:34");
        cy.get('[data-testid="tq-user"]').should("have.text", "John Doe");
        cy.get('[data-testid="tq-level"]').should("have.text", "Tech");
    });
    it("should render ticketUid props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-ticket-infos"]').find(">div").should("exist");
        cy.get('[data-testid="tq-ticketId"]').should("have.text", "[1GL] INC 666");
    });
    it("should render ticketPriority props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 6,
                    status: 1,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-end"]').should("have.class", "bg-neo-ticketUrgency-major");
        cy.get('[data-testid="tq-ticket-related"]').should("have.class", "text-white");
        cy.get('[data-testid="tq-ticketId"]').should("have.class", "text-white");
    });
    it("should render ticketPriority props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 1,
                    status: 1,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="tq-end"]').should("have.class", "bg-neo-ticketUrgency-very-low");
        cy.get('[data-testid="tq-ticket-related"]').should("have.class", "text-neo-blue-secondary");
        cy.get('[data-testid="tq-ticketId"]').should("have.class", "text-neo-blue-extraDark");
    });
    it("should render ticketStatus props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 1,
                    status: 5,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="ico-ticket-solved"]').should("exist");
        cy.get('[data-testid="tq-end"]').should("have.class", "bg-neo-green");
    });
    it("should render ticketStatus props properly", () => {
        const followTechnicalQuestionCallback = cy.stub().as("follow-callback");
        const openTechnicalQuestionCallback = cy.stub().as("open-callback");
        mount(
            <TechnicalQuestionItem
                createDate={"2021-11-15T13:34:48.551Z"}
                createLevel={"Tech"}
                createUser={"John Doe"}
                followed={false}
                followTechnicalQuestion={followTechnicalQuestionCallback}
                id={2}
                isSelected={false}
                openTechnicalQuestion={openTechnicalQuestionCallback}
                solved={true}
                ticket={{
                    id: 0,
                    uid: "1gl-666-INC",
                    priority: 0,
                    status: 6,
                }}
                title={"Title"}
            />
        );
        cy.get('[data-testid="ico-ticket-closed"]').should("exist");
    });
});

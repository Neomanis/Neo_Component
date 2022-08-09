import { mount } from "@cypress/react";
import { AnswerItem } from "../../../components/molecules";
import { fakeAnswer } from "../../../stories/fakeObject";

describe("AnswerItem", () => {
    it("should allow connected user to upvote and accept current answer", () => {
        const acceptAnswerCallback = cy.stub().as("acceptAnswer-callback");
        const updateAnswerCallback = cy.stub().as("updateAnswer-callback");
        const upvoteAnswerCallback = cy.stub().as("upvoteAnswer-callback");
        mount(
            <AnswerItem
                key={fakeAnswer.id}
                acceptAnswer={acceptAnswerCallback}
                isAccepted={fakeAnswer.isAccepted}
                creationDate={fakeAnswer.creationDate}
                authorLevel={fakeAnswer.authorLevel}
                author={fakeAnswer.author}
                questionAuthorNeoId={1}
                id={fakeAnswer.id}
                text={fakeAnswer.text}
                updateAnswer={updateAnswerCallback}
                upvote={upvoteAnswerCallback}
                upvoters={fakeAnswer.upvoters}
                connectedUserNeoId={1}
            />
        );
        cy.get('[data-testid="tq-answer-upvote"]').click();
        cy.get("@upvoteAnswer-callback").should("have.been.called");
        cy.get('[data-testid="tq-answer-accept"]').click();
        cy.get("@acceptAnswer-callback").should("have.been.called");
    });
    it("should allow connected user to update answer if he is the author of the answer", () => {
        const acceptAnswerCallback = cy.stub().as("acceptAnswer-callback");
        const updateAnswerCallback = cy.stub().as("updateAnswer-callback");
        const upvoteAnswerCallback = cy.stub().as("upvoteAnswer-callback");
        mount(
            <AnswerItem
                key={fakeAnswer.id}
                acceptAnswer={acceptAnswerCallback}
                isAccepted={fakeAnswer.isAccepted}
                creationDate={fakeAnswer.creationDate}
                authorLevel={fakeAnswer.authorLevel}
                author={fakeAnswer.author}
                questionAuthorNeoId={1}
                id={fakeAnswer.id}
                text={fakeAnswer.text}
                updateAnswer={updateAnswerCallback}
                upvote={upvoteAnswerCallback}
                upvoters={fakeAnswer.upvoters}
                connectedUserNeoId={1}
            />
        );
        cy.get('[data-testid="tq-answer-update"]').click();
        cy.get('[data-testid="tq-answer-form-body"]').should("exist");
        // TODO: Find a way to trigger onBlur event of textEditor with cypress,
        // cy.get("textEditor").focus().blur() doesn't work
    });
});

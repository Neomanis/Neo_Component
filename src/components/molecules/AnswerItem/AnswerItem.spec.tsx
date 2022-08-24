import React from "react";
import { test, expect } from "@/utils/test/playwrightSetup";
import AnswerItem from "./AnswerItem";

test.describe("AnswerItem", () => {
    test.use({ viewport: { width: 500, height: 500 } });

    test("should allow connected user to upvote, accept and update answer if he is the creator of the question and answer", async ({
        mount,
        answer,
        itsmUsers,
    }) => {
        let accepted = false;
        let upvoted = false;
        const component = await mount(
            <AnswerItem
                key={answer.id}
                acceptAnswer={() => (accepted = true)}
                isAccepted={answer.accepted}
                creationDate={answer.createDate}
                authorLevel={answer.createLevel}
                author={itsmUsers.find((user) => user.neoId === answer.createUser)}
                questionAuthorNeoId={1}
                id={answer.id}
                text={answer.text}
                updateAnswer={() => {}}
                upvote={() => (upvoted = true)}
                upvoters={answer.upvoters}
                connectedUserNeoId={1}
            />
        );
        await component.locator('[data-testid="tq-answer-upvote"]').click();
        expect(upvoted).toBe(true);
        await component.locator('[data-testid="tq-answer-accept"]').click();
        expect(accepted).toBe(true);
        await component.locator('[data-testid="tq-answer-update"]').click();
        await component.locator('[data-testid="textEditor-body"]').click();
        await component.locator('[data-testid="textEditor-body"]').type("This is a test !");
        await expect(component.locator('[data-testid="textEditor-body"]')).toContainText("This is a test !");
        await component.locator("text=uRotarez").click();
        await expect(component.locator('[data-testid="dotUpdating"]')).toBeVisible();
        // TODO: Take to much time in test, find a way to reduce update time in test
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        // expect(updated).toBe(true);
    });
});

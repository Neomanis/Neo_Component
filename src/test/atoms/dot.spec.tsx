/* eslint-disable no-undef */

import React from "react";
import { Dot } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Dot", () => {
    it("should be visible and display correctly", () => {
        mount(
            <Dot
                isCooldown={false}
                isSuccess={false}
                isUpdateField={false}
                onClickCallback={() => {
                    // eslint-disable-next-line no-console
                    console.log("empty");
                }}
            />
        );
        cy.get('[data-testid="dot-body"]').should("be.visible");
    });
});

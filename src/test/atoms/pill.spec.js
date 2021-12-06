/* eslint-disable no-undef */

import React from "react";
import { Pill } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("Pill", () => {
    it("should be visible ", () => {
        mount(<Pill data="Helloworld" />);

        cy.get('[data-testid="pill-body"]').should("be.visible");
    });
});

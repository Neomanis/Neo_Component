/* eslint-disable no-undef */

import React from "react";
import { SwitchToggle } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";

describe("SwitchToggle", () => {
    it("should be visible ", () => {
        mount(<SwitchToggle value="Helloworld" />);

        cy.get('[data-testid="switchToggle-body"]').should("be.visible");
    });
});

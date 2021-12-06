/* eslint-disable no-undef */

import React from "react";
import { InputFile } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("InputFile", () => {
    it("should be visible", () => {
        mount(<InputFile name="input-file" />);

        cy.get('[data-testid="inputFile-body"]').should("be.visible");
    });
});

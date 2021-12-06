/* eslint-disable no-undef */

import React from "react";
import { EditableTextarea } from "../../../components/atoms";
import { mount } from "@cypress/react";
import "../../../styles/tailwind.css";

describe("EditableTextarea", () => {
    it("should be visible", () => {
        mount(<EditableTextarea />);

        cy.get('[data-testid="editableTextArea-body"]').should("be.visible");
    });
});

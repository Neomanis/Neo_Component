/* eslint-disable no-undef */

import React from "react";
import { ButtonSwitch } from "../../components/atoms";
import { mount } from "@cypress/react";
import "../../styles/tailwind.css";
import { faCheckSquare, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

describe("ButtonSwitch", () => {
    it("should be visible and display correctly", () => {
        mount(
            <ButtonSwitch
                testId="buttonSwitch-body"
                activeData="Helloworld"
                activeClassName="group  text-white  hover:text-neo-bg-A"
                inactiveClassName="group hover:text-white"
                inactiveData="Byeworld"
                activeFontIcon={faCheckSquare}
                inactiveFontIcon={faCheckDouble}
                activeIconClassName="text-white group-hover:text-neo-bg-A"
                inactiveIconClassName="text-neo-bg-A group-hover:text-white"
            />
        );
        cy.get('[data-testid="buttonSwitch-body"]').should("be.visible");
    });
});

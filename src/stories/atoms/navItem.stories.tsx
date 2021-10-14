import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { NavItem } from "../..";

export default {
    title: "Atoms/NavItem",
    component: NavItem,
} as Meta;

const Template: ComponentStory<typeof NavItem> = (args) => {
    return (
        <Router>
            <Route>
                <div className="bg-neo_blue h-20 pb-2">
                    <NavItem {...args} />
                </div>
            </Route>
        </Router>
    );
};

export const navItemDefault = Template.bind({});
navItemDefault.args = {
    path: "/",
    icon: faGhost,
};

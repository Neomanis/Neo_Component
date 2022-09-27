/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import IconTicketCategory from "./IconTicketCategory";

export default {
    component: IconTicketCategory,
    title: "Atoms/IconTicketCategory",
} as Meta;

const Template: ComponentStory<typeof IconTicketCategory> = (args) => {
    return <IconTicketCategory {...args} />;
};

export const Default: ComponentStory<typeof IconTicketCategory> = Template.bind({});

export const UtilisateurRéseau: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurRéseau.args = {
    name: "Computer",
};
export const UtilisateurSystème: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurSystème.args = {
    name: "Monitor",
};
export const UtilisateurTéléphonie: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurTéléphonie.args = {
    name: "Software",
};
export const Utilisateur: ComponentStory<typeof IconTicketCategory> = Template.bind({});
Utilisateur.args = {
    name: "Peripheral",
};
export const Serveur: ComponentStory<typeof IconTicketCategory> = Template.bind({});
Serveur.args = {
    name: "Networkequipment",
};
export const UtilisateurImpression: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurImpression.args = {
    name: "Printer",
};
export const ServeurRéseau: ComponentStory<typeof IconTicketCategory> = Template.bind({});
ServeurRéseau.args = {
    name: "Phone",
};
export const Software: ComponentStory<typeof IconTicketCategory> = Template.bind({});
ServeurRéseau.args = {
    name: "Software",
};

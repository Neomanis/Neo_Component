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
    id: 1,
};
export const UtilisateurSystème: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurSystème.args = {
    id: 2,
};
export const UtilisateurTéléphonie: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurTéléphonie.args = {
    id: 3,
};
export const Utilisateur: ComponentStory<typeof IconTicketCategory> = Template.bind({});
Utilisateur.args = {
    id: 4,
};
export const Serveur: ComponentStory<typeof IconTicketCategory> = Template.bind({});
Serveur.args = {
    id: 5,
};
export const UtilisateurImpression: ComponentStory<typeof IconTicketCategory> = Template.bind({});
UtilisateurImpression.args = {
    id: 6,
};
export const ServeurRéseau: ComponentStory<typeof IconTicketCategory> = Template.bind({});
ServeurRéseau.args = {
    id: 7,
};

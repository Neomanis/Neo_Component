import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import IconTicketCategorie from "../../../components/atoms/ticket/iconTicketCategorie";

export default {
    title: "Atoms/Ticket/IconTicketCategorie",
    component: IconTicketCategorie,
} as Meta;

const Template: ComponentStory<typeof IconTicketCategorie> = (args) => <IconTicketCategorie {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const UtilisateurRéseau = Template.bind({});
UtilisateurRéseau.args = {
    id: 1,
};
export const UtilisateurSystème = Template.bind({});
UtilisateurSystème.args = {
    id: 2,
};
export const UtilisateurTéléphonie = Template.bind({});
UtilisateurTéléphonie.args = {
    id: 3,
};
export const Utilisateur = Template.bind({});
Utilisateur.args = {
    id: 4,
};
export const Serveur = Template.bind({});
Serveur.args = {
    id: 5,
};
export const UtilisateurImpression = Template.bind({});
UtilisateurImpression.args = {
    id: 6,
};
export const ServeurRéseau = Template.bind({});
ServeurRéseau.args = {
    id: 7,
};

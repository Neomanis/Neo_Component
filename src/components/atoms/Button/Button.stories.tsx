/* eslint-disable no-console */
import React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { ButtonV2Props } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconRemoteControl, IconRemoteShell, IconTechnicalQuestions } from "@/img/svg";

export default {
    component: Button,
    title: "Atoms/Button",
} as Meta;

export const Default: Story<ButtonV2Props> = () => {
    return <Button>Default</Button>;
};

export const Secondary: Story<ButtonV2Props> = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Button
                size="md"
                variant="secondary"
                rounded="md"
                startIcon={<IconRemoteShell className="w-5 fill-neo-link" />}
            >
                Terminal distant
            </Button>
            <Button
                size="md"
                variant="secondary"
                rounded="md"
                startIcon={<IconRemoteControl className="w-5 fill-neo-link" />}
            >
                Controle distant
            </Button>
            <Button
                size="md"
                variant="secondary"
                rounded="md"
                startIcon={<IconTechnicalQuestions className="w-5 fill-neo-link" />}
            >
                Poser une question
            </Button>
        </div>
    );
};

export const Tertiary: Story<ButtonV2Props> = () => {
    return (
        <Button variant="tertiary" size="md" startIcon={<FontAwesomeIcon icon={faTrash} />}>
            Tertiary with icon
        </Button>
    );
};

export const DefaultIcon: Story<ButtonV2Props> = () => {
    return (
        <Button size="md" startIcon={<FontAwesomeIcon icon={faTrash} />}>
            Primary with icon
        </Button>
    );
};

export const WithLoader: Story<ButtonV2Props> = () => {
    return (
        <Button size="md" isLoading>
            Zzzzzzz
        </Button>
    );
};

export const OnlyIcon: Story<ButtonV2Props> = () => {
    return <Button startIcon={<IconTechnicalQuestions className="w-5 fill-neo-link" />} variant="none" />;
};

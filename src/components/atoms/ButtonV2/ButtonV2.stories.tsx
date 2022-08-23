/* eslint-disable no-console */
import React from "react";
import { Meta, Story } from "@storybook/react";

import ButtonV2, { ButtonV2Props } from "./ButtonV2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default {
    component: ButtonV2,
    title: "Atoms/ButtonV2",
} as Meta;

export const Default: Story<ButtonV2Props> = () => {
    return <ButtonV2>Default</ButtonV2>;
};

export const Secondary: Story<ButtonV2Props> = () => {
    return (
        <ButtonV2 size="md" variant="secondary" rounded="md">
            Secondary
        </ButtonV2>
    );
};
export const DefaultIcon: Story<ButtonV2Props> = () => {
    return (
        <ButtonV2 size="md" startIcon={<FontAwesomeIcon icon={faTrash} />}>
            Primary with icon
        </ButtonV2>
    );
};

export const WithLoader: Story<ButtonV2Props> = () => {
    return (
        <ButtonV2 size="md" isLoading>
            Zzzzzzz
        </ButtonV2>
    );
};

/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ButtonSelect from "./ButtonSelect";
import { fakeUser } from "@/utils/storiesData/fakeObject";
import { TicketNew } from "@/img/svg";
import { MembershipInfo } from "@neomanis/neo-types";

export default {
    component: ButtonSelect,
    title: "Atoms/ButtonSelect",
} as Meta;

export const Default: ComponentStory<typeof ButtonSelect> = () => {
    const [entitySelect, setEntitySlecet] = useState("");
    return (
        <div className="flex items-center">
            <ButtonSelect<MembershipInfo>
                array={fakeUser.membership.entities.map((item) => {
                    return {
                        label: `[${item.itsmCode}] ${item.name}`,
                        value: item,
                    };
                })}
                selectedItem={fakeUser.membership.entities[0]}
                button={{ children: "ButtonTest", startIcon: <TicketNew className="w-9 fill-white" /> }}
                onClick={(data: MembershipInfo) => setEntitySlecet(`[${data.itsmCode}] ${data.name}`)}
            />
            <p className="ml-4 text-white font-bold">{entitySelect}</p>
        </div>
    );
};
export const DefaultSelect: ComponentStory<typeof ButtonSelect> = () => {
    const [entitySelect, setEntitySlecet] = useState("");
    return (
        <div className="flex items-center">
            <ButtonSelect<MembershipInfo>
                array={fakeUser.membership.entities.map((item) => {
                    return {
                        label: `[${item.itsmCode}] ${item.name}`,
                        value: item,
                    };
                })}
                button={{ children: "ButtonTest", startIcon: <TicketNew className="w-9 fill-white" /> }}
                onClick={(data: MembershipInfo) => setEntitySlecet(`[${data.itsmCode}] ${data.name}`)}
                aligneSelect="right"
            />
            <p className="ml-4 text-white font-bold">{entitySelect}</p>
        </div>
    );
};

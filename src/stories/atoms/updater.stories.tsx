/* eslint-disable no-console */
import React from "react";
import Updater from "../../components/atoms/updater";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Atoms/Updater",
    component: Updater,
} as Meta;

const Template: ComponentStory<typeof Updater> = (args) => {
    return (
        <div className="bg-neo-bg-A p-3 flex items-center" style={{ width: "300px" }}>
            <div className="relative">
                <Updater {...args} />
                <p className="text-white pt-5">This is a random information</p>
            </div>
        </div>
    );
};

export const UpdaterDefault = Template.bind({});
UpdaterDefault.args = {
    className: "absolute top-0 right-0",
    isCancelable: true,
    fCallBackCancel: () => console.log("CANCELED!"),
    isSuccess: true,
    isUpdate: true,
    isError: true,
    updateCooldown: 2000,
    trigger: false,
};

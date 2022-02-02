import React from "react";
import InfoDot from "../../components/atoms/infoDot";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Atoms/InfoDot",
    component: InfoDot,
} as Meta;

const Template: ComponentStory<typeof InfoDot> = (args) => {
    return (
        <div className="bg-neo-bg-A p-3 flex items-center" style={{ width: "300px" }}>
            <div className="relative">
                <InfoDot {...args} />
                <p className="text-white pt-5">This is a random information</p>
            </div>
        </div>
    );
};

export const InfoDotDefault = Template.bind({});
InfoDotDefault.args = {
    className: "absolute top-0 right-0",
    closable: true,
    fCallBackCancel: () => console.log("CANCELED!"),
    isSuccess: true,
    startCooldown: false,
    updateCooldown: 2,
};

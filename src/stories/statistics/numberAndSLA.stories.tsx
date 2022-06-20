/* eslint-disable no-console */
import React from "react";
import NumberAndSLA from "../../components/molecules/statistics/numberAndSLA";
import { ComponentStory, Meta } from "@storybook/react";
import { IconBook, TicketLogo } from "../../img/svg";

export default {
    title: "Molecules/Statistics/NumberAndSLA",
    component: NumberAndSLA,
} as Meta;

const Template: ComponentStory<typeof NumberAndSLA> = (args) => {
    return (
        <div className="p-10 flex items-center w-1/4 h-72">
            <NumberAndSLA {...args} />
        </div>
    );
};

export const NumberAndSLATTOTTR = Template.bind({});
NumberAndSLATTOTTR.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    TTO: 10,
    TTR: 1,
};

export const NumberAndSLATTOTTRZero = Template.bind({});
NumberAndSLATTOTTRZero.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    TTO: 0,
    TTR: 0,
};

export const NumberAndSLATicket = Template.bind({});
NumberAndSLATicket.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    ticketNumber: 4,
    svg: <TicketLogo fill={"#FFF"} width={37} />,
};

export const NumberAndSLATicketZero = Template.bind({});
NumberAndSLATicketZero.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    ticketNumber: 0,
    svg: <TicketLogo fill={"#FFF"} width={37} />,
};

export const NumberAndSLADiagnostic = Template.bind({});
NumberAndSLADiagnostic.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    diagnosticNumber: 10,
    svg: <IconBook fill={"#FFF"} width={37} />,
};

export const NumberAndSLADiagnosticZero = Template.bind({});
NumberAndSLADiagnosticZero.args = {
    title: "Tickets Outside SLA",
    subtitle: "service level agreement",
    className: "bg-neo-stats-black",
    diagnosticNumber: 0,
    svg: <IconBook fill={"#FFF"} width={37} />,
};

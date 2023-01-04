/* eslint-disable no-console */
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import TimeSpentInput from "./TimeSpentInput";

const TimeSpentInputTestWrapper = (): ReactElement => {
    const formMethods = useForm();
    return (
        <TimeSpentInput
            formMethods={formMethods}
            defaultValue={0}
            refForm="inputSelect"
            updateFunction={() => console.log("updated")}
            ticketUid="1gl-1234-REQ"
        />
    );
};

export default TimeSpentInputTestWrapper;

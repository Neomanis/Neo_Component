import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import TipTap from "./TipTap";

interface TipTapTestWrapperProps {
    isUpdateField?: boolean;
}

const TipTapTestWrapper = ({ isUpdateField }: TipTapTestWrapperProps): ReactElement => {
    const formMethods = useForm();
    return (
        <TipTap
            formMethods={formMethods}
            defaultValue="<p>Default value</p>"
            refForm="tiptap"
            isUpdateField={isUpdateField}
        />
    );
};

export default TipTapTestWrapper;

import React, { ReactElement } from "react";

export interface TemplateNameProps {
    title: string;
}

const TemplateName = ({ title }: TemplateNameProps): ReactElement => {
    return <div>{title}</div>;
};

export default TemplateName;

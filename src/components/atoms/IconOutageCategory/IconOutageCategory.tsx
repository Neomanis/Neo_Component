import React, { ReactElement } from "react";
import { IconInfo, CautionLogo } from "@/img/svg";

export interface IconOutageCategoryProps {
    className?: string;
    id: number;
    svgFill?: string;
}

const IconOutageCategory = ({ className, id, svgFill }: IconOutageCategoryProps): ReactElement => {
    switch (id) {
        case 1: //Intervention
            return (
                <div className={className} data-testid="iconOutageCategorie-id-1">
                    <IconInfo fill={svgFill} />
                </div>
            );
        case 2: //Outage
            return (
                <div className={className} data-testid="iconOutageCategorie-id-2">
                    <CautionLogo fill={svgFill} />
                </div>
            );
        default:
            //default
            return (
                <div className={className} data-testid="iconOutageCategorie-default">
                    <IconInfo fill={svgFill} />
                </div>
            );
    }
};

export default IconOutageCategory;

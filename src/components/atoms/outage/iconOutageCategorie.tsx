import React, { ReactElement } from "react";
import { CautionLogo, IconInfo } from "../../..";

interface Props {
    className?: string;
    id: number;
    svgFill?: string;
}

const IconOutageCategorie = ({ className, id, svgFill }: Props): ReactElement => {
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

export default IconOutageCategorie;

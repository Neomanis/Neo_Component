import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCog,
    faDesktop,
    faPhoneSlash,
    faUser,
    faServer,
    faPrint,
    faBrain,
    faNetworkWired,
    faTools,
} from "@fortawesome/free-solid-svg-icons";
import { ResourceCategories } from "@neomanis/neo-types";

export interface IconTicketCategoryProps {
    className?: string;
    name?: string;
}

const IconTicketCategory = ({ className, name }: IconTicketCategoryProps): ReactElement => {
    switch (name) {
        case ResourceCategories.RACK:
            return <FontAwesomeIcon icon={faUserCog} className={className} data-testid="iconTicketCategorie-1-body" />;
        case ResourceCategories.COMPUTER:
            return <FontAwesomeIcon icon={faDesktop} className={className} data-testid="iconTicketCategorie-2-body" />;
        case ResourceCategories.PHONE:
            return (
                <FontAwesomeIcon icon={faPhoneSlash} className={className} data-testid="iconTicketCategorie-3-body" />
            );
        case ResourceCategories.MONITOR:
            return <FontAwesomeIcon icon={faUser} className={className} data-testid="iconTicketCategorie-4-body" />;
        case ResourceCategories.NETWORKEQUIPMENT:
            return <FontAwesomeIcon icon={faServer} className={className} data-testid="iconTicketCategorie-5-body" />;
        case ResourceCategories.PRINTER:
            return <FontAwesomeIcon icon={faPrint} className={className} data-testid="iconTicketCategorie-6-body" />;
        case ResourceCategories.SOFTWARE:
            return <FontAwesomeIcon icon={faBrain} className={className} data-testid="iconTicketCategorie-6-body" />;
        case ResourceCategories.PERIPHERAL:
            return (
                <FontAwesomeIcon icon={faNetworkWired} className={className} data-testid="iconTicketCategorie-7-body" />
            );
        default:
            //default
            return (
                <FontAwesomeIcon icon={faTools} className={className} data-testid="iconTicketCategorie-default-body" />
            );
    }
};

export default IconTicketCategory;

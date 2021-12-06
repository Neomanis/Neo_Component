import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faDesktop,
    faUser,
    faNetworkWired,
    faServer,
    faPrint,
    faPhoneSlash,
    faTools,
    faUserCog,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    id?: number;
}

const IconTicketCategorie = ({ className, id }: Props): ReactElement => {
    switch (id) {
        case 1: //Utilisateur > Réseau
            return <FontAwesomeIcon icon={faUserCog} className={className} data-testid="iconTicketCategorie-1-body" />;
        case 2: //Utilisateur > Système
            return <FontAwesomeIcon icon={faDesktop} className={className} data-testid="iconTicketCategorie-2-body" />;
        case 3: //Utilisateur > Téléphonie
            return (
                <FontAwesomeIcon icon={faPhoneSlash} className={className} data-testid="iconTicketCategorie-3-body" />
            );
        case 4: //Utilisateur
            return <FontAwesomeIcon icon={faUser} className={className} data-testid="iconTicketCategorie-4-body" />;
        case 5: //Serveur
            return <FontAwesomeIcon icon={faServer} className={className} data-testid="iconTicketCategorie-5-body" />;
        case 6: //Utilisateur > Impression
            return <FontAwesomeIcon icon={faPrint} className={className} data-testid="iconTicketCategorie-6-body" />;
        case 7: //Serveur > Réseau
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

export default IconTicketCategorie;

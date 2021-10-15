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
            return <FontAwesomeIcon icon={faUserCog} className={className} />;
        case 2: //Utilisateur > Système
            return <FontAwesomeIcon icon={faDesktop} className={className} />;
        case 3: //Utilisateur > Téléphonie
            return <FontAwesomeIcon icon={faPhoneSlash} className={className} />;
        case 4: //Utilisateur
            return <FontAwesomeIcon icon={faUser} className={className} />;
        case 5: //Serveur
            return <FontAwesomeIcon icon={faServer} className={className} />;
        case 6: //Utilisateur > Impression
            return <FontAwesomeIcon icon={faPrint} className={className} />;
        case 7: //Serveur > Réseau
            return <FontAwesomeIcon icon={faNetworkWired} className={className} />;
        default:
            //default
            return <FontAwesomeIcon icon={faTools} className={className} />;
    }
};

export default IconTicketCategorie;

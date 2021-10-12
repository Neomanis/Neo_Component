import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Icon categories
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

interface Props {
    id?: number;
    className?: string;
}

const IconTicketCategorie = ({ id, className }: Props): ReactElement => {
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

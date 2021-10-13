import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Icon categories
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons";

interface Props {
    id: number;
    className?: string;
}

const IconOutageCategorie = ({ id, className }: Props): ReactElement => {
    switch (id) {
        case 1: //Intervention
            return <FontAwesomeIcon icon={faInfoCircle} className={className} />;
        case 2: //Outage
            return <FontAwesomeIcon icon={faExclamationTriangle} className={className} />;
        default:
            //default
            return <FontAwesomeIcon icon={faTools} className={className} />;
    }
};

export default IconOutageCategorie;

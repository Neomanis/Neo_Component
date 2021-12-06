import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTools, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    id: number;
}

const IconOutageCategorie = ({ className, id }: Props): ReactElement => {
    switch (id) {
        case 1: //Intervention
            return <FontAwesomeIcon icon={faInfoCircle} className={className} data-testid="iconOutageCategorie-id-1" />;
        case 2: //Outage
            return (
                <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={className}
                    data-testid="iconOutageCategorie-id-2"
                />
            );
        default:
            //default
            return <FontAwesomeIcon icon={faTools} className={className} data-testid="iconOutageCategorie-default" />;
    }
};

export default IconOutageCategorie;

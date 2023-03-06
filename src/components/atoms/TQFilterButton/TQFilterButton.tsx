import { classNames, Icon } from "@/index";
import React, { ReactElement } from "react";

export interface TqFilterButtonProps {
    name: string;
    svgIcon: ReactElement;
    isSelected: boolean;
    onClick: () => void;
}

const TqFilterButton = ({ name, svgIcon, onClick, isSelected }: TqFilterButtonProps): ReactElement => {
    return (
        <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={() => onClick()}>
            <Icon
                data-testid="tq-filter-icon"
                svg={svgIcon}
                className={classNames(isSelected ? "fill-neo-blue" : "fill-neo-link")}
            />
            <div
                data-testid="tq-filter-name"
                className={classNames(isSelected ? "text-neo-blue" : "text-neo-link", "font-bold")}
            >
                {name}
            </div>
        </div>
    );
};

export default TqFilterButton;

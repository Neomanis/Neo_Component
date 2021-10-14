import React, { ReactElement } from "react";
import Icon from "./icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "./link";

interface Props {
    path: string;
    icon?: IconProp;
    svg?: ReactElement;
    linkClassName?: string;
    activeLinkClassName?: string;
    iconClassName?: string;
}

const NavItem = ({
    path,
    icon,
    svg,
    linkClassName = "",
    iconClassName = "",
    activeLinkClassName = "",
}: Props): ReactElement => {
    return (
        <Link
            href={path}
            type="nav"
            activeClassName={`${activeLinkClassName} bg-neo_blue-blue_sky rounded-b-md h-full border-neo_blue`}
            className={`${linkClassName} flex justify-center items-center h-full ml-8 w-16`}
        >
            {icon && <Icon fontIcon={icon} className={`${iconClassName} text-neo_lite hover:text-6xl text-5xl`} />}
            {svg && svg}
        </Link>
    );
};

export default NavItem;

import React, { ReactElement } from "react";
import Icon from "./icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "./link";

interface Props {
    activeLinkClassName?: string;
    icon?: IconProp;
    iconClassName?: string;
    linkClassName?: string;
    path: string;
    svg?: ReactElement;
}

const NavItem = ({
    activeLinkClassName = "",
    icon,
    iconClassName = "",
    linkClassName = "",
    path,
    svg,
}: Props): ReactElement => {
    return (
        <Link
            activeClassName={`${activeLinkClassName} bg-neo_blue-blue_sky rounded-b-md h-full border-neo_blue`}
            className={`${linkClassName} flex justify-center items-center h-full ml-8 w-16`}
            href={path}
            type="nav"
        >
            {icon && <Icon fontIcon={icon} className={`${iconClassName} text-neo_lite hover:text-6xl text-5xl`} />}
            {svg && svg}
        </Link>
    );
};

export default NavItem;

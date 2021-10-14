import React, { ReactElement, ReactNode } from "react";

//IMPORT REACT ROUTER
import { Link, NavLink } from "react-router-dom";

interface Props {
    children: ReactNode | string;
    href: string;
    className?: string;
    activeClassName?: string;
    type: "router" | "nav" | string;
    fCallBack?: () => void;
}

const LinkComp = ({ type, className, href, children, activeClassName }: Props): ReactElement => {
    switch (type) {
        case "router":
            return (
                <Link className={className} to={href}>
                    {children}
                </Link>
            );
        case "nav":
            return (
                <NavLink activeClassName={activeClassName} className={className} to={href}>
                    {children}
                </NavLink>
            );
        default:
            return <a href={href}>{children}</a>;
    }
};

export default LinkComp;

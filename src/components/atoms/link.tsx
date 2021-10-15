import React, { ReactElement, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

interface Props {
    activeClassName?: string;
    children: ReactNode | string;
    className?: string;
    fCallBack?: () => void;
    href: string;
    type: "router" | "nav" | string;
}

const LinkComp = ({ activeClassName, children, className, href, type }: Props): ReactElement => {
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

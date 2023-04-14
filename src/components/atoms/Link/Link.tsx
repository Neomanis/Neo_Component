import React, { ReactElement, AnchorHTMLAttributes } from "react";

export interface LinkProps {
    href: string;
    content: string;
}

const Link = ({ href, content, ...props }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement => {
    return (
        <a href={href} target="_blank" className="text-neo-blue hover:underline" {...props}>
            {content}
        </a>
    );
};

export default Link;

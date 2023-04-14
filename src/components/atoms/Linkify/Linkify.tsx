import React, { ReactNode } from "react";
import LinkifyJs from "linkify-react";
import Link from "../Link";

export interface LinkifyProps {
    children: ReactNode;
}

const Linkify = ({ children }: LinkifyProps) => {
    return (
        <LinkifyJs
            options={{
                render: (renderProps) => <Link href={renderProps.attributes.href} content={renderProps.content} />,
            }}
        >
            {children}
        </LinkifyJs>
    );
};

export default Linkify;

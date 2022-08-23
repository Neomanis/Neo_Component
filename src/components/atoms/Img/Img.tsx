import { DefaultUserPicture } from "@/img/png";
import React, { ReactElement } from "react";

export interface ImgProps {
    className?: string;
    data?: {
        alt?: string;
        height?: number;
        src?: string;
    };
    type: string;
}

const Img = ({ className, data, type }: ImgProps): ReactElement => {
    switch (type) {
        case "logoImg":
            return <img className={className} src={data?.src} alt={data?.alt} data-testid="logoImg-body" />;

        case "logoSvg":
            return (
                <img
                    className={className}
                    src={data?.src}
                    alt={data?.alt}
                    height={data?.height}
                    data-testid="logoSvg-body"
                />
            );

        case "imgProfile":
            return data ? (
                <img src={data.src} alt={data.alt} className={className} data-testid="profileImg-with-data-body" />
            ) : (
                <img
                    src={DefaultUserPicture}
                    data-testid="profileImg-without-data-body"
                    className={className}
                    alt={"default img"}
                />
            );

        case "img-background":
            return <img className={className} src={data?.src} alt={data?.alt} data-testid="backgroundImg-body" />;
        default:
            return <img className={className} src={data?.src} alt={data?.alt} data-testid="default-body" />;
    }
};

export default Img;

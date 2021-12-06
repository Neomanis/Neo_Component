import React, { ReactElement } from "react";

//IMPORT IMG BY DEFAULT FOR PROFILE PICTURE
import ImgUserdefault from "../../img/defaultUserPicture.jpg";

interface Props {
    className?: string;
    data?: {
        alt?: string;
        height?: number;
        src?: string;
    };
    type: string;
}

const Img = ({ className, data, type }: Props): ReactElement => {
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
                    src={ImgUserdefault}
                    className={className}
                    alt={"default img"}
                    data-testid="profileImg-without-data-body"
                />
            );

        case "img-background":
            return <img className={className} src={data?.src} alt={data?.alt} data-testid="backgroundImg-body" />;
        default:
            return <img className={className} src={data?.src} alt={data?.alt} data-testid="default-body" />;
    }
};

export default Img;

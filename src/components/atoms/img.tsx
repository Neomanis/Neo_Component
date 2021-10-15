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
            return <img className={className} src={data?.src} alt={data?.alt} />;

        case "logoSvg":
            return <img className={className} src={data?.src} alt={data?.alt} height={data?.height} />;

        case "imgProfile":
            return data ? (
                <img src={data.src} alt={data.alt} className={className} />
            ) : (
                <img src={ImgUserdefault} className={className} alt={"default img"} />
            );

        case "img-background":
            return <img className={className} src={data?.src} alt={data?.alt} />;
        default:
            return <img className={className} src={data?.src} alt={data?.alt} />;
    }
};

export default Img;

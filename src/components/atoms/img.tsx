import React, { ReactElement } from "react";

//IMPORT IMG BY DEFAULT FOR PROFILE PICTURE
import ImgUserdefault from "../../img/defaultUserPicture.jpg";

interface Props {
    data?: {
        src?: string;
        alt?: string;
        height?: number;
    };
    type: string;
    className?: string;
}

const Img = ({ data, type, className }: Props): ReactElement => {
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

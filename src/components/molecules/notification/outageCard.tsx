import React from "react";
import { IOutage } from "../../../interface";
import { Title, IconOutageCategorie } from "../../atoms";
import { getFormatedTimeToNowExtended } from "../../utils/getFormatedTimeToNow";

interface Props {
    data: IOutage;
    languageUser: string;
}

const OutageTab = ({ data, languageUser }: Props): React.ReactElement => {
    const [isFolded, setIsFolded] = React.useState<boolean>(true);
    let colorOutage = data.severity === "major" ? "neo_urgency-major" : "neo_urgency";
    if (
        new Date(data.startAt) > new Date() ||
        (data.endAt && data.hideAt && new Date(data.endAt) < new Date() && new Date() < new Date(data.hideAt))
    ) {
        colorOutage = "neo_black-black_05";
    }

    return (
        <div
            onClick={() => {
                setIsFolded(!isFolded);
            }}
            className={`cursor-pointer w-full min-h-24 mb-7 bg-${colorOutage} flex items-center justify-between py-3 pl-3 rounded-md z-10`}
        >
            <div className="text-4xl flex items-center">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} />
            </div>
            <div className="text-left px-4 w-full">
                <Title
                    data={data.title}
                    type={"h4"}
                    className="font-bold leading-tight uppercase text-sm truncate w-full"
                />
                <p className={`${isFolded ? "line-clamp-2" : ""} text-xs pb-2`}>{data.content}</p>
                <p className="text-xs pb-2 ">{getFormatedTimeToNowExtended(data.startAt, languageUser)}</p>
            </div>
        </div>
    );
};

export default OutageTab;

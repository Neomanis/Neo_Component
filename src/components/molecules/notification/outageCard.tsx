import React from "react";
import { IOutage } from "../../../interface";
import { Title, IconOutageCategorie } from "../../atoms";
import { formatDate } from "../../utils/getFormatedTimeToNow";

interface Props {
    data: IOutage;
    svgFill?: string;
}

const OutageTab = ({ data, svgFill }: Props): React.ReactElement => {
    const [isFolded, setIsFolded] = React.useState<boolean>(true);
    let colorOutage = data.severity === "major" ? "neo-urgency-major" : "neo-urgency";
    if (
        new Date(data.startAt) > new Date() ||
        (data.endAt && data.hideAt && new Date(data.endAt) < new Date() && new Date() < new Date(data.hideAt))
    ) {
        colorOutage = "bg-neo-light-grey";
    }

    return (
        <div
            onClick={() => {
                setIsFolded(!isFolded);
            }}
            className={`cursor-pointer w-full bg-${colorOutage} flex items-center justify-between rounded-md px-2`}
        >
            <div className=" flex justify-center items-center sm:w-2/12 w-3/12">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} svgFill={svgFill} className="max-w-md" />
            </div>
            <div className="pl-2 py-2 sm:w-10/12 w-9/12">
                <Title data={data.title} type={"h4"} className="font-bold leading-tight uppercase text-sm truncate " />
                <p className={`${isFolded && "line-clamp-2"} text-xxs mb-2`}>{data.content}</p>
                <p className="text-xxs">{`${formatDate(data.startAt)} - ${formatDate(data.endAt)}`}</p>
            </div>
        </div>
    );
};

export default OutageTab;

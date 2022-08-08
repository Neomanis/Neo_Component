import React, { useRef } from "react";
import { Title, IconOutageCategorie } from "../../atoms";
import { Outage } from "@neomanis/neo-types";
import { getOutageDateInformation } from "../../utils/dateTools";
import { useTranslation } from "@neomanis/neo-translation";

interface Props {
    data: Outage;
    isNotSelected?: boolean;
    hoverInCallBack?: (outage: Outage, postion: DOMRect) => void;
    hoverOutCallBack?: (outage: Outage, postion: DOMRect) => void;
}

const OutageItem = ({ data, isNotSelected, hoverInCallBack, hoverOutCallBack }: Props): React.ReactElement => {
    const { i18n } = useTranslation();
    let colorOutage = data.severity === "major" ? "neo-urgency-major" : "neo-urgency";
    let colorSVGOutage = data.severity === "major" ? "#F42A3E" : "#ED943B";
    const ref = useRef<HTMLHeadingElement>(null);
    if (
        new Date(data.startAt) > new Date() ||
        (data.endAt && data.hideAt && new Date(data.endAt) < new Date() && new Date() < new Date(data.hideAt))
    ) {
        colorOutage = "neo-light-grey";
        colorSVGOutage = "#DAE5E5";
    }

    return (
        <div
            ref={ref}
            onMouseEnter={() => hoverInCallBack(data, ref?.current && ref?.current.getBoundingClientRect())}
            onMouseLeave={() => hoverOutCallBack(data, ref?.current && ref?.current.getBoundingClientRect())}
            className={`cursor-pointer w-full text-${colorOutage} grid grid-cols-12 ${isNotSelected && "opacity-50"}`}
        >
            <div className="col-span-2 pt-1">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} svgFill={colorSVGOutage} className="w-10" />
            </div>
            <div className={`divide-y-2 divide-${colorOutage} col-span-10`}>
                <div className="h-8 flex items-center">
                    <Title
                        data={data.title}
                        type={"h2"}
                        className="font-extrabold uppercase text-lg line-clamp-2"
                        style={{ lineHeight: "110%" }}
                    />
                </div>
                <p className="text-xxs font-bold mt-1 py-2">
                    {getOutageDateInformation({ startAt: data.startAt, endAt: data.endAt }, i18n.language)}
                </p>
            </div>
        </div>
    );
};

export default OutageItem;

import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState } from "react";
import { Outage, Role } from "@neomanis/neo-types";
import { Title, IconOutageCategorie, Button } from "../../atoms";
import { formatDate } from "../../utils/dateTools";
import ValidationCard from "../validationCard";
import { useTranslation } from "@neomanis/neo-translation";
import { lowerCaseFirstLetter, stripHtml } from "../../utils";

interface Props {
    data: Outage;
    hoverInCallBack: () => void;
    hoverOutCallBack: () => void;
    modifCallBack: (data: Outage) => void;
    deleteCallBack: (id: number) => void;
    role: Role | undefined;
}

const OutageCard = ({
    data,
    hoverInCallBack,
    hoverOutCallBack,
    modifCallBack,
    deleteCallBack,
    role,
}: Props): React.ReactElement => {
    const { t } = useTranslation();
    let colorOutage = data.severity === "major" ? "neo-urgency-major" : "neo-urgency";
    let colorSVGOutage = data.severity === "major" ? "#F42A3E" : "#ED943B";
    const [openValidationCard, setOpenValidationCard] = useState(false);

    if (
        new Date(data.startAt) > new Date() ||
        (data.endAt && data.hideAt && new Date(data.endAt) < new Date() && new Date() < new Date(data.hideAt))
    ) {
        colorOutage = "neo-light-grey";
        colorSVGOutage = "#DAE5E5";
    }

    const dateInformation = useMemo(() => {
        const startAt = formatDate(data.startAt, "EEEE d");
        if (!data.endAt) {
            return `${t("date.since")} ${startAt}`;
        } else {
            const endAt = formatDate(data.endAt, "EEEE d");
            return `${t("date.from")} ${startAt} ${lowerCaseFirstLetter(t("date.to"))} ${endAt}`;
        }
    }, [data.startAt, data.endAt]);

    return (
        <div
            onMouseEnter={() => hoverInCallBack()}
            onMouseLeave={() => hoverOutCallBack()}
            className={`w-full h-full text-${colorOutage} bg-neo-blue-extraDark p-5 grid grid-cols-10 rounded-xl`}
        >
            <div className="col-span-2 flex flex-col justify-between ">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} svgFill={colorSVGOutage} className="w-10" />
                {role && (role === Role.SUPERVISOR || role === Role.ADMINISTRATOR) && (
                    <>
                        {!openValidationCard ? (
                            <div className="flex justify-around mr-2">
                                <Button
                                    fontIcon={faPen}
                                    className={"text-neo-link hover:text-neo-blue hover:scale-110"}
                                    fCallback={(): void => modifCallBack(data)}
                                />

                                <Button
                                    fontIcon={faTrashAlt}
                                    className={"text-neo-link hover:text-neo-red hover:scale-110"}
                                    fCallback={(): void => setOpenValidationCard(true)}
                                />
                            </div>
                        ) : (
                            <ValidationCard
                                classNames={{
                                    container: "",
                                    buttonContainer: "flex justify-around mr-2",
                                    text: "text-xxs text-white",
                                }}
                                fCallBackCancel={(): void => setOpenValidationCard(false)}
                                fCallBackValidate={(): void => {
                                    setOpenValidationCard(false);
                                    deleteCallBack(data.id);
                                }}
                                text={t("global.deleteThis") + " " + data.type + " ?"}
                            />
                        )}
                    </>
                )}
            </div>
            <div className="col-span-8 flex flex-col justify-around">
                <Title
                    data={data.title}
                    type={"h2"}
                    className={`font-extrabold uppercase text-lg line-clamp-2 border-b-2 border-${colorOutage}`}
                    style={{ lineHeight: "110%" }}
                />
                <p className="text-xxs font-bold mt-1 text-neo-blue-secondary">{dateInformation}</p>
                <p className="text-xxs text-white line-clamp-3" style={{ lineHeight: "115%" }}>
                    {stripHtml(data.content)}
                </p>
            </div>
        </div>
    );
};

export default OutageCard;

import React, { ReactElement, useState } from "react";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { Outage, Role } from "@neomanis/neo-types";
import { getOutageDateInformation } from "@/utils/dateTools";
import { Button, IconOutageCategory, Title } from "@/components/atoms";
import ValidationCard from "../ValidationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface OutageCardProps {
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
}: OutageCardProps): ReactElement => {
    const { t, i18n } = useTranslation();
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

    return (
        <div
            onMouseEnter={() => hoverInCallBack()}
            onMouseLeave={() => hoverOutCallBack()}
            className={`w-full h-full text-${colorOutage} bg-neo-blue-extraDark p-5 grid grid-cols-10 rounded-xl`}
            data-outage-card={data.title}
        >
            <div className="col-span-2 flex flex-col justify-between ">
                <IconOutageCategory id={data.type === "event" ? 1 : 2} svgFill={colorSVGOutage} className="w-10" />
                {role && (role === Role.SUPERVISOR || role === Role.ADMINISTRATOR) && (
                    <>
                        {!openValidationCard ? (
                            <div className="flex justify-around mr-2">
                                <Button
                                    startIcon={<FontAwesomeIcon icon={faPen} />}
                                    className={"text-neo-link hover:text-neo-blue hover:scale-110"}
                                    onClick={(): void => modifCallBack(data)}
                                    variant="none"
                                    size="none"
                                    id="edit-button"
                                />

                                <Button
                                    startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                                    className={"text-neo-link hover:text-neo-red hover:scale-110"}
                                    onClick={(): void => setOpenValidationCard(true)}
                                    variant="none"
                                    size="none"
                                    id="delete-button"
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
                                text={`${t("global.confirm")} ?`}
                                id="delete-button"
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
                <p className="text-xxs font-bold mt-1 text-neo-blue-secondary">
                    {getOutageDateInformation({ startAt: data.startAt, endAt: data.endAt }, i18n.language)}
                </p>
                <p
                    className="text-xxs text-white line-clamp-3"
                    style={{ lineHeight: "115%" }}
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></p>
            </div>
        </div>
    );
};

export default OutageCard;

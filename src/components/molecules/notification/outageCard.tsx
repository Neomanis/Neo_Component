import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IOutage } from "../../../interface";
import { Title, IconOutageCategorie, Button } from "../../atoms";
import { formatDate } from "../../utils/dateTools";
import ValidationCard from "../validationCard";

interface Props {
    data: IOutage;
    hoverInCallBack: () => void;
    hoverOutCallBack: () => void;
    modifCallBack: (data: IOutage) => void;
    deleteCallBack: (id: number) => void;
}

const OutageCard = ({
    data,
    hoverInCallBack,
    hoverOutCallBack,
    modifCallBack,
    deleteCallBack,
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

    return (
        <div
            onMouseEnter={() => hoverInCallBack()}
            onMouseLeave={() => hoverOutCallBack()}
            className={`w-full h-full text-${colorOutage} bg-neo-blue-extraDark p-5 grid grid-cols-10 rounded-xl`}
        >
            <div className="col-span-2 flex flex-col justify-between ">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} svgFill={colorSVGOutage} className="w-10" />
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
            </div>
            <div className="col-span-8 flex flex-col justify-around">
                <Title
                    data={data.title}
                    type={"h2"}
                    className={`font-extrabold uppercase text-lg line-clamp-2 border-b-2 border-${colorOutage}`}
                    style={{ lineHeight: "110%" }}
                />
                <p className="text-xxs font-bold mt-1 text-neo-blue-secondary">
                    {`${formatDate(data.startAt)} - ${formatDate(data.endAt)}`}
                </p>
                <p className="text-xxs text-white line-clamp-3" style={{ lineHeight: "115%" }}>
                    {data.content}
                </p>
            </div>
        </div>
    );
};

export default OutageCard;

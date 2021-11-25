import { ReactElement } from "react";
import Img from "../img";
//translations
import i18next from "i18next";

interface Props {
    isGroup: boolean;
    requesterName: string;
    languageUser: string;
}

const RequesterInfo = ({ isGroup, requesterName, languageUser }: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);
    return (
        <div className="flex justify-items-stretch">
            <div className="self-center py-4 w-1/6 border-r-2 border-neo_black-black_05 text-white opacity-50 text-xs">
                {isGroup ? myLanguage("ticketScreen.assignedToGroup") : myLanguage("ticketScreen.assignedToUser")}
            </div>
            <div className="text-xs text-white pl-4 flex ">
                <div>
                    <p className="font-bold">{requesterName}</p>
                    <p>Platypus Department</p>
                </div>
            </div>
            <div className="ml-auto rounded-full w-12 overflow-hidden">
                <Img type="imgProfil" />
            </div>
        </div>
    );
};

export default RequesterInfo;

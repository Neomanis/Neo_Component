import React, { ReactElement } from "react";

import Img from "../img";

interface Props {
    isGroup: boolean;
    requesterName: string;
}

const RequesterInfo = ({ isGroup, requesterName }: Props): ReactElement => {
    return (
        <div className="flex justify-items-stretch">
            <div className="self-center py-4 w-1/6 border-r-2 border-neo_black-black_05 text-neo_blue-light opacity-50 text-xs">
                {isGroup ? "GROUP " : "USER"}
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

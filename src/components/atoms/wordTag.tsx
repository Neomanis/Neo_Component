import React from "react";

interface Props {
    keyword: string;
    dependenciesNumber?: number;
}

const WordTag = ({ keyword, dependenciesNumber }: Props): React.ReactElement => {
    return (
        <div
            className={`pl-2 bg-neo_bg_B  shadow-md text-neo_light_grey  rounded-full flex justify-between align-baseline items-center `}
            style={{ marginLeft: 2, marginRight: 2, marginTop: 1, marginBottom: 1 }}
        >
            <p className="mr-2 font-bold h-full">{keyword}</p>
            {dependenciesNumber && (
                <div className="flex ml-auto bg-neo_pink rounded-r-full w-8 h-6">
                    <p className=" text-center text-xs m-auto object-fill self-center justify-self-center">
                        {dependenciesNumber}
                    </p>
                </div>
            )}
        </div>
    );
};

export default WordTag;

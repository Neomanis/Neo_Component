import React, { ReactElement } from "react";
import InputChoice from "../../atoms/input/inputChoice";
import InputSimpleSelect from "../../atoms/input/inputSimpleSelect";

import Title from "../../atoms/title";

interface Props {
    fCallBack: (data: { text: string; value: string }) => void;
    datas: { label: string; value: string }[];
    placeholder: string;
    message: string;
    type: string;
}

const ChatCard = ({ fCallBack, datas, placeholder, message, type }: Props): ReactElement => {
    let option;
    switch (type) {
        case "dropdown":
            option = (
                <>
                    <Title className={"text-white"} type="h3" data={message} />
                    <InputSimpleSelect
                        data={datas}
                        optionClassName={""}
                        className={"mt-2"}
                        selectClassName={"text-white border-2"}
                        placeholder={placeholder}
                        onChangeCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((option) => option.value === data)?.label,
                            })
                        }
                    />
                </>
            );
            break;
        case "single-choice":
            option = (
                <>
                    <Title className={"text-white"} type="h3" data={message} />
                    <InputChoice
                        data={datas}
                        fCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((choice) => choice.value === data)?.label,
                            })
                        }
                        className={"my-1"}
                    />
                </>
            );
            break;

        default:
            option = null;
            break;
    }

    return (
        <div className={`h-32 rounded bg-neo_blue p-2 border-b-2 border-neo_blue-modal overflow-hidden`}>
            <div>{option}</div>
        </div>
    );
};
export default ChatCard;

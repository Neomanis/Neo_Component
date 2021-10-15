import React, { ReactElement } from "react";
import { Title, InputSimpleSelect, InputChoice } from "../../atoms";

interface Props {
    datas: { label: string; value: string }[];
    fCallBack: (data: { text: string; value: string }) => void;
    message: string;
    placeholder: string;
    type: string;
}

const ChatCard = ({ datas, fCallBack, message, placeholder, type }: Props): ReactElement => {
    let option;
    switch (type) {
        case "dropdown":
            option = (
                <>
                    <Title className={"text-white"} type="h3" data={message} />
                    <InputSimpleSelect
                        className={"mt-2"}
                        data={datas}
                        onChangeCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((option) => option.value === data)?.label,
                            })
                        }
                        optionClassName={""}
                        placeholder={placeholder}
                        selectClassName={"text-white border-2"}
                    />
                </>
            );
            break;
        case "single-choice":
            option = (
                <>
                    <Title className={"text-white"} type="h3" data={message} />
                    <InputChoice
                        className={"my-1"}
                        data={datas}
                        fCallBack={(data) =>
                            fCallBack({
                                value: data,
                                text: datas.find((choice) => choice.value === data)?.label,
                            })
                        }
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

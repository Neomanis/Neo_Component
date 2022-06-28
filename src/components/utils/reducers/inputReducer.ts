import { MultiValue } from "react-select";

type State = {
    stateFormated?: { value: number; label: string } | null | MultiValue<{ value: number; label: string }>;
    isCancelable: boolean;
    isCooldown: boolean;
    isSuccess: boolean;
    previous: string | number | number[] | Date | [Date, Date | null] | undefined;
    timeoutId: NodeJS.Timeout | undefined;
    trigger: boolean;
    updated: string | number | number[] | Date | [Date, Date | null] | undefined;
};

type Action =
    | {
          type: "TRACK_STATE";
          payload: { value: number; label: string } | MultiValue<{ value: number; label: string }> | null;
      }
    | { type: "CANCEL_UPDATE" }
    | { type: "CLEAR_SUCCESS" }
    | { type: "DEBUG"; payload: number | number[] | string | Date | [Date, Date] }
    | { type: "HANDLE_DUPLICATE"; payload: { value: number; isUpdateField: boolean } }
    | { type: "REMOVE_ITEM"; payload: { value: number[]; isUpdateField: boolean } }
    | { type: "RESET"; payload: number | number[] | string | Date | [Date, Date] }
    | { type: "SET_TIMEOUT"; payload: NodeJS.Timeout }
    | { type: "SHOW_DOT" }
    | { type: "UPDATE_SUCCESS" }
    | { type: "ON_CHANGE"; payload: string }
    | { type: "UPDATING"; payload: string | number | Date | [Date, Date] | number[] };

export default function inputReducer(state: State, action: Action): State {
    switch (action.type) {
        case "TRACK_STATE":
            return { ...state, stateFormated: action.payload };
        case "CANCEL_UPDATE":
            return { ...state, isCooldown: false, isSuccess: false, isCancelable: false, updated: state.previous };
        case "CLEAR_SUCCESS":
            return { ...state, isSuccess: false };
        case "DEBUG":
            // eslint-disable-next-line no-console
            console.log(action.payload);
            return { ...state };
        case "HANDLE_DUPLICATE":
            return {
                ...state,
                isCancelable: action.payload.isUpdateField,
                isCooldown: action.payload.isUpdateField,
                isSuccess: false,
                trigger: !state.trigger,
                updated: [...(state.updated as number[]), action.payload.value],
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                isCancelable: action.payload.isUpdateField,
                isCooldown: action.payload.isUpdateField,
                trigger: !state.trigger,
                updated: action.payload.value,
            };
        case "RESET":
            return {
                ...state,
                isCancelable: false,
                isCooldown: false,
                isSuccess: false,
                previous: action.payload,
                timeoutId: undefined,
                trigger: false,
                updated: action.payload,
            };
        case "SET_TIMEOUT":
            return { ...state, timeoutId: action.payload };
        case "SHOW_DOT":
            return { ...state, isCancelable: true, isCooldown: false, isSuccess: false };
        case "UPDATE_SUCCESS":
            return { ...state, isCancelable: false, isCooldown: false, isSuccess: true, previous: state.updated };
        case "UPDATING":
            return {
                ...state,
                isCancelable: true,
                isCooldown: true,
                isSuccess: false,
                trigger: !state.trigger,
                updated: action.payload,
            };
        case "ON_CHANGE":
            return {
                ...state,
                updated: action.payload,
            };
        default:
            return state;
    }
}

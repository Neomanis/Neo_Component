export type State<T> = {
    stateFormated?: T;
    isCancelable: boolean;
    isCooldown: boolean;
    isSuccess: boolean;
    previous: T;
    timeoutId: NodeJS.Timeout | undefined;
    trigger: boolean;
    updated: T;
};

export type Action<T> =
    | {
          type: "TRACK_STATE";
          payload: T;
      }
    | { type: "CANCEL_UPDATE" }
    | { type: "CLEAR_SUCCESS" }
    | { type: "DEBUG"; payload: T }
    | { type: "RESET"; payload: T }
    | { type: "SET_TIMEOUT"; payload: NodeJS.Timeout }
    | { type: "SHOW_DOT" }
    | { type: "UPDATE_SUCCESS" }
    | { type: "UPDATING"; payload: T };

export default function inputReducer<T>(state: State<T>, action: Action<T>): State<T> {
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
        default:
            return state;
    }
}

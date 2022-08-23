import { Reducer, useReducer } from "react";
import inputReducer, { Action, State } from "../reducers/inputReducer";

export function useInputs<T>(defaultValue: T) {
    return useReducer<Reducer<State<T>, Action<T>>>(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultValue,
        timeoutId: undefined,
        trigger: false,
        updated: defaultValue,
    });
}

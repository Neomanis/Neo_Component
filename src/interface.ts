import { GroupBase, StylesConfig } from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";
export { components } from "react-select";

export type TInputSelectSearchableCss = StylesConfig<
    { label: string; value: number },
    boolean,
    GroupBase<{ label: string; value: number }>
>;

export type TInputSelectSearchableCustomComponent = Partial<
    SelectComponents<
        {
            label: string;
            value: number;
        },
        boolean,
        GroupBase<{
            label: string;
            value: number;
        }>
    >
>;

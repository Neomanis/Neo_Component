import { GroupBase, StylesConfig } from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";

export { components, StylesConfig } from "react-select";

export type TInputSelectCss = StylesConfig<
    { label: string; value: number },
    boolean,
    GroupBase<{ label: string; value: number }>
>;

export type TInputSelectCustomComponent<IsMulti extends boolean> = Partial<
    SelectComponents<unknown, IsMulti, GroupBase<unknown>>
>;

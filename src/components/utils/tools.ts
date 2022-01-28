import { TFunction } from "i18next";
import { IInputSelectSearchableData } from "../../interface";

type EnumType = {
    [key: number]: string;
};

export function mapEnumToInputSelectSearchableData(
    enumarable: EnumType,
    tFunction?: TFunction,
    traductionKey?: string
): IInputSelectSearchableData[] {
    const enumarableValues = Object.keys(enumarable).filter((key) => isNaN(Number(key)));
    const enumarableKeys = Object.keys(enumarable).filter((key) => !isNaN(Number(key)));
    return enumarableValues.map((key, index) => ({
        label: tFunction && traductionKey ? tFunction(`${traductionKey}.${lowerCaseFirstLetter(key)}`) : key,
        value: parseInt(enumarableKeys[index]),
    }));
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowerCaseFirstLetter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

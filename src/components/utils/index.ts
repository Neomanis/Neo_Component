import { displayRequesterName, getUserName, getRequesterUid } from "./displayRequesterName";
import { formatMessage, getRecipientsNameByIds, stripHtml } from "./chatFunction";
import {
    formatDate,
    formatDateToNow,
    getDateCompletionPercentage,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    getTimeToNowWithTranslation,
} from "./dateTools";
import { getPriorityValue, getPriorityColor } from "./priorityTools";
import { getServiceStatusColor } from "./serviceStatusColorSelector";
import { getStatusColor, getStatusText } from "./statusTools";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import useLocalStorage from "./hooks/useLocalStorage";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";
import {
    capitalizeFirstLetter,
    getContrastBasedOnHexColor,
    getHexColorFromTailwindColor,
    getStatusOrPriorityColor,
    lowerCaseFirstLetter,
    mapEnumToInputSelectSearchableData,
    sleep,
} from "./tools";
import { frontEncrypt } from "./crypto/frontUtils";

export {
    capitalizeFirstLetter,
    displayRequesterName,
    formatDate,
    formatDateToNow,
    formatMessage,
    frontEncrypt,
    getContrastBasedOnHexColor,
    getDateCompletionPercentage,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    getHexColorFromTailwindColor,
    getOutageBorderColor,
    getOutageDivideColor,
    getOutageSVGColor,
    getOutageTextColor,
    getPriorityColor,
    getPriorityValue,
    getRecipientsNameByIds,
    getRequesterUid,
    getServiceStatusColor,
    getStatusColor,
    getStatusOrPriorityColor,
    getStatusText,
    getTimeToNowWithTranslation,
    getUserName,
    inputReducer,
    lowerCaseFirstLetter,
    mapEnumToInputSelectSearchableData,
    sleep,
    stripHtml,
    useIsFirstRender,
    useLocalStorage,
};

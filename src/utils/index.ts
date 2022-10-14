import { getActorName, getRequesterUid, getUserName } from "./userTools";
import { formatMessage, stripHtml } from "./chatFunction";
import {
    formatDate,
    formatDateToNow,
    getDateCompletionPercentage,
    getDateFnsLocaleFromUserLang,
    getFormatedTimeToNowExtended,
    getTimeToNowWithTranslation,
} from "./dateTools";
import { getServiceStatusColor } from "./serviceStatusColorSelector";
import { getStatusColor, getStatusText } from "./statusTools";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import useLocalStorage, { LOCAL_STORAGE_VERSION } from "./hooks/useLocalStorage";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";
import {
    capitalizeFirstLetter,
    getContrastBasedOnHexColor,
    getHexColorFromTailwindColor,
    getHTMLValue,
    getPriorityColor,
    getPriorityValue,
    getStatusOrPriorityColor,
    getDisplayedTicketUid,
    isNotNullOrUndefined,
    lowerCaseFirstLetter,
    mapEnumToInputSelectData,
    sleep,
    classNames,
} from "./tools";
import { frontEncrypt } from "./crypto/frontUtils";
import { getTicketLogoByStatus } from "./ticketLogoByStatus";
import NeoColors from "./neoColors";

export {
    capitalizeFirstLetter,
    classNames,
    formatDate,
    formatDateToNow,
    formatMessage,
    frontEncrypt,
    getActorName,
    getContrastBasedOnHexColor,
    getDateCompletionPercentage,
    getDateFnsLocaleFromUserLang,
    getFormatedTimeToNowExtended,
    getHTMLValue,
    getOutageBorderColor,
    getOutageDivideColor,
    getOutageSVGColor,
    getOutageTextColor,
    getPriorityColor,
    getPriorityValue,
    getRequesterUid,
    getServiceStatusColor,
    getStatusColor,
    getStatusOrPriorityColor,
    getStatusText,
    getTicketLogoByStatus,
    getDisplayedTicketUid,
    getTimeToNowWithTranslation,
    getUserName,
    inputReducer,
    isNotNullOrUndefined,
    getHexColorFromTailwindColor,
    LOCAL_STORAGE_VERSION,
    lowerCaseFirstLetter,
    mapEnumToInputSelectData,
    NeoColors,
    sleep,
    stripHtml,
    useIsFirstRender,
    useLocalStorage,
};
import { getActorName, getRequesterUid, getUserName } from "./userTools";
import { stripHtml } from "./chatFunction";
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
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";
import { frontEncrypt } from "./crypto/frontUtils";
import { getTicketLogoByStatus } from "./ticketLogoByStatus";
import NeoColors from "./neoColors";

export {
    formatDate,
    formatDateToNow,
    frontEncrypt,
    getActorName,
    getDateCompletionPercentage,
    getDateFnsLocaleFromUserLang,
    getFormatedTimeToNowExtended,
    getOutageBorderColor,
    getOutageDivideColor,
    getOutageSVGColor,
    getOutageTextColor,
    getRequesterUid,
    getServiceStatusColor,
    getStatusColor,
    getStatusText,
    getTicketLogoByStatus,
    getTimeToNowWithTranslation,
    getUserName,
    inputReducer,
    LOCAL_STORAGE_VERSION,
    NeoColors,
    stripHtml,
    useIsFirstRender,
    useLocalStorage,
    useOnClickOutside,
};
export * from "./tools";

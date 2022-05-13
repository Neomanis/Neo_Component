import { getActorName, getRequesterUid, getUserEntityName, getUserName } from "./userTools";
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
import useLocalStorage, { LOCAL_STORAGE_VERSION } from "./hooks/useLocalStorage";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";
import {
    capitalizeFirstLetter,
    getContrastBasedOnHexColor,
    getHexColorFromTailwindColor,
    getStatusOrPriorityColor,
    getTicketTitle,
    lowerCaseFirstLetter,
    mapEnumToInputSelectSearchableData,
    sleep,
} from "./tools";
import { frontEncrypt } from "./crypto/frontUtils";
import { getTicketLogoByStatus } from "./ticketLogoByStatus";

export {
    capitalizeFirstLetter,
    formatDate,
    formatDateToNow,
    formatMessage,
    frontEncrypt,
    getActorName,
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
    getTicketLogoByStatus,
    getTicketTitle,
    getTimeToNowWithTranslation,
    getUserEntityName,
    getUserName,
    inputReducer,
    LOCAL_STORAGE_VERSION,
    lowerCaseFirstLetter,
    mapEnumToInputSelectSearchableData,
    sleep,
    stripHtml,
    useIsFirstRender,
    useLocalStorage,
};

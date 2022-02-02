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
import { getStatusColor } from "./ticketColorSelector";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";

export {
    displayRequesterName,
    formatDate,
    formatDateToNow,
    formatMessage,
    getDateCompletionPercentage,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    getTimeToNowWithTranslation,
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
    getUserName,
    inputReducer,
    stripHtml,
    useIsFirstRender,
};

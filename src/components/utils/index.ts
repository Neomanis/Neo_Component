import { displayRequesterName, getUserName, getRequesterUid } from "./displayRequesterName";
import { formatMessage, getRecipientsNameByIds, stripHtml } from "./chatFunction";
import {
    formatDate,
    formatDateToNow,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
} from "./getFormatedTimeToNow";
import { getServiceStatusColor } from "./serviceStatusColorSelector";
import { getStatusColor, getPriorityColor } from "./ticketColorSelector";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import inputReducer from "./reducers/inputReducer";
import { getOutageBorderColor, getOutageDivideColor, getOutageSVGColor, getOutageTextColor } from "./outagesColors";

export {
    displayRequesterName,
    formatDate,
    formatDateToNow,
    formatMessage,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    getOutageTextColor,
    getOutageDivideColor,
    getOutageBorderColor,
    getOutageSVGColor,
    getPriorityColor,
    getRecipientsNameByIds,
    getRequesterUid,
    getServiceStatusColor,
    getStatusColor,
    getUserName,
    inputReducer,
    stripHtml,
    useIsFirstRender,
};

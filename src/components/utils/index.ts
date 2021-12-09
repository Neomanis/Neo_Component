import { displayRequesterName, getUserName, getRequesterUid } from "./displayRequesterName";
import { formatMessage, getRecipientsNameByIds, stripHtml } from "./chatFunction";
import {
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    formatDate,
    formatDateToNow,
} from "./getFormatedTimeToNow";
import { getServiceStatusColor } from "./serviceStatusColorSelector";
import { getStatusColor, getPriorityColor } from "./ticketColorSelector";
import inputReducer from "./reducers/inputReducer";

export {
    displayRequesterName,
    formatDate,
    formatDateToNow,
    formatMessage,
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    getPriorityColor,
    getRecipientsNameByIds,
    getRequesterUid,
    getServiceStatusColor,
    getStatusColor,
    getUserName,
    inputReducer,
    stripHtml,
};

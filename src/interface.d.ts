import { ReactElement } from "react";

export interface IUser {
    uid?: string;
    name?: { firstName?: string; lastName?: string };
    role?: string;
    mail?: string;
    dn?: string;
    title?: string;
    token?: string;
    glpiToken?: string;
    glpiId?: string;
    language: string;
}

export interface IAuthRoute {
    user: IUser;
    component: ReactElement;
    path: string;
    roles: string[];
}

export interface IService {
    name: string;
    url: string;
    port: string;
}

export interface IStatus {
    statusCode: number;
    message: string;
    name: string;
}

export interface ISessionToken {
    sessionToken: string;
}

export interface ITicket {
    id?: number;
    entities_id?: number;
    name?: string;
    date?: string;
    closedate?: string;
    solvedate?: string;
    date_mod?: string;
    users_id_lastupdater?: number;
    status?: number;
    users_id_recipient?: number;
    requesttypes_id?: number;
    content?: string;
    urgency?: number;
    impact?: number;
    priority?: number;
    itilcategories_id?: number;
    type?: number;
    global_validation?: number;
    slas_id_ttr?: number;
    slas_id_tto?: number;
    slalevels_id_ttr?: number;
    time_to_resolve?: string;
    time_to_own?: string;
    begin_waiting_date?: string;
    sla_waiting_duration?: number;
    ola_waiting_duration?: number;
    olas_id_tto?: number;
    olas_id_ttr?: number;
    olalevels_id_ttr?: number;
    ola_ttr_begin_date?: string;
    internal_time_to_resolve?: string;
    internal_time_to_own?: string;
    waiting_duration?: number;
    close_delay_stat?: number;
    solve_delay_stat?: number;
    takeintoaccount_delay_stat?: number;
    actiontime?: number;
    is_deleted?: number;
    resources?: IResource[];
    locations_id?: number;
    validation_percent?: number;
    date_creation?: string;
    userRequester?: number[];
    userWatcher?: number[];
    userAssignedTo?: number[];
    groupRequester?: number[];
    groupWatcher?: number[];
    groupAssignedTo?: number[];
    links?: { rel?: string; href?: string }[];
}

export interface IUpdateTicket {
    [x: string]: string | number | number[] | Partial<IResource>[];
}

export interface IInputs {
    itilcategories_id: string;
    description: string;
    impact: string;
    openning_date: string;
    openning_time: string;
    priority: string;
    requesttypes_id: string;
    status: string;
    requester: string;
    name: string;
    type: string;
    urgency: string;
    global_validation: string;
    watcher: string;
    assignedTo: string;
    content: string;
    date_creation: Date;
    userRequester?: number[];
    userWatcher?: number[];
    userAssignedTo?: number[];
    groupRequester?: number[];
    groupWatcher?: number[];
    groupAssignedTo?: number[];
}

export interface IFormInput {
    login: string;
    password: string;
}

export interface IGlpiUsers {
    api_token_date?: string;
    auths_id?: number;
    authtype?: number;
    backcreated?: number;
    begin_date?: string;
    comment?: string;
    cookie_token_date?: string;
    csv_delimiter?: string;
    date_creation?: string;
    date_format?: number;
    date_mod?: string;
    date_sync?: string;
    default_dashboard_assets?: string;
    default_dashboard_central?: string;
    default_dashboard_helpdesk?: string;
    default_dashboard_mini_ticket?: string;
    default_requesttypes_id?: number;
    display_count_on_home?: number;
    display_options?: string;
    duedatecritical_color?: string;
    duedatecritical_less?: number;
    duedatecritical_unit?: string;
    duedateok_color?: string;
    duedatewarning_color?: string;
    duedatewarning_less?: number;
    duedatewarning_unit?: string;
    end_date?: string;
    entities_id?: number;
    firstname?: string;
    followup_private?: number;
    groups_id?: number;
    highcontrast_css?: number;
    id?: number;
    is_active?: number;
    is_deleted?: number;
    is_deleted_ldap?: number;
    is_ids_visible?: number;
    keep_devices_when_purging_item?: number;
    language?: string;
    last_login?: number;
    layout?: string;
    list_limit?: number;
    locations_id?: number;
    lock_autolock_mode?: number;
    lock_directunlock_notification?: number;
    mobile?: string;
    name?: string;
    names_format?: number;
    notification_to_myself?: number;
    number_format?: number;
    palette?: string;
    password_forget_token_date?: string;
    password_forget_token?: string;
    password_last_update?: string;
    password?: string;
    pdffont?: string;
    personal_token_date?: string;
    personal_token?: string;
    phone2?: string;
    phone?: string;
    picture?: string;
    plannings?: string;
    priority_1?: string;
    priority_2?: string;
    priority_3?: string;
    priority_4?: string;
    priority_5?: string;
    priority_6?: string;
    privatebookmarkorder?: string;
    profiles_id?: number;
    realname?: string;
    refresh_views?: number;
    registration_number?: string;
    set_default_requester?: number;
    set_default_tech?: number;
    show_count_on_tabs?: number;
    show_jobs_at_login?: number;
    sync_field?: string;
    task_private?: number;
    task_state?: number;
    timezone?: string;
    use_flat_dropdowntree?: number;
    use_mode?: number;
    usercategories_id?: number;
    user_dn?: string;
    users_id_supervisor?: number;
    usertitles_id?: number;
}

export interface IGlpiRequest {
    id?: number;
    name?: string;
    is_helpdesk_default?: number;
    is_followup_default?: number;
    is_mail_default?: number;
    is_mailfollowup_default?: number;
    is_active?: number;
    is_ticketheader?: number;
    is_itilfollowup?: number;
    comment?: string;
    date_mod?: string;
    date_creation?: string;
    completename?: string;
}

export interface IInputSelect {
    id?: number;
    value?: string;
}
export interface IResponse {
    code: number;
    message: string;
}
export interface IItsmConfig {
    address: string;
}

export interface ITicketCreate {
    name?: string;
    status?: number;
    users_id_recipient?: number;
    requesttypes_id?: number;
    content?: string;
    urgency?: number;
    impact?: number;
    priority?: number;
    itilcategories_id?: number;
    type?: number;
    global_validation?: number;
    date_creation?: string;
    resources?: Partial<IResource>[];
    userRequester?: number[];
    userWatcher?: number[];
    userAssignedTo?: number[];
    groupRequester?: number[];
    groupWatcher?: number[];
    groupAssignedTo?: number[];
}

export interface IOpenAndUserTickets {
    [x: string]: ITicket[];
}

export interface INotification {
    notification: {
        id: number;
        content: string;
        createdAt: string;
    };
    read: boolean;
}

export interface IOutage {
    id: number;
    title: string;
    content: string;
    severity: string;
    type: string;
    startAt: string;
    endAt?: string;
    displayAt: string;
    hideAt?: string;
}

export interface IResourceItem {
    id: number;
    entities_id?: number;
    name?: string;
    serial?: string;
    otherserial?: string;
    contact?: string;
    contact_num?: string;
    users_id_tech?: number;
    groups_id_tech?: number;
    comment?: string;
    date_mod?: string;
    autoupdatesystems_id?: number;
    locations_id?: number;
    networks_id?: number;
    computermodels_id?: number;
    computertypes_id?: number;
    is_template?: number;
    template_name?: null;
    manufacturers_id?: number;
    is_deleted?: number;
    is_dynamic?: number;
    users_id?: number;
    groups_id?: number;
    states_id?: number;
    ticket_tco?: string;
    uuid?: string;
    date_creation?: string;
    is_recursive?: number;
    links?: { rel?: string; href?: string }[];
}

export interface IResource {
    item: IResourceItem;
    type: string;
    tickets: Partial<ITicket>[];
}

export interface IResourcesMultipleSelect {
    resources: IInputSelect[];
    type: string;
}

export interface ICategoryResources {
    [x: string]: IResourceItem[];
}

export interface IChatMessage {
    id?: number;
    itemtype?: string;
    items_id?: number;
    date?: string;
    users_id: number;
    users_id_editor?: number;
    content: string;
    is_private?: number;
    requesttypes_id?: number;
    date_mod?: string;
    date_creation?: string;
    timeline_position?: number;
    sourceitems_id?: number;
    sourceof_items_id?: number;
}

export interface IChatResponse {
    type: string;
    skill?: string;
    text?: string;
    message?: string;
    buttonText?: string;
    placeholderText?: string;
    dropdownPlaceholder?: string;
    markdown?: boolean;
    options?: Array<{ label: string; value: string }>;
    choices?: Array<{ label: string; value: string }>;
    displayInKeyboard?: boolean;
    typing?: boolean;
}

export interface IDiagnostic {
    _id: { $oid: string };
    ticketId: number;
    diagnostics: Array<{
        name: string;
        ipRemote?: string;
        portRemote?: number;
        results: Array<{
            Exit: {
                id: number;
                name: string;
                type: string;
                action: string;
            };
            Actions: Array<{
                id: number;
                description: string;
                result: string;
                date: {
                    $date: string;
                };
            }>;
        }>;
    }>;
}

export interface IInputSelect {
    id?: number;
    value?: string;
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

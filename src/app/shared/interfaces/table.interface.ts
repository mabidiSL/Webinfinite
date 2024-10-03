import { Claim, Permission } from "src/app/store/Role/role.models";


export interface TableConfig {
    columns?: TableColumn[];
    rowActions?: TableAction[];
    data?: any[];
    total?: number;
    permission?: Permission;
}

export interface TableColumn {
    title?: string | undefined;
    dataField?: any;
    key?: string;
    sortable?: boolean;
    sort_direction?: string;
    type?: string;
    date_format?: string;
    class?: string;
    formatter?: any;
    placeholder?: string;
}

export interface TableAction {
    label: string;
    actionToPerform: string;
    icon: string;
    permission?: Claim;
}

export interface TableClickedAction {
    actionToPerform?: string;
    data?: any;
    value?: any;
}

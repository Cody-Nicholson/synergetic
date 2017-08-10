

export interface SynMenuItem{
    id: string | number;
    label: string;
    routerLink?: any;
    items?: SynMenuItem[];
}

export interface SynNavItem{
    id: string | number;
    label: string;
    routerLink?: any;
    items?: SynNavItem[];
    icon?: string;
}

export interface CheckboxOption {
    id: any;
    label: string;
    checked?: boolean;
}

export class SortAction {
    constructor(public field: string,
                public orderAscending: boolean) {
    }
}

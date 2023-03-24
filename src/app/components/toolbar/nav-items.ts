export interface NavItems {
    menuName: string;
    disabled?: boolean;
    route?: string;
    children?: NavItems[];
    divider?: boolean;
    url?: string;
    id?: string;
}

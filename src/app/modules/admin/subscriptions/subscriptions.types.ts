export interface InventoryProduct {
    _id             : string,
    planname        : string,
    description     : string,
    userlimitation  : string,
    price           : string,
    no_of_events    : string,
    max_days        : string,
    status          : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

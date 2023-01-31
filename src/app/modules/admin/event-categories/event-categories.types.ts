export interface InventoryProduct {
    _id          : string;
    categoryname : string;
    description  : string;
    event_type   : string;
    status       : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

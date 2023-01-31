export interface InventoryProduct {
    categoryid   : string;
    categoryname : string;
    description  : string;
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

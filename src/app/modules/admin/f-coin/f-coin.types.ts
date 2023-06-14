export interface InventoryProduct {
    _id          : string;
    discountname : string;
    discounttype : string;
    description  : string;
    discount     : string;
    status       : boolean;
    tandc        : string;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

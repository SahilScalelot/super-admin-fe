export interface InventoryProduct {
    _id         : string,
    code        : string,
    description : string,
    amount      : string,
    percentage  : string,
    limit       : string,
    expiry_date : string,
    expiry_time : string,
    status      : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

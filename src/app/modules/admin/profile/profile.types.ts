export interface Profile {
    name            : string;
    mobile          : string;
    shop_no         : string;
    floor           : string;
    street          : string;
    landmark        : string;
    city            : string;
    state           : string;
    country         : string;
    zip_code        : string;
    is_manufacturer : boolean;
    is_wholesaler   : boolean;
    is_retailer     : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

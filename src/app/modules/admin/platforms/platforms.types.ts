export interface InventoryProduct {
    platformid    : string;
    name          : string;
    platformimage : string;
    description   : string;
    status        : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

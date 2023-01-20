export interface InventoryProduct{
    _id: string;
    itemname?: string;
    itemimage: string;
    description: string;
    status: boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;

    // length: number;
    // size: number;
    // page: number;
    // lastPage: number;
    // startIndex: number;
    // endIndex: number;
}

export interface InventoryProduct
{
    id: string;
    itemname?: string;
    itemimage: string;
    description: string;
    status: boolean;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

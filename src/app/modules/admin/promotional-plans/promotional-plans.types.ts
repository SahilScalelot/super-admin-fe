export interface Discounts {    
    _id                  : string;
    planname             : string;
    description          : string;
    notification_amount  : string;
    sms_amount           : string;
    email_amount         : string;
    combo_amount         : string;
    total_users          : string;
    status               : boolean;
}

export interface InventoryPagination
{
    page: number;
    limit: number;
    search: string;
    sortfield: string;
    sortoption: string;
}

/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'items',
        title: 'Seating Items',
        type : 'basic',
        icon : 'heroicons_outline:cube',
        link : '/admin/items'
    },{
        id   : 'discounts',
        title: 'Discounts',
        type : 'basic',
        icon : 'heroicons_outline:tag',
        link : '/admin/discounts'
    },{
        id   : 'eventCategories',
        title: 'Event Categories',
        type : 'basic',
        icon : 'heroicons_outline:view-grid-add',
        link : '/admin/event-categories'
    },{
        id   : 'organizer',
        title: 'Organizer',
        type : 'basic',
        icon : 'feather:users',
        link : '/admin/organizer'
    // },{
    //     id   : 'events',
    //     title: 'Events',
    //     type : 'basic',
    //     icon : 'heroicons_outline:calendar',
    //     link : '/admin/events'
    },{
        id   : 'shopCategories',
        title: 'Shop Categories',
        type : 'basic',
        icon : 'heroicons_outline:view-grid',
        link : '/admin/shop-categories'
    },{
        id   : 'promotionPlans',
        title: 'Promotion Plans',
        type : 'basic',
        icon : 'mat_outline:local_play',
        link : '/admin/promotion-plans'
    },{
        id   : 'platforms',
        title: 'Platforms',
        type : 'basic',
        icon : 'heroicons_outline:template',
        link : '/admin/platforms'
    // },{
    //     id   : 'subscriptionPlans',
    //     title: 'Subscription Plans',
    //     type : 'basic',
    //     icon : 'mat_outline:local_play',
    //     link : '/admin/subscription-plans'
    },{
        id   : 'notificationCoupons',
        title: 'Notification Coupons',
        type : 'basic',
        icon : 'mat_outline:notifications_active',
        link : '/admin/notification-coupons'
    },{
        id   : 'eventBookingCoupons',
        title: 'Event Booking Coupons',
        type : 'basic',
        icon : 'heroicons_outline:ticket',
        link : '/admin/event-booking-coupons'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'discounts',
        title: 'Discounts',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'eventCategories',
        title: 'Event Categories',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin/example'
    }
];

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
    },{
        id   : 'agents',
        title: 'Agents',
        type : 'basic',
        icon : 'feather:users',
        link : '/admin/agents'
    },{
        id   : 'users',
        title: 'Users',
        type : 'basic',
        icon : 'feather:users',
        link : '/admin/users'
    },{
        id   : 'events',
        title: 'Events',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/admin/events'
    },{
        id   : 'live-streams',
        title: 'Live Strams',
        type : 'basic',
        icon : 'mat_solid:live_tv',
        link : '/admin/live-streams'
    },{
        id   : 'offlineShops',
        title: 'Offline Shops',
        type : 'basic',
        icon : 'heroicons_outline:shopping-bag',
        link : '/admin/offline-shops'
    },{
        id   : 'offlineOffer',
        title: 'Shops Offers',
        type : 'basic',
        icon : 'feather:tag',
        link : '/admin/offline-offer'
    },{
        id   : 'onlineOffer',
        title: 'Online Offer',
        type : 'basic',
        icon : 'heroicons_outline:badge-check',
        link : '/admin/online-offer'
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
    },{
        id   : 'fCoin',
        title: 'F-Coin',
        type : 'basic',
        icon : 'heroicons_outline:database',
        link : '/admin/f-coin'
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

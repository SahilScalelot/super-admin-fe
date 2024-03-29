import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SeatingItemsComponent } from 'app/modules/admin/seating-items/seating-items.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DiscountsComponent } from './discounts/discounts.component';
import { EventCategoriesComponent } from './event-categories/event-categories.component';
import { ShopCategoriesComponent } from './shop-categories/shop-categories.component';
import { PromotionalPlansComponent } from './promotional-plans/promotional-plans.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotificationCouponsComponent } from './notification-coupons/notification-coupons.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventBookingCouponsComponent } from './event-booking-coupons/event-booking-coupons.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { EventsComponent } from './events/events.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OfflineOffersComponent } from './offline-offers/offline-offers.component';
import { OnlineOffersComponent } from './online-offers/online-offers.component';
import { OfflineShopsComponent } from './offline-shops/offline-shops.component';
import { AgentComponent } from './agent/agent.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileComponent } from './profile/profile.component';
import { FCoinComponent } from './f-coin/f-coin.component';
import { FAddCoinComponent } from './f-coin/add-coin/add-coin.component';
import { CoinsInComponent } from './f-coin/coinsin/coinsin.component';
import { CoinsOutComponent } from './f-coin/coinsout/coinsout.component';
import { UsersComponent } from './users/users.component';
import { LiveStreamsComponent } from './live-stream/live-stream.component';
import { Time24to12Format } from 'app/pipe/time24to12.pipe';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'items'
  }, {
    path: 'items',
    component: SeatingItemsComponent
  }, {
    path: 'discounts',
    component: DiscountsComponent
  }, {
    path: 'event-categories',
    component: EventCategoriesComponent
  }, {
    path: 'shop-categories',
    component: ShopCategoriesComponent
  }, {
    path: 'promotion-plans',
    component: PromotionalPlansComponent
  }, {
    path: 'platforms',
    component: PlatformsComponent
  }, {
    path: 'subscription-plans',
    component: SubscriptionsComponent
  }, {
    path: 'notification-coupons',
    component: NotificationCouponsComponent
  }, {
    path: 'event-booking-coupons',
    component: EventBookingCouponsComponent
  }, {
    path: 'organizer',
    component: OrganizerComponent
  }, {
    path: 'agents',
    component: AgentComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'events',
    component: EventsComponent
  }, {
    path: 'live-streams',
    component: LiveStreamsComponent
  }, {
    path: 'offline-shops',
    component: OfflineShopsComponent
  }, {
    path: 'offline-offer',
    component: OfflineOffersComponent
  }, {
    path: 'online-offer',
    component: OnlineOffersComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'f-coin',
    component: FCoinComponent
  }, {
    path: 'f-coin/add-coin',
    component: FAddCoinComponent
  }
];

@NgModule({
  declarations: [
    SeatingItemsComponent,
    DiscountsComponent,
    EventCategoriesComponent,
    ShopCategoriesComponent,
    PromotionalPlansComponent,
    PlatformsComponent,
    SubscriptionsComponent,
    NotificationCouponsComponent,
    EventBookingCouponsComponent,
    OrganizerComponent,
    EventsComponent,
    LiveStreamsComponent,
    OfflineOffersComponent,
    OnlineOffersComponent,
    OfflineShopsComponent,
    AgentComponent,
    UsersComponent,
    ProfileComponent,
    FCoinComponent,
    FAddCoinComponent,
    CoinsInComponent,
    CoinsOutComponent,
    Time24to12Format
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    FuseConfirmationModule,
    MatIconModule,
    MatRadioModule,

    MatSlideToggleModule,
    SharedModule,
    MatSortModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
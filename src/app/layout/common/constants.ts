import { environment } from "environments/environment";

/* eslint-disable @typescript-eslint/naming-convention */
export const CONSTANTS = {

  message: {
    INITIAL: 'Please enter search criteria and hit search button.',
    INTERNAL_ERROR: 'Oops Something went wrong..!',
    INTERNAL_SERVER_ERROR: 'Oops Internal Server error..!',
    NETWORK_ERROR: 'Oops! Connection/Network error..!'
  },

  errorCodes: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND_HTTP_EXCEPTION: 404,
    PERMISSION_DENIED: 404,
    METHOD_NOT_FOUND: 405,
    ALREADY_EXISTS: 406,
    DATABASE_INITIALIZATION_FAIL: 407,
    ERROR_CODE_VALIDATION_FAILED: 422,
    INVALID_DOMAIN: 433,
    TOKEN_EXPIRED: 466,
    TOKEN_REQUIRED: 477,
    INTERNAL_SERVER_ERROR: 500
  },

  userDefaultImage: './assets/images/profile.jpg',
  defaultImage: './assets/images/dummy-image.jpg',
  importUsersDemoUrl: 'global/importusers.csv',

  baseImageURL: environment.baseImageURL,
  appUrl: environment.appURL,

  editorConfig: {
    toolbar: [
      'heading', '|',
      'fontsize', 'fontfamily', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'alignment', '|',
      'outdent', 'indent', '|',
      'numberedList', 'bulletedList', '|',
      'link', 'mediaembed', 'blockquote', 'insertTable', '|',
      'undo', 'redo'
    ],
    mediaEmbed: { previewsInData: true },
    table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
    language: 'en',
    alignment: { options: ['left', 'right', 'center', 'justify'] },
    fontSize: { options: ['tiny', 'small', 'default', 'big', 'huge'] },
    fontColor: {
      columns: 6,
      colors: [
        { color: '#f05a28', label: 'Theme Orange', class: 'orange' },
        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
        { color: '#f8696b', label: 'Red 1' },
        { color: '#FFD800', label: 'Yellow 1' },
        { color: '#63be7b', label: 'Green 1' },
        { color: '#f44336', label: 'Red 2' },
        { color: '#ff9100', label: 'Yellow 2' },
        { color: '#4caf50', label: 'Green 2' },
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ]
    },
    fontBackgroundColor: {
      columns: 6,
      colors: [
        { color: '#f05a28', label: 'Theme Orange' },
        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
        { color: '#f8696b', label: 'Red 1' },
        { color: '#FFD800', label: 'Yellow 1' },
        { color: '#63be7b', label: 'Green 1' },
        { color: '#f44336', label: 'Red 2' },
        { color: '#ff9100', label: 'Yellow 2' },
        { color: '#4caf50', label: 'Green 2' },
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ]
    }
  },

  eventTypeObj: {
    b2b: 0,
    public_party: 1
  },

  eventTypeArr: [
    {value: 'b2b', label: 'B2B', displayLabel: 'B2B'},
    {value: 'public_party', label: 'Public Party', displayLabel: 'PP'}
  ],

  verticalLocationsObj: {
    TOP: 0,
    CENTER: 1,
    BOTTOM: 2
  },

  verticalLocationsArr: [
    {value: 'TOP', label: 'Top'},
    {value: 'CENTER', label: 'Center'},
    {value: 'BOTTOM', label: 'Bottom'}
  ],

  horizontalLocationsObj: {
    NONE: 0,
    LEFT: 1,
    CENTER: 2,
    RIGHT: 3,
  },

  horizontalLocationsArr: [
    {value: 'NONE', label: 'None'},
    {value: 'LEFT', label: 'Left'},
    {value: 'CENTER', label: 'Center'},
    {value: 'RIGHT', label: 'Right'},
  ],

  discountTypeObj: {
    percentage: 0,
    rupee: 1
  },

  discountTypeArr: [
    {value: 'percentage', label: 'Percentage', displayLabel: '%'},
    {value: 'rupee', label: 'Rupee', displayLabel: '₹'}
  ],

  offerTypeObj: {
    unlimited: 0,
    limited: 1
  },

  offerTypeArr: [
    {value: 'unlimited_person', label: 'Unlimited Person'},
    {value: 'limited_person', label: 'Limited Person'}
  ],

  userType: {
    EVENT_USERS: 0,
    SHOP_USERS: 1,
    ONLINE_OFFER_USERS: 2,
    LIVE_STREAM_USERS: 3,
    ALL_USERS: 4,
    EXISTING_USERS: 5,
  },

  userTypeArr: [
    {value: 'eventusers', url: '/assets/images/event-user.png', type: 'Event User'},
    {value: 'shopusers', url: '/assets/images/shope-user.png', type: 'Shop User'},
    {value: 'onlineofferusers', url: '/assets/images/online-shop-user.png', type: 'online shop offers user'},
    {value: 'livestreamusers', url: '/assets/images/live-streaming-user.png', type: 'live streaming user'},
    {value: 'allusers', url: '/assets/images/all-user.png', type: 'All User'},
    {value: 'existingusers', url: '/assets/images/existing-user.png', type: 'Existing User'}
  ],

  maxPosterSizeInMB: 10,
  maxImageSizeInMB: 3,
  maxIconSizeInKB: 500,
  maxVideoSizeInMB: 512,
  maxCompanyVideoSizeInMB: 2,
  defaultMapZoom: 12,
  latitude: 21.228125,
  longitude: 72.833771,
  googleMapApiKey: 'AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q',

  maxOfferOnAllProductsLimit: 7,
};
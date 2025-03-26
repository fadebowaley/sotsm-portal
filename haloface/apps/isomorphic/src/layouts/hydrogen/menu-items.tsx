import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiAirplaneTiltDuotone,
  PiApplePodcastsLogoDuotone,
  PiArrowsOutDuotone,
  PiArrowsOutLineHorizontalDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChartPieSliceDuotone,
  PiChatCenteredDotsDuotone,
  PiClipboardTextDuotone,
  PiCodesandboxLogoDuotone,
  PiCoinDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFolderDuotone,
  PiFolderLockDuotone,
  PiFoldersDuotone,
  PiFolderUserDuotone,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMapPinLineDuotone,
  PiNewspaperClippingDuotone,
  PiNoteBlankDuotone,
  PiPackageDuotone,
  PiPresentationChartDuotone,
  PiPushPinDuotone,
  PiRocketLaunchDuotone,
  PiScalesDuotone,
  PiShapesDuotone,
  PiShieldCheckDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSparkleDuotone,
  PiSquaresFourDuotone,
  PiStairsDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  // {
  //   name: 'File Manager',
  //   href: '/',
  //   icon: <PiFolderDuotone />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  // },
  {
    name: 'Project',
    href: routes.project.dashboard,
    icon: <PiClipboardTextDuotone />,
  },
  // {
  //   name: 'CRM',
  //   href: routes.crm.dashboard,
  //   icon: <PiFolderUserDuotone />,
  // },
  // {
  //   name: 'Affiliate',
  //   href: routes.affiliate.dashboard,
  //   icon: <PiChartPieSliceDuotone />,
  // },
  // {
  //   name: 'Store Analytics',
  //   href: routes.storeAnalytics.dashboard,
  //   icon: <PiPresentationChartDuotone />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Bidding',
  //   href: routes.bidding.dashboard,
  //   icon: <PiScalesDuotone />,
  //   badge: 'NEW',
  // },
  {
    name: 'Social Media',
    href: routes.socialMedia.dashboard,
    icon: <PiSparkleDuotone />,
  },
  {
    name: 'Job Board',
    href: routes.jobBoard.dashboard,
    icon: <PiShapesDuotone />,
  },
  {
    name: 'Financial',
    href: routes.financial.dashboard,
    icon: <PiCurrencyCircleDollarDuotone />,
  },
  {
    name: 'Logistics',
    href: routes.logistics.dashboard,
    icon: <PiPackageDuotone />,
  },
  {
    name: 'E-Commerce',
    href: routes.eCommerce.dashboard,
    icon: <PiShoppingCartDuotone />,
  },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBarDuotone />,
  // },
  {
    name: 'Support',
    href: routes.support.dashboard,
    icon: <PiHeadsetDuotone />,
  },
  // {
  //   name: 'Podcast',
  //   href: routes.podcast.dashboard,
  //   icon: <PiApplePodcastsLogoDuotone />,
  //   badge: 'NEW',
  // },

  // label start
  {
    name: 'Apps Kit',
  },
  // label end
  {
    name: 'E-Commerce',
    href: '#',
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: 'Products',
        href: routes.eCommerce.products,
        badge: '',
      },
      {
        name: 'Product Details',
        href: routes.eCommerce.productDetails(DUMMY_ID),
      },
      {
        name: 'Create Product',
        href: routes.eCommerce.createProduct,
      },
      {
        name: 'Edit Product',
        href: routes.eCommerce.ediProduct(DUMMY_ID),
      },
      {
        name: 'Categories',
        href: routes.eCommerce.categories,
      },
      {
        name: 'Create Category',
        href: routes.eCommerce.createCategory,
      },
      {
        name: 'Edit Category',
        href: routes.eCommerce.editCategory(DUMMY_ID),
      },
      {
        name: 'Orders',
        href: routes.eCommerce.orders,
      },
      {
        name: 'Order Details',
        href: routes.eCommerce.orderDetails(DUMMY_ID),
      },
      {
        name: 'Create Order',
        href: routes.eCommerce.createOrder,
      },
      {
        name: 'Edit Order',
        href: routes.eCommerce.editOrder(DUMMY_ID),
      },
      {
        name: 'Reviews',
        href: routes.eCommerce.reviews,
      },
      {
        name: 'Shop',
        href: routes.eCommerce.shop,
      },
      {
        name: 'Cart',
        href: routes.eCommerce.cart,
      },
      {
        name: 'Checkout & Payment',
        href: routes.eCommerce.checkout,
      },
    ],
  },
  {
    name: 'Support',
    href: '#',
    icon: <PiHeadsetDuotone />,
    dropdownItems: [
      {
        name: 'Inbox',
        href: routes.support.inbox,
      },
      {
        name: 'Snippets',
        href: routes.support.snippets,
      },
      {
        name: 'Templates',
        href: routes.support.templates,
      },
    ],
  },
  {
    name: 'Invoice',
    href: '#',
    icon: <PiCurrencyDollarDuotone />,
    dropdownItems: [
      {
        name: 'List',
        href: routes.invoice.home,
      },
      {
        name: 'Details',
        href: routes.invoice.details(DUMMY_ID),
      },
      {
        name: 'Create',
        href: routes.invoice.create,
      },
      {
        name: 'Edit',
        href: routes.invoice.edit(DUMMY_ID),
      },
    ],
  },
  {
    name: 'Appointment',
    href: routes.appointment.appointmentList,
    icon: <PiCalendarDuotone />,
  },
  {
    name: 'File Manager',
    href: routes.file.manager,
    icon: <PiFoldersDuotone />,
  },
  {
    name: 'Event Calendar',
    href: routes.eventCalendar,
    icon: <PiCalendarPlusDuotone />,
  },
  {
    name: 'Roles & Permissions',
    href: routes.rolesPermissions,
    icon: <PiFolderLockDuotone />,
  },
  {
    name: 'Invoice Builder',
    href: routes.invoice.builder,
    icon: <PiNewspaperClippingDuotone />,
  },
  {
    name: 'Image Viewer',
    href: routes.imageViewer,
    icon: <PiCodesandboxLogoDuotone />,
  },
  // label start
  {
    name: 'Search & Filters',
  },
  {
    name: 'Real Estate',
    href: routes.searchAndFilter.realEstate,
    icon: <PiHouseLineDuotone />,
  },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTiltDuotone />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiCoinDuotone />,
  // },
  // label end
  // label start
  {
    name: 'Widgets',
  },
  // label end
  {
    name: 'Cards',
    href: routes.widgets.cards,
    icon: <PiSquaresFourDuotone />,
  },
  {
    name: 'Icons',
    href: routes.widgets.icons,
    icon: <PiFeatherDuotone />,
  },
  {
    name: 'Charts',
    href: routes.widgets.charts,
    icon: <PiChartLineUpDuotone />,
  },
  // {
  //   name: 'Banners',
  //   href: routes.widgets.banners,
  //   icon: <PiImageDuotone />,
  // },
  {
    name: 'Maps',
    href: routes.widgets.maps,
    icon: <PiMapPinLineDuotone />,
  },
  {
    name: 'Email Templates',
    href: routes.emailTemplates,
    icon: <PiEnvelopeDuotone />,
  },
  // label start
  {
    name: 'Forms',
  },
  // label end
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
    icon: <PiUserGearDuotone />,
  },
  {
    name: 'Notification Preference',
    href: routes.forms.notificationPreference,
    icon: <PiBellSimpleRingingDuotone />,
  },
  {
    name: 'Personal Information',
    href: routes.forms.personalInformation,
    icon: <PiUserDuotone />,
  },
  {
    name: 'Newsletter',
    href: routes.forms.newsletter,
    icon: <PiEnvelopeSimpleOpenDuotone />,
  },
  {
    name: 'Multi Step',
    href: routes.multiStep,
    icon: <PiStepsDuotone />,
  },
  {
    name: 'Multi Step 2',
    href: routes.multiStep2,
    icon: <PiStairsDuotone />,
  },
  {
    name: 'Payment Checkout',
    href: routes.eCommerce.checkout,
    icon: <PiCreditCardDuotone />,
  },
  // label start
  {
    name: 'Tables',
  },
  // label end
  {
    name: 'Basic',
    href: routes.tables.basic,
    icon: <PiGridFourDuotone />,
  },
  {
    name: 'Collapsible',
    href: routes.tables.collapsible,
    icon: <PiCaretCircleUpDownDuotone />,
  },
  {
    name: 'Enhanced',
    href: routes.tables.enhanced,
    icon: <PiTableDuotone />,
  },
  {
    name: 'Sticky Header',
    href: routes.tables.stickyHeader,
    icon: <PiBrowserDuotone />,
  },
  {
    name: 'Pagination',
    href: routes.tables.pagination,
    icon: <PiListNumbersDuotone />,
  },
  {
    name: 'Search',
    href: routes.tables.search,
    icon: <PiHourglassSimpleDuotone />,
  },
  {
    name: 'Resizable',
    href: routes.tables.resizable,
    icon: <PiArrowsOutLineHorizontalDuotone />,
  },
  {
    name: 'Pinning',
    href: routes.tables.pinning,
    icon: <PiPushPinDuotone />,
  },
  {
    name: 'Drag & Drop',
    href: routes.tables.dnd,
    icon: <PiArrowsOutDuotone />,
  },
  // label start
  {
    name: 'Pages',
  },
  {
    name: 'Profile',
    href: routes.profile,
    icon: <PiUserCircleDuotone />,
  },
  {
    name: 'Welcome',
    href: routes.welcome,
    icon: <PiShootingStarDuotone />,
  },
  {
    name: 'Coming soon',
    href: routes.comingSoon,
    icon: <PiRocketLaunchDuotone />,
  },
  {
    name: 'Access Denied',
    href: routes.accessDenied,
    icon: <PiFolderLockDuotone />,
  },
  {
    name: 'Not Found',
    href: routes.notFound,
    icon: <PiBinocularsDuotone />,
  },
  {
    name: 'Maintenance',
    href: routes.maintenance,
    icon: <PiHammerDuotone />,
  },
  {
    name: 'Blank',
    href: routes.blank,
    icon: <PiNoteBlankDuotone />,
  },

  // label start
  {
    name: 'Authentication',
  },
  // label end
  {
    name: 'Sign Up',
    href: routes.auth.signUp2,
    icon: <PiUserPlusDuotone />,
  },
  {
    name: 'Sign In',
    href: routes.auth.signIn2,
    icon: <PiShieldCheckDuotone />,
  },
  {
    name: 'Forgot Password',
    href: routes.auth.forgotPassword2,
    icon: <PiLockKeyDuotone />,
  },
  {
    name: 'OTP Pages',
    href: routes.auth.otp2,
    icon: <PiChatCenteredDotsDuotone />
  },
];

const mongoose = require("mongoose");
const { conn } = require("../config/db");

const churchSettingsSchema = new mongoose.Schema(
  {
    // General Church Profile
    churchName: { type: String, default: "Default Church Name" },
    logoUrl: { type: String },
    primaryColor: { type: String, default: "#0000FF" }, // Default: Blue
    contactEmail: { type: String },
    contactPhone: { type: String },
    websiteUrl: { type: String },
    socialLinks: { type: Object, default: {} }, // { facebook: "", twitter: "", youtube: "" }
    timezone: { type: String, default: "Africa/Lagos" },
    language: { type: String, default: "en" },

    // Multi-Tenancy Mode
    multiTenant: { type: Boolean, default: false }, // true = multi-tenant, false = single application

    // Worship & Event Settings
    serviceTimes: {
      type: [String],
      default: ["Sunday 9 AM", "Wednesday 6 PM"],
    },
    enableLiveStreaming: { type: Boolean, default: false },
    liveStreamUrl: { type: String },
    enableEventRegistration: { type: Boolean, default: true },
    maxEventParticipants: { type: Number, default: 500 },

    // Finance & Payment Settings
    enableRemittance: { type: Boolean, default: true }, // Enable church remittance
    currency: { type: String, default: "NGN" },
    exchangeRates: { type: Object, default: {} }, // Multi-currency support
    titheCategories: { type: [String], default: ["Tithe", "Offering", "Seed"] },
    supportedGateways: {
      type: [String],
      default: ["paystack", "flutterwave", "stripe"],
    },
    defaultPaymentGateway: { type: String, default: "paystack" }, // Select preferred payment gateway
    enableRecurringDonations: { type: Boolean, default: true },

    // Reporting & Analytics
    enableReportingPeriods: { type: Boolean, default: true }, // Enable/disable reporting periods
    reportingPeriod: {
      type: String,
      enum: ["weekly", "monthly", "quarterly", "annually"],
      default: "monthly",
    },
    enableAttendanceTracking: { type: Boolean, default: true },
    trackGivingPatterns: { type: Boolean, default: true },
    generateMonthlyReports: { type: Boolean, default: true },

    // Data Locking & Access Control
    enableDataLocks: { type: Boolean, default: true }, // Prevent modifications after submission
    lockPeriod: { type: Number, default: 7 }, // Data auto-lock after X days
    adminOverride: { type: Boolean, default: false }, // Allow admin to override locked data


    allowGuestCheckIn: { type: Boolean, default: false },

    // Communication & Notifications
    emailSMTP: { type: Object, default: {} },
    enableSMSNotifications: { type: Boolean, default: true },
    enableWhatsAppNotifications: { type: Boolean, default: true },
    announcementBroadcast: { type: Boolean, default: true },

    // Security & Compliance
    enable2FA: { type: Boolean, default: true },
    passwordStrengthPolicy: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    gdprCompliance: { type: Boolean, default: true },
    cookieConsentBanner: { type: Boolean, default: true },
    enableIPWhitelisting: { type: Boolean, default: false },
    ipWhitelist: { type: [String], default: [] }, // List of allowed IPs
    apiRateLimit: { type: Number, default: 1000 }, // API requests per hour
    accountRecovery: { type: Boolean, default: true }, // Enable password/account recovery options
  },
  { timestamps: true }
);

module.exports = conn.model("ChurchSettings", churchSettingsSchema);

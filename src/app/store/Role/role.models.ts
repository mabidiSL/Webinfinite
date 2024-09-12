export enum  Status {
  isActive = 0,
  isDeleted = 1,
  isUpdated = 2,
  isBlackListed = 3,
  isDefault = 4,
  isInactive = 5,
  isExpired = 6,
  isApproved = 7,
  isRejected = 8,
  isPending = 9,
}
export class Role{
  id?: string ;
  name?: string ;
  claims ?: Claim[];
  status ?: Status;
}


export class Claim{
  claimType !: Modules;
  claimValue : Permission[]= [];
}

export  enum Modules
    {

        All = 0,
        Dashboard = 1,
        Employees = 2,
        Permissions = 3,
        Customers = 4,
        Merchants = 5,
        Commissions = 6,
        Department = 7,
        MerchantWallet = 8,
        CustomerWallet = 9,
        Subscriptions = 10,
        CompanySubscriptions = 11,
        Coupons = 12,
        Cards = 13,
        PrePrintedMembership = 14,
        Gifts = 15,
        MarketingCompaigns = 16,
        MarketingOffers = 17,
        SpecialCoupons = 18,
        Banks = 19,
        Tax = 20,
        Invoices = 21,
        AppSettings = 22,
        Role = 23,
        Filter = 24,
        MobileNotifications = 25,
        SocialMedia = 26,
        CustomerInvoice = 27,
        Payment = 28, 
        Contracts = 29,
        complaints = 30,
        Settings = 31,
        CustomerAbondonedTasks = 32,
        CustomerReviews = 33,
        Stores = 34,
        Missions = 35,
        SubscriptionReports = 36,
        CouponReports = 37,
        CardReports = 38,
        MerchantReports = 39,
        categories = 40,
        classes = 41,
        CustomerLoyalty = 42


}
export enum Permission {

  All = 1,
  ViewAll = 2,
  View = 3,
  Create = 4,
  Update = 5,
  Delete = 6,
  Hide = 7, 
  Activate = 8,
  Deactivate = 9,
  Approve = 10,
  Print = 11,
  Download = 12,
  Filter = 13
}




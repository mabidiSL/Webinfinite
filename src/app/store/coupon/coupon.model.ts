import { _User } from "../Authentication/auth.models";

export interface CouponListModel {
    
        id?: string;
        name?: string;
        transName?: string;
        termsAndConditions?: string;
        transTermsAndConditions?: string;
        codeCoupon?: string;
        qrCode?: string;
        urlStore?: string;
        country?: any;// Country;
        area?: any;// Area;
        city?: any; // City;
        quantity?: number;
        merchantId?: string;
        merchant?: _User;
        storeId?: string;
        store?: any;//Store;
        managerName?: string;
        managerPhone?: string;
        startDateCoupon?: Date;
        endDateCoupon?: Date;
        contractRepName?: string;
        sectionOrderAppearnance?: string;
        categoryOrderAppearnce?: string;
        merchantLogo?: string;
        couponLogo?: string;
        couponType?: string;// free,discountPercent,discountAmount,servicePrice
        couponValueBeforeDiscount?:number;
        couponValueAfterDiscount?:number;
        PaymentDiscountRate?: number;
        status?: string;//pending,approved,active, expired, closed
        }
export interface MerchantListModel {
    
     id?: string;
     merchantLogo ?: string  ;
     merchantPicture? :  string ;
     categoryId?: string;
     merchantCategory ?:   string;
     merchantName ?:  string ;
     serviceType? :  string ;
     supervisorName ?:  string ;
     supervisorPhone? :  string ;
     bankAccountNumber ?:  string  
     registerCode ?:  string  
     website ?:  string;
     whatsup ?: string  ;
     facebook? :  string ;
     twitter ?: string  ;
     instagram? : string  ;
     walletId?: string ;
     qrCode?: string ;
     startDateContract? : string;
     endDateContract? : string;
     fileContract? : string;
     sectionId?: string;
     merchantSection ?:  string ;
     stores: any[] ;
     offers: any[] ;
     userId? : string;
     user?: User;
     updatedAt? :  string;
     createdAt?: string;


}
interface User{
    id?: string;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    phone?: string;
    logo?: string;
    wallet?: number;
    bankName?: string;
    url?: string;
    totalOrder?: number;
    emailVerifiedAt?: string;
    image?: string;
    referCount?: string;
    country?: string;
    user_type?: string;
    city?: string;
    street?: string;
    building?: string;
    company_registration?: string;
    registrationDate?: string;
    updatedAt?: string;
}

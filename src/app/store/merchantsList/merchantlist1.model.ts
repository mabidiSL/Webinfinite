export interface MerchantListModel {
    
     id?: string;
     merchantLogo ?: string  ;
     merchantPicture? :  string ;
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
     merchantSection ?:  string ;
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
// Merchant_Object{
//       username;
//       email;
//       password;
//       merchantName;//Merchant name
//       merchantLogo; // Merchant
//       phone;
//       country;
//       city;
//       area; 
//       serviceType ;
//       supervisorName;
//       supervisorPhone;
//       bankAccountNumber;
//       registerCode;
//       merchantPicture;
//       merchantSection;
//       merchantCategory;
//       offers: Offer;//not necessary in the register
//       stores: Store//not necessary in the register
//       website;
//       whatsup;
//       facebook;
//       twitter;
//       instagram;
     
// }
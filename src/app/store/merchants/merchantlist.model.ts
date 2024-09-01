export interface MerchantListModel {
    id: any;
    username: string;
    phone?: string;
    password?: string;
    city?: string;
    companyRegister?:string;
    country?:string;
    buiding?:string;
    status?: string;
    email: string;
    totalOrder?: number;
}
export interface MerchantApprovalListModel {
    id: any;
    username: string;
    status?: string;
    email: string;
    registrationDate: string;
}
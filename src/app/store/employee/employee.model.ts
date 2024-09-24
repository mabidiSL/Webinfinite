import { _User } from "../Authentication/auth.models";
import { Role } from "../Role/role.models";

export interface EmployeeListModel {
    
        id?: string;
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        country?: any;// Country;
        area?: any;// Area;
        city?: any; // City;
        bankAccountNumber?: string;
        bankName?: string;
        role?: Role;
        createdBy?: string;
        approvedBy: string;
        status?: string;//pending,approved,active, inactive, disabled
        }
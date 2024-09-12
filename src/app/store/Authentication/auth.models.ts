export class User {
  userId?: string;
  username?: string;
  name?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email?: string;
  logo?: string;
  status?: string;
  phone?: string;
  user?: any;
}

export class _User {
 
_id?: string;
username?: string;
email?: string;
password?: string;
emailVerifiedAt?: string;
logo?: string;
image?: string;
bankName?: string;
referCount?: string;
totalOrder?: number;
url?: string;
phone?: string;
country?: string;
user_type?: string;//will be changed by role
status?: string;
city?: string;
street?: string;
building?: string;
company_registration?: string;
registrationDate?: string;
updatedAt?: string;
role?: any;// the type will be Role
}


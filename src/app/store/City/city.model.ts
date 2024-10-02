export interface CityListModel {
    
     id?: string;
     name?: string;
     nameTrans?: string;
     country_id?: string;
     area_id?: string;
     latitude?: string;
     longitude?: string;
     status? : string;
     updatedAt? :  string;
     createdAt?: string;

}

export enum Status {

     active = 2,
     inactive = 3,
     deleted = 4
  
    }
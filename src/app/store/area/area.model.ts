export interface AreaListModel {
    
     id?: string;
     name?: string;
     nameTrans?: string;
     country_id?: string;
     status? : string;
     updatedAt? :  string;
     createdAt?: string;

}
export enum Status {

   pending = 1,
   active = 2,
   inactive = 3,
   deleted = 4

  }

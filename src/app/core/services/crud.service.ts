import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })

export class CrudService {
    constructor(private http: HttpClient) { }

    
    
    /***
     * Get 
     */
   
    fetchData(url: any): Observable<any[]> {

        return this.http.get<any[]>(`${environment.baseURL}${url}?page=1&limit=10`);
    }
    
    addData(url: any, newData: any): Observable<any[]> {
        return this.http.post<any[]>(`${environment.baseURL}${url}`, newData);
    }

    updateData(url: any, updatedData: any): Observable<any[]> {
        return this.http.put<any[]>(url, updatedData);
    }

    deleteData(url: any): Observable<void> {
        return this.http.delete<void>(url);
    }
    disableData(url: string, userId: string): Observable<string> {
        return this.http.post<string>(url, { userId },{ responseType: 'text' as 'json' })
        .pipe(
          tap(response => console.log('Service response:', response)), // Log service response
          catchError(error => {
            console.error('Service error:', error); // Log error details
            return of(''); // Return a default empty string or a specific error message
          })
        );
    }
      
}

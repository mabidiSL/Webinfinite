import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { addEmployeelist, addEmployeelistFailure, addEmployeelistSuccess, deleteEmployeelist, deleteEmployeelistFailure, deleteEmployeelistSuccess, fetchEmployeelistData, fetchEmployeelistFail, fetchEmployeelistSuccess, updateEmployeelist, updateEmployeelistFailure, updateEmployeelistSuccess, updateEmployeeStatus, updateEmployeeStatusFailure, updateEmployeeStatusSuccess } from './employee.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmployeeslistEffects {
  

    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchEmployeelistData),
            tap(() => console.log('Request to fetch Employee list has been launched')), // Add console log here
            mergeMap(() =>
                this.CrudService.fetchData('/Employees').pipe(
                    tap((response : any) => console.log('Fetched data:', response.result.data)), 
                    map((response) => fetchEmployeelistSuccess({ EmployeeListdata : response.result.data })),
                    catchError((error) =>
                        of(fetchEmployeelistFail({ error }))
                    )
                )
            ),
        ),
    );
  
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployeelist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/Employees', newData).pipe(
                    map((newData) => {
                        this.toastr.success('The new Employee has been added successfully.');
                        // Dispatch the action to fetch the updated Employee list after adding a new Employee
                        return addEmployeelistSuccess({newData});
                      }),
                    catchError((error) => of(addEmployeelistFailure({ error })))
                )
            )
        )
    );
    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployeeStatus),
            mergeMap(({ employeeId, status }) =>
                this.CrudService.addData('/api/update-status', { employeeId, status }).pipe(
                    map((updatedData) => {
                        this.toastr.success('The Employee has been updated successfully.');
                        return updateEmployeeStatusSuccess({ updatedData })}),
                    catchError((error) => of(updateEmployeeStatusFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateEmployeelist),
          mergeMap(({ updatedData }) =>
            this.CrudService.updateData(`/api/Employee/${updatedData.id}`, updatedData).pipe(
              map(() => {
                this.toastr.success('The Employee has been updated successfully.');
                return updateEmployeelistSuccess({ updatedData }); // Make sure to return the action
              }),
              catchError((error) => of(updateEmployeelistFailure({ error }))) // Catch errors and return the failure action
            )
          )
        )
      );
      


   deleteData$ = createEffect(() =>
    
        this.actions$.pipe(
            ofType(deleteEmployeelist),
            tap(action => console.log('Delete action received:', action)),
            mergeMap(({ employeeId }) =>
                    this.CrudService.disableData('/api/disable', employeeId).pipe(
                        map((response: string) => {
                            // If response contains a success message or status, you might want to check it here
                            console.log('API response:', response);
                            return deleteEmployeelistSuccess({ employeeId });
                          }),
                    catchError((error) => {return  of(deleteEmployeelistFailure({ error }))})
                )
            )
        )
    );
    
    
    constructor(
        private actions$: Actions,
        private CrudService: CrudService,
        public toastr:ToastrService
    ) { }

}
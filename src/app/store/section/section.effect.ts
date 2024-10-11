import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import {
    fetchSectionlistData, fetchSectionlistSuccess,
    fetchSectionlistFail,
    addSectionlistFailure,
    addSectionlistSuccess,
    addSectionlist,
    updateSectionlistFailure,
    updateSectionlistSuccess,
    updateSectionlist,
    deleteSectionlistFailure,
    deleteSectionlistSuccess,
    deleteSectionlist,
    updateSectionStatus,
    updateSectionStatusSuccess,
    updateSectionStatusFailure,
    getSectionById,
    getSectionByIdSuccess
} from './section.action';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSectionById } from './section-selector';

@Injectable()
export class SectionEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchSectionlistData),
            tap(() => console.log('Request to fetch Section list has been launched')), // Add console log here
            mergeMap(({ page, itemsPerPage }) =>
                this.CrudService.fetchData('/sections',{ limit: itemsPerPage, page: page}).pipe(
                    tap((response : any) => console.log('Fetched data:', response.result.data)), 
                    map((response) => fetchSectionlistSuccess({ SectionListdata: response.result.data })),
                    catchError((error) =>
                        of(fetchSectionlistFail({ error }))
                    )
                )
            ),
        ),
    );
  
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addSectionlist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/sections', newData).pipe(
                    map((response) => {
                        this.toastr.success('The new Section has been added successfully.');
                        this.router.navigate(['/private/sections']);
                        // Dispatch the action to fetch the updated Section list after adding a new Section
                        return addSectionlistSuccess({newData: response});
                      }),
                    catchError((error) => of(addSectionlistFailure({ error })))
                )
            )
        )
    );
    getSectionById$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getSectionById),
          tap(action => console.log('get Section action received:', action)),
          mergeMap(({ SectionId }) => {
            // Use the selector to get the Section from the Section
            return this.store.select(selectSectionById(SectionId)).pipe(
              map(Section => {
                if (Section) {
                  console.log('Section',Section);
                  // Dispatch success action with the Section data
                  return getSectionByIdSuccess({ Section: Section });
                } else {
                  console.log('Section NULL');
                  // Handle the case where the Section is not found, if needed
                  // For example, you might want to dispatch a failure action or return an empty Section
                  return getSectionByIdSuccess({ Section: null }); // or handle it differently
                }
              })
            );
          })
        )
      );
    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSectionStatus),
            mergeMap(({ userId, status }) =>
                this.CrudService.addData('/api/update-status', { userId, status }).pipe(
                    map((updatedData) => {
                        this.toastr.success('The Section has been updated successfully.');
                        return updateSectionStatusSuccess({ updatedData })}),
                    catchError((error) => of(updateSectionStatusFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateSectionlist),
            mergeMap(({ updatedData }) => {
               
                return this.CrudService.updateData(`/sections/${updatedData.id}`, updatedData).pipe(
                    map((response : any) => 
                    {
                        console.log('Updated Data:', updatedData);
                        this.toastr.success('The Section has been updated successfully.');
                        this.router.navigate(['/private/sections']); 
                        return updateSectionlistSuccess({ updatedData : response.result})
                    }),
                    catchError((error) => of(updateSectionlistFailure({ error })))
                );
            })
        )
    );


   deleteData$ = createEffect(() =>
    
        this.actions$.pipe(
            ofType(deleteSectionlist),
            tap(action => console.log('Delete action received:', action)),
            mergeMap(({ SectionId }) =>
                    this.CrudService.deleteData(`/sections/${SectionId}`).pipe(
                        map((response: string) => {
                            // If response contains a success message or status, you might want to check it here
                            console.log('API response:', response);
                            return deleteSectionlistSuccess({ SectionId });
                          }),
                    catchError((error) => {return  of(deleteSectionlistFailure({ error }))})
                )
            )
        )
    );
    
    
    constructor(
        private actions$: Actions,
        private CrudService: CrudService,
        public toastr:ToastrService,
        private router: Router,
        private store: Store
    ) { 
        console.log('i am in Section effect');
    }

}
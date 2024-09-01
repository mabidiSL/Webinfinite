import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import {
    fetchMerchantlistData, fetchMerchantlistSuccess,
    fetchMerchantlistFail,
    addMerchantlistFailure,
    addMerchantlistSuccess,
    addMerchantlist,
    updateMerchantlistFailure,
    updateMerchantlistSuccess,
    updateMerchantlist,
    deleteMerchantlistFailure,
    deleteMerchantlistSuccess,
    deleteMerchantlist,
    updateMerchantStatus,
    updateMerchantStatusSuccess,
    updateMerchantStatusFailure
} from './merchantlist1.action';

@Injectable()
export class MerchantslistEffects1 {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchMerchantlistData),
            tap(() => console.log('Request to fetch merchant list has been launched')), // Add console log here
            mergeMap(() =>
                this.CrudService.fetchData('/api/users/with-user-type').pipe(
                    tap(data => console.log('Fetched data:', data)), 
                    map((MerchantListdata) => fetchMerchantlistSuccess({ MerchantListdata })),
                    catchError((error) =>
                        of(fetchMerchantlistFail({ error }))
                    )
                )
            ),
        ),
    );
  
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addMerchantlist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/api/admin/add-user', newData).pipe(
                    map(() => {
                        // Dispatch the action to fetch the updated merchant list after adding a new merchant
                        return fetchMerchantlistData();
                      }),
                    catchError((error) => of(addMerchantlistFailure({ error })))
                )
            )
        )
    );
    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateMerchantStatus),
            mergeMap(({ userId, status }) =>
                this.CrudService.addData('/api/update-status', { userId, status }).pipe(
                    map((updatedData) => updateMerchantStatusSuccess({ updatedData })),
                    catchError((error) => of(updateMerchantStatusFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateMerchantlist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/Merchantlist', updatedData).pipe(
                    map(() => updateMerchantlistSuccess({ updatedData })),
                    catchError((error) => of(updateMerchantlistFailure({ error })))
                )
            )
        )
    );


    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteMerchantlist),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/Merchantlist').pipe(
                    map(() => deleteMerchantlistSuccess({ id })),
                    catchError((error) => of(deleteMerchantlistFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }

}
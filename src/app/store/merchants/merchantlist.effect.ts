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
    fetchMerchantApprovallistData,
    fetchMerchantpprovallistSuccess,
    fetchMerchantpprovallistFail,
    updateMerchantStatus,
    updateMerchantStatusSuccess,
    updateMerchantStatusFailure
} from './merchantlist.action';

@Injectable()
export class MerchantslistEffects {
    // fetchData$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fetchMerchantlistData),
    //         mergeMap(() =>
    //             this.CrudService.fetchData('/merchants').pipe(
    //                 map((MerchantListdata) => fetchMerchantlistSuccess({ MerchantListdata })),
    //                 catchError((error) =>
    //                     of(fetchMerchantlistFail({ error }))
    //                 )
    //             )
    //         ),
    //     ),
    // );
    fetchApprovalData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchMerchantApprovallistData),
            tap(() => console.log('Request to fetch merchant approval list has been launched')), // Add console log here
            mergeMap(() =>
                this.CrudService.fetchData('/api/users/not-approved').pipe(
                    map((MerchantpprovalListdata) => fetchMerchantpprovallistSuccess({ MerchantpprovalListdata })),
                    catchError((error) =>
                        of(fetchMerchantpprovallistFail({ error }))
                    )
                )
            ),
        ),
    );
    // addData$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(addMerchantlist),
    //         mergeMap(({ newData }) =>
    //             this.CrudService.addData('/app/Merchantlist', newData).pipe(
    //                 map(() => addMerchantlistSuccess({ newData })),
    //                 catchError((error) => of(addMerchantlistFailure({ error })))
    //             )
    //         )
    //     )
    // );
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
            mergeMap(({ userId }) =>
                this.CrudService.disableData('/api/disable', userId).pipe(
                    map(() => deleteMerchantlistSuccess({ userId })),
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
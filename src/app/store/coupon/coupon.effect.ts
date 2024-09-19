import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import {
    fetchCouponlistData, fetchCouponlistSuccess,
    fetchCouponlistFail,
    addCouponlistFailure,
    addCouponlistSuccess,
    addCouponlist,
    updateCouponlistFailure,
    updateCouponlistSuccess,
    updateCouponlist,
    deleteCouponlistFailure,
    deleteCouponlistSuccess,
    deleteCouponlist,
    updateCouponStatus,
    updateCouponStatusSuccess,
    updateCouponStatusFailure
} from './coupon.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CouponslistEffects {
    path : string = '/assets/data/coupon.json';

    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCouponlistData),
            tap(() => console.log('Request to fetch Coupon list has been launched')), // Add console log here
            mergeMap(() =>
                this.CrudService.fetchData(this.path).pipe(
                    tap((data : any) => console.log('Fetched data:', data.couponData)), 
                    map((data) => fetchCouponlistSuccess({ CouponListdata : data.couponData })),
                    catchError((error) =>
                        of(fetchCouponlistFail({ error }))
                    )
                )
            ),
        ),
    );
  
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCouponlist),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/api/admin/add-coupon', newData).pipe(
                    map((newData) => {
                        this.toastr.success('The new Coupon has been added successfully.');
                        // Dispatch the action to fetch the updated Coupon list after adding a new Coupon
                        return addCouponlistSuccess({newData});
                      }),
                    catchError((error) => of(addCouponlistFailure({ error })))
                )
            )
        )
    );
    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCouponStatus),
            mergeMap(({ couponId, status }) =>
                this.CrudService.addData('/api/update-status', { couponId, status }).pipe(
                    map((updatedData) => {
                        this.toastr.success('The Coupon has been updated successfully.');
                        return updateCouponStatusSuccess({ updatedData })}),
                    catchError((error) => of(updateCouponStatusFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCouponlist),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData(`/api/coupon/${updatedData.id}`, updatedData).pipe(
                    map(() => updateCouponlistSuccess({ updatedData })),
                    catchError((error) => of(updateCouponlistFailure({ error })))
                )
            )
        )
    );


   deleteData$ = createEffect(() =>
    
        this.actions$.pipe(
            ofType(deleteCouponlist),
            tap(action => console.log('Delete action received:', action)),
            mergeMap(({ couponId }) =>
                    this.CrudService.disableData('/api/disable', couponId).pipe(
                        map((response: string) => {
                            // If response contains a success message or status, you might want to check it here
                            console.log('API response:', response);
                            return deleteCouponlistSuccess({ couponId });
                          }),
                    catchError((error) => {return  of(deleteCouponlistFailure({ error }))})
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
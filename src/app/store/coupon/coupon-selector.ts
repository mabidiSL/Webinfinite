// src/app/Couponlist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  CouponlistState } from './coupon.reducer';

export const selectDataState = createFeatureSelector<CouponlistState>('CouponList');

export const selectData = createSelector(
  selectDataState,
  (state: CouponlistState) => state?.CouponListdata || []
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state: CouponlistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: CouponlistState) => state?.error || null
);

// src/app/merchantlist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  MerchantlistState } from './merchantlist1.reducer';

export const selectDataState = createFeatureSelector<MerchantlistState>('MerchantList');

export const selectData = createSelector(
  selectDataState,
  (state: MerchantlistState) => state?.MerchantListdata || []
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state: MerchantlistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: MerchantlistState) => state?.error || null
);

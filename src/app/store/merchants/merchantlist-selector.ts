// src/app/merchantlist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MerchantApprovallistState } from './merchantlist.reducer';

export const selectDataState = createFeatureSelector<MerchantApprovallistState>('MerchantApprovalList');

export const selectData = createSelector(
  selectDataState,
  (state: MerchantApprovallistState) => state?.MerchantApprovalListdata || []
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state: MerchantApprovallistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: MerchantApprovallistState) => state?.error || null
);

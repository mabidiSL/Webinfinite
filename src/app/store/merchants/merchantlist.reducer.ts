// src/app/merchantlist.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { fetchMerchantApprovallistData, fetchMerchantpprovallistSuccess, fetchMerchantlistFail, updateMerchantStatusSuccess } from './merchantlist.action';

export interface MerchantApprovallistState {
  MerchantApprovalListdata: any[];
  loading: boolean;
  error: any;
}

export const initialState: MerchantApprovallistState = {
  MerchantApprovalListdata: [],
  loading: false,
  error: null,
};

export const MerchantApprovalListReducer = createReducer(
  initialState,
  on(fetchMerchantApprovallistData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fetchMerchantpprovallistSuccess, (state, { MerchantpprovalListdata }) => ({
    ...state,
    MerchantApprovalListdata: MerchantpprovalListdata,
    loading: false
  })),
  on(fetchMerchantlistFail, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(updateMerchantStatusSuccess, (state, { updatedData }) => {
    return {
      ...state,
      merchantApprovalList: state.MerchantApprovalListdata.map(item =>
        item._id === updatedData.userId ? { ...item, status: updatedData.status } : item
      )
    };
  })
);

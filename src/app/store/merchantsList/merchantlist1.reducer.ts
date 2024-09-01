// src/app/merchantlist.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {  fetchMerchantlistData, fetchMerchantlistFail, fetchMerchantlistSuccess, updateMerchantStatusSuccess } from './merchantlist1.action';

export interface MerchantlistState {
  MerchantListdata: any[];
  loading: boolean;
  error: any;
}

export const initialState: MerchantlistState = {
  MerchantListdata: [],
  loading: false,
  error: null,
};

export const MerchantListReducer = createReducer(
  initialState,
  on(fetchMerchantlistData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fetchMerchantlistSuccess, (state, { MerchantListdata }) => ({
    ...state,
    MerchantListdata: MerchantListdata,
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
      merchantList: state.MerchantListdata.map(item =>
        item._id === updatedData.userId ? { ...item, status: updatedData.status } : item
      )
    };
  })
);

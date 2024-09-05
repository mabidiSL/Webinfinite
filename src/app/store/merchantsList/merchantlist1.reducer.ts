// src/app/merchantlist.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {  deleteMerchantlistFailure, deleteMerchantlistSuccess, fetchMerchantlistData, fetchMerchantlistFail, fetchMerchantlistSuccess, updateMerchantStatusSuccess } from './merchantlist1.action';

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
  }),
  // Handle the success of deleting a merchant
  on(deleteMerchantlistSuccess, (state, { userId }) => {
    console.log('Deleting merchant with ID:', userId);
    console.log('MerchantListdata before deletion:', state.MerchantListdata);
    const updatedMerchantList = state.MerchantListdata.filter(merchant => merchant._id !== userId);
    console.log('MerchantListdata after deletion:', updatedMerchantList);
    return { 
    ...state,
    MerchantListdata: updatedMerchantList};
  }),
  // Handle failure of deleting a merchant
  on(deleteMerchantlistFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

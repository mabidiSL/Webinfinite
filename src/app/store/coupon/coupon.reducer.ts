// src/app/Couponlist.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {  addCouponlistSuccess, deleteCouponlistFailure, deleteCouponlistSuccess, fetchCouponlistData, fetchCouponlistFail, fetchCouponlistSuccess, updateCouponlistSuccess, updateCouponStatusSuccess } from './coupon.action';

export interface CouponlistState {
  CouponListdata: any[];
  loading: boolean;
  error: any;
}

export const initialState: CouponlistState = {
  CouponListdata: [],
  loading: false,
  error: null,
};

export const CouponListReducer = createReducer(
  initialState,
  on(fetchCouponlistData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fetchCouponlistSuccess, (state, { CouponListdata }) => ({
    ...state,
    CouponListdata: CouponListdata,
    
    loading: false
  })),
  on(fetchCouponlistFail, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  //Handle adding Coupon success
  on(addCouponlistSuccess, (state, { newData }) => ({
    ...state,
    CouponListdata: [...state.CouponListdata, newData],
    loading: false
  })),
  
  // Handle updating Coupon list
  on(updateCouponStatusSuccess, (state, { updatedData }) => {
    return {
      ...state,
      CouponListdata: state.CouponListdata.map(item =>
        item.id === updatedData.couponId ? { ...item, status: updatedData.status } : item
      )
    };
  }),
// Handle updating Coupon status
  on(updateCouponlistSuccess, (state, { updatedData }) => {
   const CouponListUpdated = state.CouponListdata.map(item => item.id === updatedData.id ? updatedData : item );
   console.log('CouponListdata after update:', CouponListUpdated);
   return {
      ...state,
      CouponListdata: CouponListUpdated
    };
  }),
  // Handle the success of deleting a Coupon
  on(deleteCouponlistSuccess, (state, { couponId }) => {
    console.log('Deleting Coupon with ID:', couponId);
    console.log('CouponListdata before deletion:', state.CouponListdata);
    const updatedCouponList = state.CouponListdata.filter(Coupon => Coupon.id !== couponId);
    console.log('CouponListdata after deletion:', updatedCouponList);
    return { 
    ...state,
    CouponListdata: updatedCouponList};
  }),
  // Handle failure of deleting a Coupon
  on(deleteCouponlistFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

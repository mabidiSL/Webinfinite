// src/app/Countrylist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/Country';
import {  CountrylistState } from './Country.reducer';

export const selectDataState = createFeatureSelector<CountrylistState>('CountryList');

export const selectData = createSelector(
  selectDataState,
  (state: CountrylistState) => state?.CountryListdata || []
);
export const selectCountryById = (CountryId: string) =>createSelector(
  selectDataState,
  (state: CountrylistState) =>  state?.CountryListdata.find(Country => Country.id === +CountryId)
  );
export const selectDataLoading = createSelector(
  selectDataState,
  (state: CountrylistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: CountrylistState) => state?.error || null
);

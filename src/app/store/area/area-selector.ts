// src/app/Arealist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArealistState } from './area.reducer';

export const selectDataState = createFeatureSelector<ArealistState>('AreaList');

export const selectData = createSelector(
  selectDataState,
  (state: ArealistState) => state?.AreaListdata || []
);
export const selectAreaById = (AreaId: string) =>createSelector(
  selectDataState,
  (state: ArealistState) =>  state?.AreaListdata.find(Area => Area.id === +AreaId)
  );
export const selectDataLoading = createSelector(
  selectDataState,
  (state: ArealistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: ArealistState) => state?.error || null
);

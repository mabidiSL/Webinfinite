// src/app/Sectionlist.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionlistState } from './section.reducer';

export const selectDataState = createFeatureSelector<SectionlistState>('SectionList');

export const selectDataSection = createSelector(
  selectDataState,
  (state: SectionlistState) => state?.SectionListdata || []
);
export const selectSectionById = (SectionId: string) =>createSelector(
  selectDataState,
  (state: SectionlistState) =>  state?.SectionListdata.find(Section => Section.id === +SectionId)
  );
export const selectDataLoading = createSelector(
  selectDataState,
  (state: SectionlistState) => state?.loading || false
);

export const selectDataError = createSelector(
  selectDataState,
  (state: SectionlistState) => state?.error || null
);

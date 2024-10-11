import { createAction, props } from '@ngrx/store';
import { SectionListModel } from './section.model';

// fetch all list
export const fetchSectionlistData = createAction('[Data] fetch Sectionlist',props<{ page: number; itemsPerPage: number, status: string }>());
export const fetchSectionlistSuccess = createAction('[Data] fetch Sectionlist success', props<{ SectionListdata: SectionListModel[] }>())
export const fetchSectionlistFail = createAction('[Data fetch Sectionlist failed]', props<{ error: string }>())


// Update Data
export const updateSectionStatus = createAction(
    '[Data] Update Section status',
    props<{ userId: string, status: string }>()
    //props<{ updatedData: SectionApprovalListModel }>()
);
export const updateSectionStatusSuccess = createAction(
    '[Data] Update Section Status Success',
    props<{ updatedData: any }>()
);
export const updateSectionStatusFailure = createAction(
    '[Data] Update Section Status Failure',
    props<{ error: string }>()
);

// Add Data
export const addSectionlist = createAction('[Data] Add Sectionlist',  props<{ newData: SectionListModel }>());
export const addSectionlistSuccess = createAction('[Data] Add Sectionlist Success', props<{ newData: any }>());
export const addSectionlistFailure = createAction('[Data] Add Sectionlist Failure', props<{ error: string }>());
//get Section by ID
export const getSectionById = createAction('[Data] get Section', props<{ SectionId: string }>());
export const getSectionByIdSuccess = createAction('[Data] get Section success', props<{ Section: any }>());

// Update Data
export const updateSectionlist = createAction(
    '[Data] Update Sectionlist',
    props<{ updatedData: SectionListModel }>()
);
export const updateSectionlistSuccess = createAction(
    '[Data] Update Sectionlist Success',
    props<{ updatedData: SectionListModel }>()
);
export const updateSectionlistFailure = createAction(
    '[Data] Update Sectionlist Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteSectionlist = createAction(
    '[Data] Delete Sectionlist',
    props<{ SectionId: string }>()
);
export const deleteSectionlistSuccess = createAction(
    '[Data] Delete Sectionlist Success',
    props<{ SectionId: string }>()
);
export const deleteSectionlistFailure = createAction(
    '[Data] Delete Sectionlist Failure',
    props<{ error: string }>()
);
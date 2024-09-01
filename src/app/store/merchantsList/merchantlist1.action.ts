import { createAction, props } from '@ngrx/store';
import { MerchantListModel } from './merchantlist1.model';

// fetch all list
export const fetchMerchantlistData = createAction('[Data] fetch Merchantlist');
export const fetchMerchantlistSuccess = createAction('[Data] fetch Merchantlist success', props<{ MerchantListdata: MerchantListModel[] }>())
export const fetchMerchantlistFail = createAction('[Data fetch Merchantlist failed]', props<{ error: string }>())


// Update Data
export const updateMerchantStatus = createAction(
    '[Data] Update Merchant status',
    props<{ userId: string, status: string }>()
    //props<{ updatedData: MerchantApprovalListModel }>()
);
export const updateMerchantStatusSuccess = createAction(
    '[Data] Update Merchant Status Success',
    props<{ updatedData: any }>()
);
export const updateMerchantStatusFailure = createAction(
    '[Data] Update Merchant Status Failure',
    props<{ error: string }>()
);

// Add Data
export const addMerchantlist = createAction('[Data] Add Merchantlist',  props<{ newData: MerchantListModel }>());
export const addMerchantlistSuccess = createAction('[Data] Add Merchantlist Success', props<{ newData: any }>());
export const addMerchantlistFailure = createAction('[Data] Add Merchantlist Failure', props<{ error: string }>());

// Update Data
export const updateMerchantlist = createAction(
    '[Data] Update Merchantlist',
    props<{ updatedData: MerchantListModel }>()
);
export const updateMerchantlistSuccess = createAction(
    '[Data] Update Merchantlist Success',
    props<{ updatedData: MerchantListModel }>()
);
export const updateMerchantlistFailure = createAction(
    '[Data] Update Merchantlist Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteMerchantlist = createAction(
    '[Data] Delete Merchantlist',
    props<{ id: string }>()
);
export const deleteMerchantlistSuccess = createAction(
    '[Data] Delete Merchantlist Success',
    props<{ id: string }>()
);
export const deleteMerchantlistFailure = createAction(
    '[Data] Delete Merchantlist Failure',
    props<{ error: string }>()
);
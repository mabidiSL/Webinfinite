export interface NotificationListModel {
    
        id?: string;
        userId?: string;
        payload?:{ cronExpression?: string; title?: string; description?: string; }
        }
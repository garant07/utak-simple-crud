import { RCode } from '../types/code';

export const notifierDefaultState = {
    notifications: [],
};

export const notifier = (state = notifierDefaultState, action: any) => {
    switch (action.type) {
        case RCode.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case RCode.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map((notification: any) =>
                    action.dismissAll || notification.key === action.key
                        ? { ...notification, dismissed: true }
                        : { ...notification },
                ),
            };

        case RCode.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification: any) => notification.key !== action.key,
                ),
            };

        default:
            return state;
    }
};

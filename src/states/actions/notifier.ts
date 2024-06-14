import { OptionsObject } from 'notistack';
import { RCode } from '../types/code';

export const enqueueSnackbar = (notification: { message: string; options: OptionsObject }) => {
    const key = notification.options && notification.options.key;

    return {
        type: RCode.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key: any) => ({
    type: RCode.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = (key: any) => ({
    type: RCode.REMOVE_SNACKBAR,
    key,
});
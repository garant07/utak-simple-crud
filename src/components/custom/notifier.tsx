import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeSnackbar } from '../../states/actions/notifier';
import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useEffect } from 'react';

let displayed: any = [];

const Notifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifier.notifications || []
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: any) => {
    displayed = [...displayed.filter((key: any) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }: any) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)}>
              <Close />
            </Button>
          ),
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;

import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { Typography, IconButton } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SnackbarSuccessComponent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent
        ref={ref}
        style={{
          alignItems: 'center',
          height: '30px',
          boxShadow: '1px 1px 9px grey',
          padding: '15px',
          borderRadius: '11px',
        }}
      >
        <CheckCircleRoundedIcon sx={{ color: 'green', marginRight: '7px' }} />
        <Typography sx={{ marginInline: '10px' }}>{props.message}</Typography>
        <IconButton size="small" onClick={handleDismiss}>
          <CloseRoundedIcon />
        </IconButton>
      </SnackbarContent>
    );
  }
);

export default SnackbarSuccessComponent;

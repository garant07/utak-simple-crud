import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { Typography, IconButton, Card, CardContent, Box } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SnackbarSuccessComponent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Card sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <CheckCircleRoundedIcon sx={{ color: 'green' }} />
              <Typography>{props.message}</Typography>
              <IconButton size="small" onClick={handleDismiss}>
                <CloseRoundedIcon />
              </IconButton>
            </CardContent>
          </Box>
        </Card>
      </SnackbarContent>
    );
  }
);

export default SnackbarSuccessComponent;

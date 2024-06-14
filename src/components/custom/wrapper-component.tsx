import { ReactNode, FC } from 'react';
import { Box } from '@mui/material';

type Props = {
    children?: ReactNode;
};

const WrapperComponent: FC<Props> = ({ children }) => {

    return (
        <Box
            component="main"
            sx={{
                marginTop: '105px',
                px: { xs: 2, md: 25 },
            }}
        >
            {children}
        </Box>
    );
};

export default WrapperComponent;

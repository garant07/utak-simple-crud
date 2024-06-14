import { Fragment } from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

interface skeleton {
    rows: number;
    column: number;
}

export const SkeletonTable = (props: skeleton) => {
    return (
        <Fragment>
            {Array.from(Array(props.rows), (_value: any, key: any) => {
                return (
                    <TableRow  key={key}>
                        {Array.from(Array(props.column), (_value: any, key1: any) => {
                            return (
                                <TableCell key={key1}>
                                    <Skeleton variant="rectangular" height={20} />
                                </TableCell>
                            );
                        })}
                    </TableRow >
                );
            })}
        </Fragment>
    );
};

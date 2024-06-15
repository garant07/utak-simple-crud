import { Fragment } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import WrapperComponent from '../custom/wrapper-component';
import { useProduct } from '../../hooks/useProduct';
import { SkeletonTable } from '../custom/skeleton-table';
import CreateMerchantComponent from './create-merchant';
import UpdateMerchantComponent from './update-merchant';

const ProductComponent = () => {
  const { ...hooks } = useProduct();

  return (
    <Fragment>
      {hooks.open.create ? (
        <CreateMerchantComponent open={hooks.open} setOpen={hooks.setOpen} />
      ) : null}
      {hooks.open.update ? (
        <UpdateMerchantComponent
          open={hooks.open}
          setOpen={hooks.setOpen}
          value={hooks.value}
        />
      ) : null}
      <WrapperComponent>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '35px',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="h4">Product</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {hooks.products?.data?.length !== undefined && (
                <Button
                  variant="contained"
                  startIcon={<AddCircleRoundedIcon />}
                  onClick={() => {
                    hooks.setOpen({
                      ...hooks.open,
                      create: true,
                    });
                  }}
                >
                  Add Product
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ marginTop: '15px' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="right">Stock</TableCell>
                  </TableRow>
                </TableHead>
                {hooks.products?.status === 'done' ? (
                  <Fragment>
                    {hooks.products?.data?.length === undefined ? (
                      <TableBody sx={{ textAlign: 'center', height: '200px' }}>
                        <TableRow>
                          <TableCell align="center" colSpan={6}>
                            <PostAddRoundedIcon sx={{ fontSize: 60 }} />
                            <Typography variant="h5">
                              Add your first Product
                            </Typography>
                            <Typography marginInline="340px">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam.
                            </Typography>
                            <Button
                              sx={{ marginTop: '15px' }}
                              variant="contained"
                              startIcon={<AddCircleRoundedIcon />}
                              onClick={() => {
                                hooks.setOpen({
                                  ...hooks.open,
                                  create: true,
                                });
                              }}
                            >
                              Add Product
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      hooks.products?.data.map((row: any) => (
                        <TableBody>
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Link
                                onClick={() => {
                                  hooks.setOpen({
                                    ...hooks.open,
                                    update: true,
                                  });
                                  hooks.setValue(row);
                                }}
                              >
                                {row.name}
                              </Link>
                            </TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                            <TableCell align="right">{row.stock}</TableCell>
                          </TableRow>
                        </TableBody>
                      ))
                    )}
                  </Fragment>
                ) : (
                  <SkeletonTable rows={4} column={5} />
                )}
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </WrapperComponent>
    </Fragment>
  );
};

export default ProductComponent;

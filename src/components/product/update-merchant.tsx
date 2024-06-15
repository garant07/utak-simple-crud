import { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Tab,
  Tabs,
  Box,
  IconButton,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useUpdateProduct } from '../../hooks/useUpdateProduct';
import { Controller } from 'react-hook-form';
import { NumericFormatAdapter } from '../custom/numeric-format';
import CustomTabPanel from '../custom/tabpanel-component';

export interface IProduct {
  open: any;
  setOpen: any;
  value?: any;
}

const UpdateProductComponent = (props: IProduct) => {
  const { ...hooks } = useUpdateProduct(props);

  return (
    <Fragment>
      <Dialog
        open={props.open?.update}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: '80%', height: 485 } }}
      >
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <form onSubmit={hooks.handleSubmit(hooks.handleFormSubmit)}>
            <Tabs
              value={hooks.valueTab}
              onChange={hooks.handleTabChange}
              sx={{ width: '550px', marginTop: '-70px' }}
            >
              <Tab label="General" />
              <Tab label="Variants" />
            </Tabs>
            <CustomTabPanel value={hooks.valueTab} index={0}>
              <Typography>Name:</Typography>
              <Controller
                name="name"
                control={hooks.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    name="name"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginBottom: '10px',
                    }}
                  />
                )}
              />
              <Typography>Category:</Typography>
              <Select
                size="small"
                name="category"
                autoFocus
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '10px',
                }}
                value={hooks.category}
                onChange={(evt) => hooks.setCategory(evt.target.value)}
              >
                <MenuItem value={'Alpha'}>Alpha</MenuItem>
                <MenuItem value={'Beta'}>Beta</MenuItem>
                <MenuItem value={'Gamma'}>Gamma</MenuItem>
              </Select>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Price:</Typography>
                  <TextField
                    value={hooks.price}
                    onChange={(evt) => hooks.setPrice(evt.target.value)}
                    size="small"
                    name="price"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginBottom: '10px',
                    }}
                    InputProps={{
                      inputComponent: NumericFormatAdapter as any,
                      startAdornment: (
                        <InputAdornment position="start">₱</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>Cost:</Typography>
                  <TextField
                    value={hooks.cost}
                    onChange={(evt) => hooks.setCost(evt.target.value)}
                    size="small"
                    name="cost"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginBottom: '10px',
                    }}
                    InputProps={{
                      inputComponent: NumericFormatAdapter as any,
                      startAdornment: (
                        <InputAdornment position="start">₱</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>Stock:</Typography>
                  <Controller
                    name="stock"
                    control={hooks.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        name="stock"
                        type="number"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        sx={{
                          marginBottom: '10px',
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={hooks.valueTab} index={1}>
              {hooks.variants?.map((data: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    borderRadius: '12px',
                    border: 'solid 1px gray',
                    padding: 2,
                    marginTop: '14px',
                  }}
                >
                  <Box>
                    <Typography>Option name:</Typography>
                    <TextField
                      size="small"
                      autoFocus
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginBottom: '10px',
                      }}
                      value={data.optionName}
                      onChange={(evt) =>
                        hooks.handleOnChangeOptionName(idx, evt)
                      }
                    />
                    <Typography>Option values:</Typography>
                    {data?.optionValues.map((optionEl: any, idx2: number) => (
                      <Fragment key={idx2}>
                        <Box
                          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                        >
                          <TextField
                            size="small"
                            autoFocus
                            fullWidth
                            variant="outlined"
                            sx={{
                              marginBottom: '10px',
                            }}
                            value={optionEl.value}
                            onChange={(evt) =>
                              hooks.handleOnChangeOptionValue(idx, idx2, evt)
                            }
                          />
                          <IconButton
                            sx={{ marginBottom: '10px', color: '#fc0324' }}
                            onClick={(evt) =>
                              hooks.handleDeleteOption(idx, optionEl.id, evt)
                            }
                          >
                            <DeleteRoundedIcon />
                          </IconButton>
                        </Box>
                      </Fragment>
                    ))}
                    <Button
                      startIcon={<AddCircleRoundedIcon />}
                      onClick={(evt) => hooks.handleAddOption(idx, evt)}
                    >
                      Add options
                    </Button>
                  </Box>
                </Box>
              ))}
              <Button onClick={hooks.handleAddVariant}>Add variants</Button>
            </CustomTabPanel>
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => props.setOpen({ ...props.open, update: false })}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UpdateProductComponent;

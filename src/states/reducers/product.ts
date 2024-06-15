import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RCode } from '../types/code';
import { appFirebase } from '../../utils/firebase';
import { getDatabase, ref, get } from 'firebase/database';

const productDefaultState = {
  status: '',
  data: {},
};

interface IParam {
  url: any;
}

export const fetchProductData = createAsyncThunk(
  'productData/fetchProductData',
  async (data: IParam, _thunkAPI) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, data.url);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val());
      const id = Object.keys(snapshot.val());

      const productsWithId = data.map((item: any, index: any) => {
        return { ...item, id: id[index] };
      });

      return productsWithId;
    }
  }
);

const productSlice = createSlice({
  name: RCode.PRODUCT,
  initialState: productDefaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'running';
      })
      .addCase(fetchProductData.fulfilled, (state, action: any) => {
        state.status = 'done';
        state.data = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action: any) => {
        state.status = 'failed';
        state.data = action.payload;
      });
  },
});

export const product = productSlice.reducer;

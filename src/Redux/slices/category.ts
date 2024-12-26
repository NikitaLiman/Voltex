import { createSlice } from '@reduxjs/toolkit';

interface categoryState {
  activeId: number;
}

const initialState: categoryState = {
  activeId: 1,
};

const CategorySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    ActiveId: (state, action) => {
      const { title, categoryId } = action.payload;
      state.activeId = categoryId;
      console.log(title);
    },
  },
});

export const { ActiveId } = CategorySlice.actions;
export default CategorySlice.reducer;

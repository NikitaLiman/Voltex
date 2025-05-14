import { createSlice } from "@reduxjs/toolkit";

interface categoryState {
  activeId: number;
}

const initialState: categoryState = {
  activeId: 1,
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    ActiveId: (state, action) => {
      const { categoryId } = action.payload;
      state.activeId = categoryId;
    },
  },
});

export const { ActiveId } = CategorySlice.actions;
export default CategorySlice.reducer;

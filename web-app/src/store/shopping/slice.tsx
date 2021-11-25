import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShoppingItem } from "../../types";

interface ShoppingListState {
  shoppingList: ShoppingItem[];
  checkedShoppingList: ShoppingItem[];
  selectedShoppingItem?: ShoppingItem;
}

const initialState: ShoppingListState = {
  checkedShoppingList: [],
  shoppingList: [],
};

const shoppingListSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setShoppingList(
      state,
      action: PayloadAction<{ shoppingList: ShoppingItem[] }>
    ) {
      const newShoppingList: ShoppingItem[] = [];
      const newCheckedShoppingList: ShoppingItem[] = [];

      for (const shoppingItem of action.payload.shoppingList) {
        if (shoppingItem.checked) {
          newCheckedShoppingList.push(shoppingItem);
        } else newShoppingList.push(shoppingItem);
      }
      state.shoppingList = newShoppingList;
      state.checkedShoppingList = newCheckedShoppingList;
    },
    addShoppingItem(
      state,
      action: PayloadAction<{ shoppingItem: ShoppingItem }>
    ) {
      state.shoppingList = [...state.shoppingList, action.payload.shoppingItem];
    },
    setSelectedShoppingItem(
      state,
      action: PayloadAction<{ shoppingItem: ShoppingItem }>
    ) {
      state.selectedShoppingItem = action.payload.shoppingItem;
    },
    deleteItem(state, action: PayloadAction<{ shoppingItem: ShoppingItem }>) {
      const { shoppingItem } = action.payload;
      if (shoppingItem.checked) {
        state.checkedShoppingList = state.checkedShoppingList.filter(
          (item) => item._id !== shoppingItem._id
        );
      } else {
        state.shoppingList = state.shoppingList.filter(
          (item) => item._id !== shoppingItem._id
        );
      }
    },
    updateShoppingItem(
      state,
      action: PayloadAction<{ shoppingItem: ShoppingItem }>
    ) {
      const { shoppingItem } = action.payload;
      let newShoppingList = [...state.shoppingList];
      let newCheckedShoppingList = [...state.checkedShoppingList];
      if (!shoppingItem.checked) {
        newCheckedShoppingList = newCheckedShoppingList.filter(
          (item) => item._id !== shoppingItem._id
        );
        newShoppingList = [...newShoppingList, shoppingItem];
      } else {
        newShoppingList = newShoppingList.filter(
          (item) => item._id !== shoppingItem._id
        );
        newCheckedShoppingList = [shoppingItem, ...newCheckedShoppingList];
      }
      state.checkedShoppingList = newCheckedShoppingList;
      state.shoppingList = newShoppingList;
    },
    patchShoppingItem(
      state,
      action: PayloadAction<{ shoppingItem: ShoppingItem }>
    ) {
      const { shoppingItem } = action.payload;
      console.log(shoppingItem);
      if (shoppingItem.checked) {
        state.checkedShoppingList = [
          ...state.checkedShoppingList.filter(
            (item) => item._id !== shoppingItem._id
          ),
          shoppingItem,
        ];
      } else {
        state.shoppingList = [
          ...state.shoppingList.filter((item) => item._id !== shoppingItem._id),
          shoppingItem,
        ];
      }
    },
  },
});

export const shoppingListActions = shoppingListSlice.actions;

export default shoppingListSlice;

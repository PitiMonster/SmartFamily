import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Budget, Expense } from "../../types";
import { addExpenseToBudget } from "./actions";

interface BudgetState {
  budgetsList: Budget[];
  selectedBudget: Budget | null;
}

const initialState: BudgetState = {
  budgetsList: [],
  selectedBudget: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetsList(state, action: PayloadAction<{ budgetsList: Budget[] }>) {
      state.budgetsList = action.payload.budgetsList;
    },
    setOneBudgetdata(state, action: PayloadAction<{ budget: Budget }>) {
      state.selectedBudget = action.payload.budget;
    },
    addBudget(state, action: PayloadAction<{ budget: Budget }>) {
      state.budgetsList = [...state.budgetsList, action.payload.budget];
    },
    updateBudget(state, action: PayloadAction<{ budget: Budget }>) {
      const { budget } = action.payload;
      const newEvents = [...state.budgetsList].filter(
        (event) => event._id !== budget._id
      );

      state.budgetsList = [...newEvents, budget];
    },
    addExpenseToBudget(state, action: PayloadAction<{ newBudget: Budget }>) {
      const { newBudget } = action.payload;
      state.selectedBudget = newBudget;
    },
  },
});

export const budgetActions = budgetSlice.actions;

export default budgetSlice;

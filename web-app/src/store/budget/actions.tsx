import api from "../../api/api";
import { AppDispatch } from "..";
import { budgetActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getFamilyBudgets = (familyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/families/${familyId}/budgets`);
      dispatch(
        budgetActions.setBudgetsList({
          budgetsList: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET BUDGETS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const getOneBudget = (familyId: string, budgetId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/families/${familyId}/budgets/${budgetId}`
      );
      dispatch(
        budgetActions.setOneBudgetdata({
          budget: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET ONE BUDGET ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const addBudget =
  (
    budgetId: string,
    name: string,
    budgetValue: string,
    renewalDate: Date,
    renewalUnit: "days" | "months" | "years",
    renewalUnitCount: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(`/families/${budgetId}/budgets/`, {
        name,
        budgetValue,
        renewalDate,
        renewalUnit,
        renewalUnitCount,
      });
      dispatch(
        budgetActions.addBudget({
          budget: response.data.data,
        })
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE BUDGET ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const updateBudget =
  (
    familyId: string,
    budgetId: string,
    name: string,
    budgetValue: string,
    renewalDate: Date,
    renewalUnit: "days" | "months" | "years",
    renewalUnitCount: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/budgets/${budgetId}`,
        {
          name,
          budgetValue,
          renewalDate,
          renewalUnit,
          renewalUnitCount,
        }
      );
      dispatch(
        budgetActions.updateBudget({
          budget: response.data.data,
        })
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("UPDATE BUDGET ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const addExpenseToBudget =
  (
    familyId: string,
    budgetId: string,
    name: string,
    price: string,
    description: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(
        `/families/${familyId}/budgets/${budgetId}`,
        {
          name,
          price,
          description,
        }
      );
      dispatch(
        budgetActions.addExpenseToBudget({
          newBudget: response.data.data,
        })
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("ADD EXPENSE TO BUDGET ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

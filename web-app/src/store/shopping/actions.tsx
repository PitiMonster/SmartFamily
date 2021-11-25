import api from "../../api/api";
import { AppDispatch } from "..";
import { shoppingListActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getFamilyShoppingItems = (familyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/families/${familyId}/shopping`);
      dispatch(
        shoppingListActions.setShoppingList({
          shoppingList: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET SHOPPING ITEMS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const addShoppingItem =
  (familyId: string, name: string, count: string, description: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(`/families/${familyId}/shopping/`, {
        name,
        count,
        description,
      });
      dispatch(
        shoppingListActions.addShoppingItem({
          shoppingItem: response.data.data,
        })
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE SHOPPING ITEM ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const deleteShoppingItem =
  (familyId: string, shoppingItemId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.delete(
        `/families/${familyId}/shopping/${shoppingItemId}`
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
      dispatch(
        shoppingListActions.deleteItem({ shoppingItem: response.data.data })
      );
    } catch (err: any) {
      console.error("DELETE SHOPPING ITEM ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
export const updateShoppingItem =
  (familyId: string, shoppingItemId: string, checkType: "check" | "uncheck") =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/shopping/${shoppingItemId}`,
        { checkType }
      );
      dispatch(
        shoppingListActions.updateShoppingItem({
          shoppingItem: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("UPDATE SHOPPING ITEM ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const patchShoppingItem =
  (
    familyId: string,
    shoppingItemId: string,
    name: string,
    count: string,
    description: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.put(
        `/families/${familyId}/shopping/${shoppingItemId}`,
        { name, count, description }
      );
      console.log(response.data.data);
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
      dispatch(
        shoppingListActions.patchShoppingItem({
          shoppingItem: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("PATCH SHOPPING ITEM ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

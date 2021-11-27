import api from "../../api/api";
import { AppDispatch } from "..";
import { rewardsActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getRewards =
  (familyId: string, childId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/families/${familyId}/children/${childId}/rewards/`
      );
      dispatch(
        rewardsActions.setRewards({
          rewards: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET REWARDS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const createReward =
  (
    familyId: string,
    childId: string,
    name: string,
    photo: string,
    points: string,
    description: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(
        `/families/${familyId}/children/${childId}/rewards/`,
        {
          name,
          photo,
          points,
          description,
        }
      );
      dispatch(rewardsActions.addReward({ reward: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE REWARD ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const purchaseReward =
  (familyId: string, childId: string, rewardId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/children/${childId}/rewards/${rewardId}`
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("PURCHASE REWARD ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

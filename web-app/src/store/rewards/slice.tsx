import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Reward as RewardType } from "../../types";

interface RewardState {
  rewards: RewardType[];
}

const initialState: RewardState = {
  rewards: [],
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setRewards(state, action: PayloadAction<{ rewards: RewardType[] }>) {
      state.rewards = action.payload.rewards;
    },
    addReward(state, action: PayloadAction<{ reward: RewardType }>) {
      state.rewards = [action.payload.reward, ...state.rewards];
    },
  },
});

export const rewardsActions = rewardsSlice.actions;

export default rewardsSlice;

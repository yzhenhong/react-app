import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 计数器状态接口
interface CounterState {
  value: number;
  history: number[];
}

// 初始状态
const initialState: CounterState = {
  value: 0,
  history: [],
};

/**
 * 计数器状态管理 Slice
 *
 * 主要功能：
 * - 计数器数值管理
 * - 操作历史记录
 * - 演示 Redux 基本用法
 */

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 增加
    increment: state => {
      state.value += 1;
      state.history.push(state.value);
    },

    // 减少
    decrement: state => {
      state.value -= 1;
      state.history.push(state.value);
    },

    // 增加指定数值
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },

    // 重置
    reset: state => {
      state.value = 0;
      state.history = [];
    },

    // 清空历史
    clearHistory: state => {
      state.history = [];
    },
  },
});

// 导出 actions
export const { increment, decrement, incrementByAmount, reset, clearHistory } =
  counterSlice.actions;

// 导出 reducer
export default counterSlice.reducer;

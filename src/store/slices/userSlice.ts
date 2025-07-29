import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 用户状态接口
interface UserState {
  id: string | null;
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatar: string;
  role: 'user' | 'admin';
}

// 初始状态
const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  isLoggedIn: false,
  avatar: '',
  role: 'user',
};

/**
 * 用户状态管理 Slice
 *
 * 主要功能：
 * - 用户登录状态管理
 * - 用户信息管理
 * - 用户权限管理
 */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录
    login: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },

    // 登出
    logout: state => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.role = 'user';
      state.isLoggedIn = false;
    },

    // 更新用户信息
    updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },

    // 更新头像
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

// 导出 actions
export const { login, logout, updateUserInfo, updateAvatar } =
  userSlice.actions;

// 导出 reducer
export default userSlice.reducer;

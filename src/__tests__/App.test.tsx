/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 11:49:57
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 14:14:35
 * @FilePath: \react-app\src\__tests__\App.test.tsx
 * @Description:
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

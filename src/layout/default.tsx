/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 17:10:50
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 17:28:47
 * @FilePath: \react-app\src\layout\default.tsx
 * @Description:
 */
import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
const LayoutDefault: React.FC = () => {
  return (
    <div className='layout-default'>
      <Nav />
      <div>layout-default</div>
      <Footer />
    </div>
  );
};

export default LayoutDefault;

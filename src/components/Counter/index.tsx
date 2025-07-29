import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  clearHistory,
} from '@/store/slices/counterSlice';
import './index.less';

/**
 * 计数器组件
 *
 * 主要功能：
 * - 演示 Redux 状态管理
 * - 计数器功能
 * - 操作历史记录
 */

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value, history } = useAppSelector(state => state.counter);
  const [incrementAmount, setIncrementAmount] = useState<number>(1);

  return (
    <div className='counter-container'>
      <h2 className='counter-title'>Redux 计数器演示</h2>

      <div className='counter-display'>
        <span className='counter-value'>当前值: {value}</span>
      </div>

      <div className='counter-controls'>
        <button className='counter-btn' onClick={() => dispatch(decrement())}>
          -1
        </button>

        <button className='counter-btn' onClick={() => dispatch(increment())}>
          +1
        </button>

        <button className='counter-btn reset' onClick={() => dispatch(reset())}>
          重置
        </button>
      </div>

      <div className='counter-input'>
        <input
          type='number'
          value={incrementAmount}
          onChange={e => setIncrementAmount(Number(e.target.value))}
          className='counter-input-field'
        />
        <button
          className='counter-btn'
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          增加 {incrementAmount}
        </button>
      </div>

      <div className='counter-history'>
        <h3>操作历史</h3>
        <div className='history-list'>
          {history.length === 0 ? (
            <p className='no-history'>暂无操作历史</p>
          ) : (
            <>
              {history.map((item, index) => (
                <span key={index} className='history-item'>
                  {item}
                </span>
              ))}
              <button
                className='clear-history-btn'
                onClick={() => dispatch(clearHistory())}
              >
                清空历史
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counter;

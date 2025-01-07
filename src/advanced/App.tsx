import React, { useEffect } from 'react';
import { ID_BY_COMPONENT } from './const';

import {
  setAdditionalDiscAlert,
  setLuckyDiscAlert,
  getDiscPriceAndRate,
} from './discountService';

import { handleClickAddBtn, handleClickCart } from './eventHandlers';

import {
  updateBonusPts,
  updateDiscInfo,
  updateSelectOpts,
  updateStockInfo,
} from './updaters';

export const App = () => {
  const productList = [
    { id: 'p1', name: '상품1', val: 10000, qty: 50 },
    { id: 'p2', name: '상품2', val: 20000, qty: 30 },
    { id: 'p3', name: '상품3', val: 30000, qty: 20 },
    { id: 'p4', name: '상품4', val: 15000, qty: 0 },
    { id: 'p5', name: '상품5', val: 25000, qty: 10 },
  ];

  let lastSel;

  useEffect(() => {
    updateSelectOpts(productList);

    updateCartData();

    setLuckyDiscAlert(productList, updateSelectOpts);
    setAdditionalDiscAlert(productList, lastSel, updateSelectOpts);

    function updateCartData() {
      const cart = document.querySelector(`#${ID_BY_COMPONENT.CART_ID}`);

      const { priceWithDisc, discRate } = getDiscPriceAndRate(
        cart,
        productList,
      );
      updateDiscInfo(priceWithDisc, discRate);
      updateBonusPts(priceWithDisc);
      updateStockInfo(productList);
    }

    const addBtn = document.querySelector(`#${ID_BY_COMPONENT.ADD_BTN_ID}`);
    addBtn?.addEventListener('click', () =>
      handleClickAddBtn(productList, (selItem) => {
        updateCartData();
        lastSel = selItem;
      }),
    );

    const cart = document.querySelector(`#${ID_BY_COMPONENT.CART_ID}`);
    cart?.addEventListener('click', (e) =>
      handleClickCart(e, productList, () => {
        updateCartData();
      }),
    );
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id={ID_BY_COMPONENT.CART_ID} />
        <div id={ID_BY_COMPONENT.SUM_ID} className="text-xl font-bold my-4" />
        <select
          id={ID_BY_COMPONENT.SELECT_ID}
          className="border rounded p-2 mr-2"
        />
        <button
          id={ID_BY_COMPONENT.ADD_BTN_ID}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          추가
        </button>
        <div
          id={ID_BY_COMPONENT.STOCK_INFO_ID}
          className="text-sm text-gray-500 mt-2"
        />
      </div>
    </div>
  );
};

import React from 'react';
import { ID_BY_COMPONENT } from '../const';
import { useGlobalContext } from '../context';

const AddBtn: React.FC = () => {
  const { values, actions } = useGlobalContext();
  const { cartItemList } = values;
  const { addCartItem, editCartItem, setLastSelectedId } = actions;

  const handleClickAddBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const tgtId = e.target?.form?.item?.value;
    const existingItem = cartItemList.find(({ id }) => id === tgtId);

    if (existingItem) {
      editCartItem(existingItem.id, existingItem.qty + 1);
    } else {
      addCartItem(tgtId);
    }

    setLastSelectedId(tgtId);
  };

  return (
    <button
      id={ID_BY_COMPONENT.ADD_BTN_ID}
      className="bg-blue-500 text-white px-4 py-2 rounded"
      type="submit"
      onClick={handleClickAddBtn}
    >
      추가
    </button>
  );
};

export default React.memo(AddBtn);

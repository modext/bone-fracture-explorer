// MenuTabs.tsx
import React from 'react';

interface MenuTabProps {
  tab: number;
  handleOnTabClick: (tab: number) => void;
  menus: {
    tab: number;
    label: string;
    handleOnclick: () => void;
  }[];
}

const MenuTabs: React.FC<MenuTabProps> = ({ tab, handleOnTabClick, menus }) => {
  return (
    <div className="flex border-b border-gray-300 mt-5">
      {menus.map((menu, index: number) => (
        <button
          key={index}
          onClick={() => handleOnTabClick(menu.tab)} 
          className={`${
            tab === menu.tab
              ? "font-semibold text-[#FFD75C] border-b-2 border-[#FFD75C] bg-[#ffd75c42]"
              : "text-gray-700 text-[#041D32] hover:text-[#FFD75C] hover:border-b-2 hover:border-[#FFD75C]"
          } px-6 pt-2 focus:outline-none`}
        >
          {menu.label}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;

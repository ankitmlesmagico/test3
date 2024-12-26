'use client';
import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';

import epicLogo from '@/assets/images/epicLogo.png';
import contractManagement from '@/assets/icons/contractManagement.svg';
import cubes from '@/assets/icons/cubes.svg';
import EsmagicoImage from '@/assets/images/esmagicoLogo.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  items?: Array<{
    title: string;
    path: string;
  }>;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSelector((state: RootState) => state.auth);

  let menuItems: MenuItem[] = [];

  if (user?.email == 'brand@esmagico.in') {
    menuItems = [
      {
        title: 'Contract Management',
        icon: contractManagement,
        items: [
          {
            title: 'Brand Onboarding',
            path: '/onboarding',
          },
        ],
      },
      {
        title: 'Our Products',
        icon: cubes,
        path: '/products',
      },
    ];
  } else {
    menuItems = [
      {
        title: 'All Brands',
        icon: contractManagement,
        items: [
          {
            title: 'Brands',
            path: '/brands',
          },
        ],
      },
    ];
  }

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    'Contract Management': true,
  });
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  useEffect(() => {
    // Handle initial path matching
    menuItems.forEach((menu) => {
      if (menu.items) {
        // Check subitem paths
        const matchingSubItem = menu.items.find(
          (item) => pathname === item.path
        );
        if (matchingSubItem) {
          setOpenMenus((prev) => ({ ...prev, [menu.title]: true }));
          setSelectedItem(matchingSubItem.title);
          setSelectedMenu('');
        }
      } else if (menu.path === pathname) {
        // Handle direct menu item path match
        setSelectedMenu(menu.title);
        setSelectedItem('');
      }
    });
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleMenuClick = (menu: MenuItem) => {
    if (!menu.items) {
      setSelectedMenu(menu.title);
      setSelectedItem('');
      if (menu.path) {
        router.push(menu.path);
      }
    } else {
      toggleMenu(menu.title);
    }
  };

  return (
    <div
      className="bg-white w-[230px] relative"
      style={{ width: '230px', height: '100vh' }}
    >
      <Image
        src={epicLogo}
        alt="Brand Logo"
        height={60}
        width={36}
        className="my-3 mx-4"
      />
      <div className="mt-5">
        {menuItems.map((menu) => (
          <div key={menu.title}>
            <button
              onClick={() => handleMenuClick(menu)}
              className={`w-full flex items-center justify-between py-2 px-3 transition-colors ${
                !menu.items && selectedMenu === menu.title
                  ? 'border-r-4 border-blue-600 bg-blue-50 text-[#0168B4]'
                  : openMenus[menu.title]
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={menu.icon}
                  alt={menu.title}
                  style={{ height: '16px', width: '16px' }}
                />
                <span className="text-[13px] font-medium">{menu.title}</span>
              </div>
              {menu.items &&
                (openMenus[menu.title] ? (
                  <MdKeyboardArrowDown className="w-4 h-4 text-[#0B1B32]" />
                ) : (
                  <MdKeyboardArrowUp className="w-4 h-4" />
                ))}
            </button>

            {menu.items && openMenus[menu.title] && (
              <div className="space-y-1">
                {menu.items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      setSelectedItem(item.title);
                      setSelectedMenu('');
                      router.push(item.path);
                    }}
                    className={`w-full font-semibold text-[12px] text-left py-2 px-9 transition-colors ${
                      selectedItem === item.title
                        ? 'bg-blue-50 text-[##333333] border-r-4 border-blue-600'
                        : '#333333 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full absolute bottom-5 flex justify-center items-center gap-1">
        <p className="text-[12px] font-semibold text-[#003D86]">By</p>
        <Image
          alt="Es-magico Image"
          src={EsmagicoImage}
          className="w-20 h-2.5"
        />
      </div>
    </div>
  );
};

export default Sidebar;

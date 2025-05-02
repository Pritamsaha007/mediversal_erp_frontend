"use client";
import { useState } from "react";
import {
  DollarSign,
  CornerDownRight,
  ChevronDown,
  ChevronRight,
  LucideComputer,
} from "lucide-react";
import MainMediversalLogo from "../../../../public/svgs/Mediversal FLogo - Color 1.svg";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  subItems?: {
    name: string;
    link: string;
  }[];
}

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>("Front Desk");
  const [selectedMenu, setSelectedMenu] = useState<string | null>("Front Desk");
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    "Patient Search"
  );

  const menuItems: MenuItem[] = [
    {
      name: "Front Desk",
      icon: <LucideComputer size={18} />,
      subItems: [
        {
          name: "Patient Search",
          link: "/dashboard/front-desk/patient-search",
        },
        {
          name: "Patient Registration",
          link: "/dashboard/front-desk/patient-registration",
        },
        { name: "Appointment", link: "/dashboard/front-desk/appointment" },
      ],
    },
    {
      name: "Billing & Cashier",
      icon: <DollarSign size={18} />,
      subItems: [
        {
          name: "Search OPD Receipt",
          link: "/dashboard/billing/search-opd-receipt",
        },
        { name: "Due Payment", link: "/dashboard/billing/due-payment" },
        { name: "Patient Advance", link: "/dashboard/billing/patient-advance" },
        { name: "IPD Estimation", link: "/dashboard/billing/ipd-estimation" },
        { name: "IPD Billing", link: "/dashboard/billing/ipd-billing" },
        {
          name: "Hospital Collection User Wise",
          link: "/dashboard/billing/hospital-collection",
        },
        {
          name: "Admission Advance Report",
          link: "/dashboard/billing/admission-advance-report",
        },
      ],
    },
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
    setSelectedMenu(menuName);
    // Select the first submenu item when opening a menu
    if (openMenu !== menuName) {
      const menu = menuItems.find((m) => m.name === menuName);
      if (menu?.subItems && menu.subItems.length > 0) {
        setSelectedSubMenu(menu.subItems[0].name);
      }
    }
  };

  const handleSubMenuClick = (subMenuName: string) => {
    setSelectedSubMenu(subMenuName);
  };

  return (
    <div className="flex flex-col h-screen w-[302px] bg-white shadow-md border-r-2 border-[#D3D7D8]">
      {/* Logo */}
      <div className="flex items-center justify-center p-6">
        <Image src={MainMediversalLogo} alt="Doctor Illustration" />
      </div>

      {/* Border */}
      <div className="border-t border-[#D3D7D8]"></div>

      {/* Menu Items */}
      <div className="flex flex-col overflow-y-auto py-6 px-2 space-y-1 justify-center items-center">
        {menuItems.map((menu) => (
          <div key={menu.name} className="mb-2 w-full">
            {/* Main Menu Item */}
            <div
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg w-[254px] h-[36px] mx-auto
                ${
                  selectedMenu === menu.name
                    ? "bg-[#0088B1] text-[#F8F8F8] shadow-sm"
                    : "bg-white text-[#161D1F] hover:bg-gray-50"
                }
                transition-all duration-300 ease-in-out`}
              onClick={() => toggleMenu(menu.name)}
            >
              <div className="flex items-center">
                <span
                  className={`mr-3 ${
                    selectedMenu === menu.name
                      ? "text-[#F8F8F8]"
                      : "text-[#161D1F]"
                  }`}
                >
                  {menu.icon}
                </span>
                <span className="text-sm font-medium">{menu.name}</span>
              </div>
              {menu.subItems && (
                <span
                  className={
                    selectedMenu === menu.name
                      ? "text-[#F8F8F8]"
                      : "text-[#161D1F]"
                  }
                >
                  {openMenu === menu.name ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              )}
            </div>

            {/* Sub Menu Items */}
            {openMenu === menu.name && menu.subItems && (
              <div className="mt-2 rounded-lg space-y-2 py-1 pl-2">
                {menu.subItems.map((subItem) => (
                  <Link href={subItem.link} key={subItem.name}>
                    <div
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-md mx-2 w-[234px] h-[36px]
                        ${
                          selectedSubMenu === subItem.name
                            ? "bg-[#D0E8F0] text-[#161D1F] font-medium"
                            : "text-[#161D1F] hover:bg-[#D0E8F0] hover:my-0.5 hover:py-2"
                        }
                        transition-all duration-200 ease-in-out`}
                      onClick={() => handleSubMenuClick(subItem.name)}
                    >
                      <CornerDownRight
                        size={14}
                        className="mr-3 text-[#161D1F]"
                      />
                      <span className="text-sm">{subItem.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

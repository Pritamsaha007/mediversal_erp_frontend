"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  CreditCard,
  Stethoscope,
  Pill,
  ClipboardList,
  DollarSign,
  CornerDownRight,
} from "lucide-react";
import MainMediversalLogo from "../login/assests/svgs/Mediversal FLogo - Color 1.svg";
import Image from "next/image";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  subItems?: {
    name: string;
    icon: React.ReactNode;
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
      icon: <LayoutDashboard size={18} />,
      subItems: [
        { name: "Patient Search", icon: <CornerDownRight size={16} /> },
        { name: "Patient Registration", icon: <CornerDownRight size={16} /> },
        { name: "Appointment", icon: <CornerDownRight size={16} /> },
      ],
    },
    {
      name: "Billing & Cashier",
      icon: <DollarSign size={18} />,
      subItems: [
        { name: "Create Invoice", icon: <CornerDownRight size={16} /> },
        { name: "Payment Processing", icon: <CornerDownRight size={16} /> },
        { name: "Insurance Claims", icon: <CornerDownRight size={16} /> },
      ],
    },
    {
      name: "Clinical",
      icon: <Stethoscope size={18} />,
      subItems: [
        { name: "Doctor Dashboard", icon: <CornerDownRight size={16} /> },
        { name: "Prescription", icon: <CornerDownRight size={16} /> },
        { name: "Medical Records", icon: <CornerDownRight size={16} /> },
      ],
    },
    {
      name: "Reports",
      icon: <ClipboardList size={18} />,
      subItems: [
        { name: "Financial Reports", icon: <CornerDownRight size={16} /> },
        { name: "Clinical Reports", icon: <CornerDownRight size={16} /> },
        { name: "Administrative Reports", icon: <CornerDownRight size={16} /> },
      ],
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      subItems: [
        { name: "User Management", icon: <CornerDownRight size={16} /> },
        { name: "System Configuration", icon: <CornerDownRight size={16} /> },
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
    <div className="flex flex-col h-screen w-[302px] bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center justify-center h-[80px] p-4">
        <Image
          src={MainMediversalLogo}
          alt="Doctor Illustration"
          width={400}
          height={200}
          className="w-full max-w-sm mx-auto"
        />
      </div>

      {/* Border */}
      <div className="border-t border-[#D3D7D8]"></div>

      {/* Menu Items */}
      <div className="flex flex-col overflow-y-auto py-6 px-2 space-y-1 justify-center items-center">
        {menuItems.map((menu) => (
          <div key={menu.name} className="mb-1">
            {/* Main Menu Item */}
            <div
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg w-[254px] h-[36px]
                ${
                  selectedMenu === menu.name
                    ? "bg-[#0088B1] text-[#F8F8F8] shadow-sm"
                    : "bg-white text-[#161D1F]  hover:bg-gray-50"
                }
                transition-colors duration-200`}
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
              <div className=" mt-1 rounded-lg space-y-1 py-1">
                {menu.subItems.map((subItem) => (
                  <div
                    key={subItem.name}
                    className={`flex items-center px-4 py-2  cursor-pointer rounded-md mx-2 w-[254px] h-[32px]
                        ${
                          selectedSubMenu === subItem.name
                            ? "bg-[#D0E8F0] text-[#161D1F] font-medium"
                            : "text-[#161D1F] hover:bg-[#D0E8F0]"
                        }
                        transition-colors duration-200`}
                    onClick={() => handleSubMenuClick(subItem.name)}
                  >
                    <CornerDownRight
                      size={14}
                      className="mr-3 text-[#161D1F]"
                    />
                    <span className="text-sm">{subItem.name}</span>
                  </div>
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

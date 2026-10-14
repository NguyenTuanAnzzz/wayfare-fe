import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Ticket, LockKey, SignOut } from '@phosphor-icons/react';
import { PROFILE_SIDEBAR_ITEMS } from '../enums/profileSidebar';

const iconMap = {
  User,
  Ticket,
  LockKey,
};

export default function SidebarProfile() {
  const location = useLocation();

  const isItemActive = (path) => {
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm space-y-2">
      {PROFILE_SIDEBAR_ITEMS.map((item) => {
        const IconComponent = iconMap[item.icon] || User;
        const active = isItemActive(item.path);

        return (
          <Link
            key={item.key}
            to={item.path}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all text-left block ${
              active
                ? 'bg-bay-700 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-bay-700'
            }`}
          >
            <IconComponent size={20} weight={active ? 'fill' : 'duotone'} />
            <div className="flex-1">
              <p className="leading-tight">{item.label}</p>
              <p className={`text-xs mt-0.5 ${active ? 'text-bay-100' : 'text-stone-500'}`}>
                {item.description}
              </p>
            </div>
          </Link>
        );
      })}

      {/* Logout Action (UI cứng, user tự gắn logic) */}
      <div className="pt-2 border-t border-stone-100">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-lantern-700 hover:bg-lantern-100/50 transition-colors text-left"
        >
          <SignOut size={20} weight="bold" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

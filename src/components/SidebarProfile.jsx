import { Link, useLocation } from 'react-router-dom';
import { User, Ticket, LockKey, SignOut, SquaresFour } from '@phosphor-icons/react';
import { PROFILE_SIDEBAR_ITEMS } from '../enums/profileSidebar';
import { useAuth } from '../contexts/AuthContext';

const iconMap = {
  User,
  Ticket,
  LockKey,
  SquaresFour,
};

export default function SidebarProfile() {
  const location = useLocation();
  const { user } = useAuth();
  const currentRole = user?.role || 'CUSTOMER';

  const isItemActive = (path) => {
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return location.pathname.startsWith(path);
  };

  // Lọc trực tiếp các mục theo đúng role của user (không cần toán tử 3 ngôi)
  const visibleItems = PROFILE_SIDEBAR_ITEMS.filter((item) =>
    item.roles.includes(currentRole)
  );

  return (
    <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm space-y-2">
      {visibleItems.map((item) => {
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

      {/* Logout Action */}
      <div className="pt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
              window.location.href = '/login';
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-lantern-700 hover:bg-lantern-100/50 transition-colors text-left"
        >
          <SignOut size={20} weight="bold" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

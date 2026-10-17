import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../contexts/AuthContext';
import {
  SquaresFour,
  Compass,
  Users,
  Ticket,
  Receipt,
  WarningCircle,
  SignOut,
  ArrowSquareOut,
  ShieldCheck,
  X,
  UserCheck,
} from '@phosphor-icons/react';
import { ADMIN_SIDEBAR_ITEMS, STAFF_SIDEBAR_ITEMS } from '../enums/dashboardSidebar';

const iconMap = {
  SquaresFour,
  Compass,
  Users,
  Ticket,
  Receipt,
  WarningCircle,
};

export default function SidebarDashboard({
  role,
  mobileOpen = false,
  onCloseMobile = () => {},
  slaCount = 2,
  pendingBookingsCount = 5,
}) {
  const location = useLocation();
  const { user } = useAuth();

  // Xác định vai trò: nếu có truyền prop role thì dùng, ngược lại lấy từ user, mặc định là ADMIN
  const currentRole = role || user?.role || 'ADMIN';
  const isStaff = currentRole === 'STAFF';

  // Lấy danh sách menu tương ứng vai trò
  const menuItems = isStaff ? STAFF_SIDEBAR_ITEMS : ADMIN_SIDEBAR_ITEMS;

  const isItemActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/overview';
    }
    if (path === '/staff') {
      return location.pathname === '/staff' || location.pathname === '/staff/pool';
    }
    return location.pathname.startsWith(path);
  };

  const getInitials = (name) => {
    if (!name) return isStaff ? 'ST' : 'AD';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const badgeCounts = {
    slaAlertCount: slaCount,
    pendingCount: pendingBookingsCount,
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-bay-900 text-stone-100 select-none">
      {/* 1. Header / Logo Section */}
      <div className="p-5 border-b border-bay-800 flex items-center justify-between">
        <Link
          to={isStaff ? '/staff' : '/admin'}
          className="flex items-center gap-3 group"
          onClick={onCloseMobile}
        >
          <div className="w-10 h-10 rounded-xl bg-bay-800 flex items-center justify-center border border-bay-700/60 shadow-inner group-hover:scale-105 transition-transform">
            <img src={logo} alt="Wayfare Logo" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-white tracking-tight leading-tight">
                Wayfare
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                  isStaff
                    ? 'bg-moss-500/20 text-moss-300 border-moss-500/30'
                    : 'bg-bay-800 text-bay-300 border-bay-700/50'
                }`}
              >
                {isStaff ? 'Staff' : 'Admin'}
              </span>
            </div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-widest mt-0.5">
              Journeys done right
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="md:hidden text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-bay-800 transition-colors"
          aria-label="Đóng menu"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* 2. Realtime WebSocket & SLA Channel Status */}
      <div className="px-5 py-3 border-b border-bay-800/60 bg-bay-900/60">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-moss-500"></span>
            </span>
            <span className="text-[11px] font-medium text-stone-300">
              {isStaff ? 'STOMP Pool Sẵn sàng' : 'STOMP Trực tuyến'}
            </span>
          </div>

          {!isStaff && slaCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lantern-600 bg-lantern-100 px-2 py-0.5 rounded-full">
              <WarningCircle size={12} weight="fill" />
              {slaCount} trễ SLA
            </span>
          )}

          {isStaff && pendingBookingsCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-turmeric-700 bg-turmeric-100 px-2 py-0.5 rounded-full">
              {pendingBookingsCount} đơn mới
            </span>
          )}
        </div>
      </div>

      {/* 3. Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
          {isStaff ? 'Bàn làm việc nhân viên' : 'Quản trị hệ thống'}
        </p>

        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon] || SquaresFour;
          const active = isItemActive(item.path);
          const count = item.badgeKey ? badgeCounts[item.badgeKey] : 0;

          return (
            <Link
              key={item.key}
              to={item.path}
              onClick={onCloseMobile}
              className={`group relative flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-bay-700 text-white font-medium shadow-sm pl-4'
                  : 'text-stone-300 hover:bg-bay-800 hover:text-white'
              }`}
            >
              {/* Active 3px strip in turmeric-500 on the left */}
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-[3px] bg-turmeric-500 rounded-r"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center gap-3 min-w-0">
                <IconComponent
                  size={20}
                  weight={active ? 'fill' : 'regular'}
                  className={active ? 'text-turmeric-500' : 'text-stone-400 group-hover:text-stone-200'}
                />
                <div className="truncate">
                  <p className="leading-tight truncate">{item.label}</p>
                </div>
              </div>

              {/* Badges */}
              {count > 0 && (
                <span
                  className={`ml-2 text-xs font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center justify-center shrink-0 ${
                    item.isAlert
                      ? 'bg-lantern-100 text-lantern-700 border border-lantern-600/30'
                      : active
                      ? 'bg-bay-800 text-bay-100'
                      : 'bg-bay-800/80 text-stone-300'
                  }`}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* 4. Quick Rule Reminder Box */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-bay-800/40 border border-bay-800 text-xs text-stone-400">
        <div className="flex items-center gap-1.5 text-stone-300 font-semibold mb-1">
          {isStaff ? (
            <UserCheck size={14} className="text-bay-300" weight="fill" />
          ) : (
            <ShieldCheck size={14} className="text-bay-300" weight="fill" />
          )}
          <span>{isStaff ? 'Quy tắc xử lý đơn' : 'Quy tắc chỉ xóa mềm'}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-stone-400">
          {isStaff
            ? 'Bấm "Nhận xử lý" để claim đơn vào hồ sơ của bạn. Ghi chú nội bộ được bảo mật, khách không thấy.'
            : 'Hệ thống không bao giờ xóa cứng dữ liệu. Mọi thao tác là Ngừng hoạt động ↔ Kích hoạt lại.'}
        </p>
      </div>

      {/* 5. Footer / User & Actions */}
      <div className="p-3 border-t border-bay-800 bg-bay-900/90 space-y-2">
        {/* Link back to Customer Site */}
        <Link
          to="/"
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-bay-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ArrowSquareOut size={16} />
            <span>Xem trang khách hàng</span>
          </span>
          <span className="text-[10px] text-stone-400">wayfare.vn</span>
        </Link>

        {/* User profile snippet */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-bay-800/70 border border-bay-700/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-bay-700 text-white font-heading font-bold text-xs flex items-center justify-center border border-bay-600 shrink-0">
              {getInitials(user?.name || user?.username || (isStaff ? 'Staff' : 'Admin'))}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate leading-tight">
                {user?.name || user?.username || (isStaff ? 'Nhân viên Wayfare' : 'Quản trị viên')}
              </p>
              <p className="text-[10px] text-bay-300 truncate mt-0.5">
                {user?.email || (isStaff ? 'staff@wayfare.vn' : 'admin@wayfare.vn')}
              </p>
            </div>
          </div>

          <button
            type="button"
            title="Đăng xuất"
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                window.location.href = '/login';
              }
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-lantern-600 hover:bg-lantern-100 transition-colors shrink-0"
            aria-label="Đăng xuất"
          >
            <SignOut size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-screen sticky top-0 z-30 shadow-xl border-r border-bay-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <div className="relative w-4/5 max-w-xs h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

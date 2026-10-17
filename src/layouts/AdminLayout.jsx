import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import SidebarDashboard from '../components/SidebarDashboard';
import {
  List,
  Bell,
  WarningCircle,
  CheckCircle,
  X,
  ArrowRight,
  ShieldCheck,
} from '@phosphor-icons/react';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  // Mock SLA & Payment notifications received from STOMP (/topic/admin/*)
  const notifications = [
    {
      id: 'sla-1',
      type: 'SLA_ALERT',
      title: 'Booking #WF-30495 quá hạn SLA',
      detail: 'Đã treo 2 giờ 45 phút chưa có nhân viên nào nhận xử lý.',
      time: '15 phút trước',
      isNew: true,
    },
    {
      id: 'sla-2',
      type: 'SLA_ALERT',
      title: 'Booking #WF-30510 quá hạn SLA',
      detail: 'Đã treo 2 giờ 10 phút tại Vịnh Hạ Long, cần điều phối gấp.',
      time: '35 phút trước',
      isNew: true,
    },
    {
      id: 'pay-1',
      type: 'PAYMENT_SUCCESS',
      title: 'Thanh toán MoMo thành công',
      detail: 'Mã GD: MOMO-847291 • Số tiền: 3.520.000 đ cho #WF-28104',
      time: '42 phút trước',
      isNew: false,
    },
    {
      id: 'pay-2',
      type: 'PAYMENT_SUCCESS',
      title: 'Thanh toán VNPay thành công',
      detail: 'Mã GD: VNP-992104 • Số tiền: 2.847.000 đ cho #WF-30492',
      time: '1 giờ trước',
      isNew: false,
    },
  ];

  const slaCount = notifications.filter((n) => n.type === 'SLA_ALERT').length;

  const getPageTitle = (pathname) => {
    if (pathname === '/admin' || pathname === '/admin/overview') return 'Tổng quan hoạt động';
    if (pathname.startsWith('/admin/tours')) return 'Quản lý tour';
    if (pathname.startsWith('/admin/staff')) return 'Quản lý nhân viên';
    if (pathname.startsWith('/admin/bookings')) return 'Danh sách booking';
    if (pathname.startsWith('/admin/transactions')) return 'Doanh thu & Giao dịch';
    if (pathname.startsWith('/admin/sla-alerts')) return 'Cảnh báo SLA';
    return 'Khu vực quản trị';
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans text-ink antialiased">
      {/* 1. Sidebar */}
      <SidebarDashboard
        role="ADMIN"
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        slaCount={slaCount}
        pendingBookingsCount={5}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-stone-50">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-stone-200 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-bay-700 hover:bg-stone-100 transition-colors"
              aria-label="Mở thanh điều hướng"
            >
              <List size={22} weight="bold" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <Link to="/admin" className="hover:text-bay-700 transition-colors">Admin</Link>
                <span>/</span>
                <span className="text-stone-700">{getPageTitle(location.pathname)}</span>
              </div>
              <h1 className="text-lg md:text-xl font-heading font-bold text-ink leading-tight">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* SLA Alert & Notification Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative p-2.5 rounded-xl border transition-all ${
                  slaCount > 0
                    ? 'border-lantern-600/30 bg-lantern-100/50 text-lantern-700 hover:bg-lantern-100'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-100'
                }`}
                title="Thông báo hệ thống & Cảnh báo SLA"
              >
                <Bell size={20} weight={slaCount > 0 ? 'fill' : 'regular'} />
                {slaCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-lantern-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white font-mono animate-pulse">
                    {slaCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setNotificationsOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-ink">
                          Thông báo WebSocket
                        </span>
                        {slaCount > 0 && (
                          <span className="bg-lantern-100 text-lantern-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {slaCount} cảnh báo SLA
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3.5 hover:bg-stone-50 transition-colors flex items-start gap-3 ${
                            item.isNew ? 'bg-bay-50/40' : ''
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.type === 'SLA_ALERT' ? (
                              <div className="w-7 h-7 rounded-lg bg-lantern-100 text-lantern-700 flex items-center justify-center">
                                <WarningCircle size={16} weight="fill" />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-moss-100 text-moss-700 flex items-center justify-center">
                                <CheckCircle size={16} weight="fill" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink leading-tight">
                              {item.title}
                            </p>
                            <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                              {item.detail}
                            </p>
                            <p className="text-[10px] text-stone-400 mt-1 font-mono">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 bg-stone-50 border-t border-stone-200 text-center">
                      <Link
                        to="/admin/sla-alerts"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs font-medium text-bay-700 hover:text-bay-600 inline-flex items-center gap-1.5"
                      >
                        Xem chi tiết cảnh báo SLA <ArrowRight size={12} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Admin Role Badge */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-bay-100 text-bay-800 border border-bay-200/60">
                <ShieldCheck size={14} weight="fill" />
                Quyền Admin
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

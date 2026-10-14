import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarProfile from '../components/SidebarProfile';
import { useAuth } from '../contexts/AuthContext';
import { Camera, ShieldCheck } from '@phosphor-icons/react';

export default function ProfileLayout() {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'WF';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getMemberYear = (dateStr) => {
    if (!dateStr) return new Date().getFullYear();
    const d = new Date(dateStr);
    return isNaN(d.getFullYear()) ? new Date().getFullYear() : d.getFullYear();
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-ink">
      <Header />

      <main className="flex-1 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Hero Banner / Account Overview */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative group">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user?.name || "Avatar"}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-stone-200 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-bay-100 text-bay-800 font-heading font-bold text-2xl md:text-3xl flex items-center justify-center border-2 border-bay-200 shadow-sm">
                    {getInitials(user?.name || "Nguyễn Văn An")}
                  </div>
                )}
                {/* Camera Icon Overlay (Static UI) */}
                <button 
                  type="button"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-bay-700 text-white flex items-center justify-center shadow-md hover:bg-bay-800 transition-transform active:scale-95"
                  title="Đổi ảnh đại diện"
                >
                  <Camera size={16} weight="bold" />
                </button>
              </div>

              {/* Account Details */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                    {user?.name || "Nguyễn Văn An"}
                  </h1>
                  {user?.role && user.role !== 'CUSTOMER' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-bay-100 text-bay-800 border border-bay-200">
                      <ShieldCheck size={14} weight="fill" />
                      {user.role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-600 font-mono">
                  {user?.email || "nguyen.an@gmail.com"}
                </p>
                <p className="text-xs text-stone-500 pt-1">
                  Thành viên từ: {getMemberYear(user?.createdAt || user?.createAt)}
                </p>
              </div>
            </div>

            {/* Quick Stats: Tour đã đặt */}
            <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
              <div className="bg-stone-50 rounded-2xl px-6 py-3 border border-stone-200 text-center flex-1 md:flex-initial">
                <p className="text-xs text-stone-600 font-medium">Tour đã đặt</p>
                <p className="text-xl font-heading font-bold text-bay-700 font-mono mt-0.5">3</p>
              </div>
            </div>
          </div>

          {/* Main Layout: Sidebar & Outlet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4">
              <SidebarProfile />
            </aside>
            <section className="lg:col-span-8">
              <Outlet />
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

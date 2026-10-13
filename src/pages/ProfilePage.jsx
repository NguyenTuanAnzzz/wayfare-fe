import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  User,
  Ticket,
  LockKey,
  Camera,
  CheckCircle,
  PhoneCall,
  Clock,
  HourglassMedium,
  CalendarBlank,
  Users,
  MapPin,
  ShieldCheck,
  CreditCard,
  Phone,
  EnvelopeSimple,
  Calendar
} from '@phosphor-icons/react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'bookings' | 'security'

  // Mock static booking data adhering to Wayfare prompt specs
  const mockBookings = [
    {
      id: "WF-30492",
      tourName: "Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt",
      destination: "Quảng Ninh",
      departureDate: "24/11/2026",
      duration: "3 ngày 2 đêm",
      guests: "2 người lớn, 1 trẻ em",
      totalPrice: "2.847.000 đ",
      bookingStatus: "CONFIRMED",
      bookingStatusText: "Đã xác nhận",
      paymentStatus: "PAID",
      paymentStatusText: "Đã thanh toán",
      assignedStaff: "Chị Lan đang phụ trách hỗ trợ chuyến đi của bạn",
      image: "halongbay"
    },
    {
      id: "WF-28104",
      tourName: "Chinh phục Sapa - Ruộng bậc thang & Đỉnh Fansipan",
      destination: "Lào Cai",
      departureDate: "15/12/2026",
      duration: "4 ngày 3 đêm",
      guests: "2 người lớn",
      totalPrice: "3.520.000 đ",
      bookingStatus: "CONTACTING",
      bookingStatusText: "Đang liên hệ",
      paymentStatus: "PAYMENT_PENDING",
      paymentStatusText: "Chờ thanh toán",
      assignedStaff: "Anh Minh đang liên hệ với bạn để xác nhận lịch trình",
      image: "sapa"
    },
    {
      id: "WF-19520",
      tourName: "Đà Nẵng - Bán đảo Sơn Trà & Phố cổ Hội An",
      destination: "Quảng Nam",
      departureDate: "02/09/2026",
      duration: "4 ngày 3 đêm",
      guests: "4 người lớn",
      totalPrice: "8.300.000 đ",
      bookingStatus: "CONFIRMED",
      bookingStatusText: "Đã xác nhận",
      paymentStatus: "PAID",
      paymentStatusText: "Đã thanh toán",
      assignedStaff: "Chị Phương đã hoàn tất thủ tục bàn giao vé",
      image: "hoian"
    }
  ];

  const getInitials = (name) => {
    if (!name) return 'WF';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-6 md:px-12 font-sans text-ink">
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
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-bay-100 text-bay-800 border border-bay-200">
                  <ShieldCheck size={14} weight="fill" />
                  {user?.role === 'ADMIN' ? 'Quản trị viên' : user?.role === 'STAFF' ? 'Nhân viên' : 'Khách hàng thân thiết'}
                </span>
              </div>
              <p className="text-sm text-stone-600 font-mono">
                {user?.email || "nguyen.an@gmail.com"}
              </p>
              <p className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                <span>Thành viên từ: 2026</span>
                <span>•</span>
                <span>Mã hội viên: #WF-8892</span>
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
            <div className="bg-stone-50 rounded-2xl px-5 py-3 border border-stone-200 text-center flex-1 md:flex-initial">
              <p className="text-xs text-stone-600 font-medium">Tour đã đặt</p>
              <p className="text-xl font-heading font-bold text-bay-700 font-mono mt-0.5">3</p>
            </div>
            <div className="bg-stone-50 rounded-2xl px-5 py-3 border border-stone-200 text-center flex-1 md:flex-initial">
              <p className="text-xs text-stone-600 font-medium">Điểm tích lũy</p>
              <p className="text-xl font-heading font-bold text-turmeric-700 font-mono mt-0.5">480 pts</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 border border-stone-200 shadow-sm space-y-2">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all text-left ${
                activeTab === 'profile'
                  ? 'bg-bay-700 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-bay-700'
              }`}
            >
              <User size={20} weight={activeTab === 'profile' ? 'fill' : 'duotone'} />
              <div className="flex-1">
                <p className="leading-tight">Thông tin cá nhân</p>
                <p className={`text-xs mt-0.5 ${activeTab === 'profile' ? 'text-bay-100' : 'text-stone-500'}`}>
                  Họ tên, liên hệ, ngày sinh
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all text-left ${
                activeTab === 'bookings'
                  ? 'bg-bay-700 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-bay-700'
              }`}
            >
              <Ticket size={20} weight={activeTab === 'bookings' ? 'fill' : 'duotone'} />
              <div className="flex-1">
                <p className="leading-tight">Booking của tôi</p>
                <p className={`text-xs mt-0.5 ${activeTab === 'bookings' ? 'text-bay-100' : 'text-stone-500'}`}>
                  Lịch trình, vé & nhân viên hỗ trợ
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all text-left ${
                activeTab === 'security'
                  ? 'bg-bay-700 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-bay-700'
              }`}
            >
              <LockKey size={20} weight={activeTab === 'security' ? 'fill' : 'duotone'} />
              <div className="flex-1">
                <p className="leading-tight">Bảo mật tài khoản</p>
                <p className={`text-xs mt-0.5 ${activeTab === 'security' ? 'text-bay-100' : 'text-stone-500'}`}>
                  Mật khẩu & xác thực hai bước
                </p>
              </div>
            </button>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8">
            {/* TAB 1: THÔNG TIN CÁ NHÂN */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-ink">Hồ sơ cá nhân</h2>
                  <p className="text-sm text-stone-600 mt-1">
                    Cập nhật thông tin chính xác để thuận tiện cho việc làm thủ tục đặt tour và bảo hiểm du lịch.
                  </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Họ và tên"
                      id="name"
                      defaultValue={user?.name || "Nguyễn Văn An"}
                      placeholder="Nhập họ và tên đầy đủ"
                    />

                    <Input
                      label="Địa chỉ Email"
                      id="email"
                      type="email"
                      defaultValue={user?.email || "nguyen.an@gmail.com"}
                      disabled
                      className="opacity-80"
                    />

                    <Input
                      label="Số điện thoại"
                      id="phone"
                      defaultValue={user?.phone || "0912 483 076"}
                      placeholder="0912 483 076"
                    />

                    <Input
                      label="Ngày sinh"
                      id="dob"
                      type="date"
                      defaultValue={user?.dob || "1995-08-15"}
                    />
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <p className="text-xs text-stone-500">
                      Email được cố định để xác thực bảo mật tài khoản.
                    </p>
                    <Button type="submit" variant="primary" className="px-6">
                      Lưu thay đổi
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: BOOKING CỦA TÔI */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm mb-4">
                  <h2 className="text-xl font-heading font-bold text-ink">Booking của tôi</h2>
                  <p className="text-sm text-stone-600 mt-1">
                    Danh sách các hành trình bạn đã đăng ký với Wayfare. Nhân viên chăm sóc sẽ liên hệ theo dõi từng chặng đường.
                  </p>
                </div>

                {mockBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5"
                  >
                    {/* Header: Booking Code & Status Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Mã booking:</span>
                        <span className="font-mono font-bold text-sm text-bay-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                          #{b.id}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Booking Status Badge */}
                        {b.bookingStatus === 'CONFIRMED' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-moss-100 text-moss-700">
                            <CheckCircle size={14} weight="fill" />
                            {b.bookingStatusText}
                          </span>
                        )}
                        {b.bookingStatus === 'CONTACTING' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-bay-100 text-bay-800">
                            <PhoneCall size={14} weight="fill" />
                            {b.bookingStatusText}
                          </span>
                        )}

                        {/* Payment Status Badge */}
                        {b.paymentStatus === 'PAID' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-moss-100 text-moss-700">
                            <CheckCircle size={14} weight="bold" />
                            {b.paymentStatusText}
                          </span>
                        )}
                        {b.paymentStatus === 'PAYMENT_PENDING' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-turmeric-100 text-turmeric-700">
                            <HourglassMedium size={14} weight="bold" />
                            {b.paymentStatusText}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body: Tour Info */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-heading font-bold text-lg text-ink">
                          {b.tourName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
                          <span className="flex items-center gap-1">
                            <MapPin size={16} weight="fill" className="text-bay-700" />
                            {b.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarBlank size={16} className="text-stone-500" />
                            Khởi hành: <strong className="font-mono text-ink">{b.departureDate}</strong> ({b.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={16} className="text-stone-500" />
                            {b.guests}
                          </span>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="md:text-right">
                        <p className="text-xs text-stone-500">Tổng thanh toán</p>
                        <p className="text-xl font-heading font-bold text-bay-700 font-mono">
                          {b.totalPrice}
                        </p>
                      </div>
                    </div>

                    {/* Footer: Assigned Staff Note (Strict Customer Requirement from Wayfare doc) */}
                    <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-stone-700 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
                        <PhoneCall size={16} weight="duotone" className="text-bay-700 shrink-0" />
                        <span>{b.assignedStaff}</span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="secondary" className="text-xs py-2 px-3 flex-1 sm:flex-initial">
                          Xem chi tiết
                        </Button>
                        {b.paymentStatus === 'PAYMENT_PENDING' && (
                          <Button variant="cta" className="text-xs py-2 px-4 flex-1 sm:flex-initial">
                            Thanh toán ngay
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: BẢO MẬT TÀI KHOẢN */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-ink">Bảo mật & Mật khẩu</h2>
                  <p className="text-sm text-stone-600 mt-1">
                    Đảm bảo tài khoản của bạn được an toàn bằng mật khẩu mạnh.
                  </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5 max-w-lg">
                  <Input
                    label="Mật khẩu hiện tại"
                    id="currentPassword"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                  />

                  <Input
                    label="Mật khẩu mới"
                    id="newPassword"
                    type="password"
                    placeholder="Tối thiểu 8 ký tự, gồm số và ký tự đặc biệt"
                  />

                  <Input
                    label="Xác nhận mật khẩu mới"
                    id="confirmNewPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                  />

                  <div className="pt-4 border-t border-stone-100">
                    <Button type="submit" variant="primary">
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

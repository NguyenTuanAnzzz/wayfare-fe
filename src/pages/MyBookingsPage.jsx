import React from 'react';
import Button from '../components/Button';
import {
  CheckCircle,
  PhoneCall,
  HourglassMedium,
  CalendarBlank,
  Users,
  MapPin
} from '@phosphor-icons/react';

export default function MyBookingsPage() {
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
    }
  ];

  return (
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

          {/* Footer: Assigned Staff Note */}
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
  );
}

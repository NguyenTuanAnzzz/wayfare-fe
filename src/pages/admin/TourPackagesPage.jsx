import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  MagnifyingGlass,
  CheckCircle,
  PauseCircle,
  PencilSimple,
  Eye,
  MapPin,
  CalendarBlank,
  Image as ImageIcon,
  ListNumbers,
  WarningCircle,
  ShieldCheck,
  X,
  ArrowsClockwise,
  UploadSimple,
} from '@phosphor-icons/react';
import { SUGGESTED_LOCATIONS } from '../../enums/tourLocations';

// Dữ liệu tour mẫu thực tế theo đúng đặc tả:
// Địa điểm Việt Nam (Hạ Long, Sapa, Đà Nẵng, Phú Quốc), giá không làm tròn (2.847.000 đ, 3.520.000 đ...)
// Placeholder ảnh: https://picsum.photos/seed/{chuoi}/800/600
const INITIAL_TOURS = [
  {
    id: 1,
    code: 'TP-101',
    name: 'Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt',
    description: 'Chiêm ngưỡng kỳ quan thiên nhiên thế giới, du ngoạn vịnh trên du thuyền sang trọng, chèo thuyền kayak và ngắm hoàng hôn vịnh biển.',
    duration_days: 3,
    duration_nights: 2,
    price: 2847000,
    priceFormatted: '2.847.000 đ',
    location: 'Quảng Ninh',
    isActive: true,
    deactivatedAt: null,
    deactivatedBy: null,
    createdAt: '2026-10-01T08:00:00',
    thumbnail: 'https://picsum.photos/seed/halong-thumb/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/halong-thumb/800/600', isThumbnail: true, isActive: true },
      { id: 2, url: 'https://picsum.photos/seed/halong-bay1/800/600', isThumbnail: false, isActive: true },
      { id: 3, url: 'https://picsum.photos/seed/halong-cave/800/600', isThumbnail: false, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Hà Nội - Cảng Tuần Châu - Vịnh Hạ Long', description: 'Đón khách tại Nhà hát Lớn Hà Nội, di chuyển cao tốc đến cảng, làm thủ tục lên du thuyền nhận phòng và ăn trưa.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Hang Sửng Sốt - Đảo Ti Tốp - Chèo Kayak', description: 'Thăm hang động đá vôi lớn nhất vịnh, tắm biển tại bãi cát Ti Tốp và leo núi ngắm toàn cảnh vịnh từ trên cao.', isActive: true },
      { id: 3, dayNumber: 3, title: 'Làng chài Ba Hang - Mua sắm đặc sản - Hà Nội', description: 'Đi thuyền nan qua làng chài cổ tích, thưởng thức bữa trưa sớm trước khi xe đưa đoàn trở lại Hà Nội.', isActive: true },
    ],
  },
  {
    id: 2,
    code: 'TP-102',
    name: 'Chinh phục Sapa - Ruộng bậc thang & Đỉnh Fansipan',
    description: 'Hành trình khám phá nóc nhà Đông Dương Fansipan huyền thoại, bản Cát Cát của người H’Mông và thung lũng Mường Hoa thơ mộng.',
    duration_days: 4,
    duration_nights: 3,
    price: 3520000,
    priceFormatted: '3.520.000 đ',
    location: 'Lào Cai',
    isActive: true,
    deactivatedAt: null,
    deactivatedBy: null,
    createdAt: '2026-10-03T09:30:00',
    thumbnail: 'https://picsum.photos/seed/sapa-fansipan/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/sapa-fansipan/800/600', isThumbnail: true, isActive: true },
      { id: 2, url: 'https://picsum.photos/seed/sapa-valley/800/600', isThumbnail: false, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Hà Nội - Sapa - Bản Cát Cát', description: 'Khởi hành xe giường nằm cao cấp đi Sapa. Chiều dạo bản Cát Cát tìm hiểu văn hóa bản địa.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Cáp treo Fansipan - Đỉnh mây 3.143m', description: 'Chinh phục đỉnh Fansipan bằng cáp treo 3 dây kỷ lục, chiêm bái quần thể tâm linh trên đỉnh núi.', isActive: true },
      { id: 3, dayNumber: 3, title: 'Đèo Ô Quy Hồ - Cầu Kính Rồng Mây', description: 'Ngắm biển mây tại một trong tứ đại đỉnh đèo Tây Bắc, trải nghiệm cầu kính không gian mở.', isActive: true },
      { id: 4, dayNumber: 4, title: 'Chợ tình Sapa - Tạm biệt phố núi', description: 'Tự do mua sắm thổ cẩm, thịt trâu gác bếp và lên xe về lại Hà Nội.', isActive: true },
    ],
  },
  {
    id: 3,
    code: 'TP-103',
    name: 'Đà Nẵng - Bán đảo Sơn Trà & Phố cổ Hội An',
    description: 'Trọn vẹn vẻ đẹp dải đất miền Trung: Bà Nà Hills Cầu Vàng, viếng chùa Linh Ứng Sơn Trà và thả đèn hoa đăng sông Hoài Hội An.',
    duration_days: 4,
    duration_nights: 3,
    price: 4150000,
    priceFormatted: '4.150.000 đ',
    location: 'Đà Nẵng - Quảng Nam',
    isActive: true,
    deactivatedAt: null,
    deactivatedBy: null,
    createdAt: '2026-10-05T14:15:00',
    thumbnail: 'https://picsum.photos/seed/danang-bridge/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/danang-bridge/800/600', isThumbnail: true, isActive: true },
      { id: 2, url: 'https://picsum.photos/seed/hoian-lantern/800/600', isThumbnail: false, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Đón sân bay Đà Nẵng - Bán đảo Sơn Trà', description: 'Đón khách, viếng tượng Phật Bà chùa Linh Ứng và ngắm toàn cảnh vịnh Đà Nẵng.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Bà Nà Hills - Cầu Vàng Bàn Tay Khổng Lồ', description: 'Cả ngày vui chơi tại Làng Pháp, check-in Cầu Vàng và tham gia các trò chơi Fantasy Park.', isActive: true },
      { id: 3, dayNumber: 3, title: 'Ngũ Hành Sơn - Phố cổ Hội An', description: 'Thăm làng đá mỹ nghệ Non Nước, chiều khám phá phố cổ lung linh đèn lồng.', isActive: true },
      { id: 4, dayNumber: 4, title: 'Tắm biển Mỹ Khê - Mua sắm Chợ Hàn', description: 'Thư giãn biển Mỹ Khê, mua đặc sản chả bò, tré và tiễn sân bay.', isActive: true },
    ],
  },
  {
    id: 4,
    code: 'TP-104',
    name: 'Phú Quốc - Hoàng hôn Sunset Sanato & Lặn san hô Nam Đảo',
    description: 'Thiên đường đảo ngọc Phú Quốc với bãi Sao cát trắng, câu cá lặn ngắm san hô tại quần đảo An Thới và ngắm hoàng hôn lãng mạn.',
    duration_days: 3,
    duration_nights: 2,
    price: 3850000,
    priceFormatted: '3.850.000 đ',
    location: 'Kiên Giang',
    isActive: true,
    deactivatedAt: null,
    deactivatedBy: null,
    createdAt: '2026-10-08T10:00:00',
    thumbnail: 'https://picsum.photos/seed/phuquoc-island/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/phuquoc-island/800/600', isThumbnail: true, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Đón sân bay Phú Quốc - Sunset Sanato', description: 'Nhận phòng resort, chụp ảnh hoàng hôn tại điểm check-in nghệ thuật Sunset Sanato.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Tour cano 4 đảo - Lặn ngắm san hô - Bãi Sao', description: 'Đi cano cao tốc tham quan hòn Mây Rút, Hòn Móng Tay, câu cá giải trí và tắm biển Bãi Sao.', isActive: true },
      { id: 3, dayNumber: 3, title: 'Nhà thùng nước mắm - Vườn tiêu - Tiễn sân bay', description: 'Tìm hiểu nghề làm nước mắm truyền thống, mua tiêu Phú Quốc và tiễn sân bay.', isActive: true },
    ],
  },
  {
    id: 5,
    code: 'TP-105',
    name: 'Ninh Bình - Tràng An Bái Đính & Hang Múa',
    description: 'Di sản thế giới kép Tràng An non nước hữu tình, chùa Bái Đính linh thiêng và chinh phục 500 bậc đá Hang Múa ngắm Tam Cốc.',
    duration_days: 2,
    duration_nights: 1,
    price: 1890000,
    priceFormatted: '1.890.000 đ',
    location: 'Ninh Bình',
    isActive: false, // Tour đang ngừng hoạt động (soft deleted)
    deactivatedAt: '2026-10-12T15:30:00',
    deactivatedBy: 'Admin (admin@wayfare.vn)',
    createdAt: '2026-09-20T11:00:00',
    thumbnail: 'https://picsum.photos/seed/ninhbinh-trangan/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/ninhbinh-trangan/800/600', isThumbnail: true, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Hà Nội - Quần thể Tràng An - Hang Múa', description: 'Đi thuyền nan qua các hang động ngập nước Tràng An, leo đỉnh Hang Múa ngắm thung lũng lúa.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Chùa Bái Đính - Trở về Hà Nội', description: 'Chiêm bái đại bảo tháp Bái Đính và tượng Phật đồng dát vàng lớn nhất Đông Nam Á.', isActive: true },
    ],
  },
  {
    id: 6,
    code: 'TP-106',
    name: 'Quy Nhơn - Kỳ Co Eo Gió & Hòn Khô biển xanh',
    description: 'Khám phá vùng đất võ trời văn Bình Định với con đường xuyên biển Hòn Khô và bãi biển Kỳ Co trong vắt màu ngọc bích.',
    duration_days: 3,
    duration_nights: 2,
    price: 3290000,
    priceFormatted: '3.290.000 đ',
    location: 'Bình Định',
    isActive: false, // Tour đang ngừng hoạt động (soft deleted)
    deactivatedAt: '2026-10-14T09:15:00',
    deactivatedBy: 'Admin (admin@wayfare.vn)',
    createdAt: '2026-09-25T16:20:00',
    thumbnail: 'https://picsum.photos/seed/quynhon-kyco/800/600',
    images: [
      { id: 1, url: 'https://picsum.photos/seed/quynhon-kyco/800/600', isThumbnail: true, isActive: true },
    ],
    itinerary: [
      { id: 1, dayNumber: 1, title: 'Đón sân bay Phù Cát - Tháp Đôi Chăm Pa', description: 'Khám phá kiến trúc tháp Chăm cổ kính giữa lòng thành phố Quy Nhơn.', isActive: true },
      { id: 2, dayNumber: 2, title: 'Cano sang đảo Kỳ Co - Eo Gió lộng gió', description: 'Tắm biển Kỳ Co cát trắng, ngắm san hô Hòn Sẹo và dạo cung đường ven biển Eo Gió.', isActive: true },
      { id: 3, dayNumber: 3, title: 'Ghềnh Ráng Tiên Sa - Mộ Hàn Mặc Tử', description: 'Viếng mộ thi sĩ Hàn Mặc Tử, bãi tắm Hoàng Hậu ngọc đá tròn và tiễn sân bay.', isActive: true },
    ],
  },
];

export default function TourPackagesPage() {
  const [tours, setTours] = useState(INITIAL_TOURS);
  const [activeTab, setActiveTab] = useState('ACTIVE'); // 'ACTIVE' | 'DEACTIVATED'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [tourToDeactivate, setTourToDeactivate] = useState(null);

  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [tourToActivate, setTourToActivate] = useState(null);

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [tourToPreview, setTourToPreview] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState(null);

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState(null);

  // Form state for Create / Edit Tour
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    duration_days: 3,
    duration_nights: 2,
    price: 2800000,
    description: '',
    thumbnail: '',
    itinerary: [
      { id: 1, dayNumber: 1, title: '', description: '', isActive: true },
    ],
    images: [],
  });

  // Số lượng đếm cho tabs
  const activeCount = tours.filter((t) => t.isActive).length;
  const deactivatedCount = tours.filter((t) => !t.isActive).length;

  // Lọc tour theo tab & tìm kiếm
  const displayedTours = useMemo(() => {
    return tours.filter((t) => {
      const matchTab = activeTab === 'ACTIVE' ? t.isActive : !t.isActive;
      if (!matchTab) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = t.name.toLowerCase().includes(q);
        const matchLoc = t.location.toLowerCase().includes(q);
        const matchCode = t.code.toLowerCase().includes(q);
        return matchName || matchLoc || matchCode;
      }
      return true;
    });
  }, [tours, activeTab, searchQuery]);

  // Format currency helper
  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  };

  // 1. Thao tác NGỪNG HOẠT ĐỘNG (Soft Delete theo đặc tả mục 3)
  const handleDeactivateTour = () => {
    if (!tourToDeactivate) return;

    setTours((prev) =>
      prev.map((t) => {
        if (t.id === tourToDeactivate.id) {
          return {
            ...t,
            isActive: false,
            deactivatedAt: new Date().toISOString(),
            deactivatedBy: 'Admin (admin@wayfare.vn)',
          };
        }
        return t;
      })
    );

    setToastMessage({
      type: 'warning',
      text: `Đã ngừng hoạt động tour "${tourToDeactivate.name}". Tour đã ẩn khỏi khách hàng, các booking cũ được giữ nguyên.`,
    });
    setDeactivateModalOpen(false);
    setTourToDeactivate(null);
  };

  // 2. Thao tác KÍCH HOẠT LẠI (Reactivate theo đặc tả mục 3)
  const handleActivateTour = () => {
    if (!tourToActivate) return;

    setTours((prev) =>
      prev.map((t) => {
        if (t.id === tourToActivate.id) {
          return {
            ...t,
            isActive: true,
            deactivatedAt: null,
            deactivatedBy: null,
          };
        }
        return t;
      })
    );

    setToastMessage({
      type: 'success',
      text: `Đã kích hoạt lại tour "${tourToActivate.name}". Tour hiện đã hiển thị lại để khách hàng đặt chuyến.`,
    });
    setActivateModalOpen(false);
    setTourToActivate(null);
  };

  // 3. Mở Modal Thêm mới hoặc Sửa Tour
  const handleOpenCreateModal = () => {
    setTourToEdit(null);
    setFormData({
      name: '',
      location: '',
      duration_days: 3,
      duration_nights: 2,
      price: 2850000,
      description: '',
      thumbnail: 'https://picsum.photos/seed/tour-new/800/600',
      itinerary: [
        { id: 1, dayNumber: 1, title: 'Ngày 1: Khởi hành & Đến điểm hẹn', description: 'Đón khách, di chuyển và nhận phòng khách sạn.', isActive: true },
        { id: 2, dayNumber: 2, title: 'Ngày 2: Tham quan danh thắng nổi tiếng', description: 'Khám phá các điểm đến hấp dẫn và thưởng thức ẩm thực đặc sản.', isActive: true },
        { id: 3, dayNumber: 3, title: 'Ngày 3: Mua sắm & Tạm biệt', description: 'Tự do dạo phố, mua quà lưu niệm và tiễn đoàn.', isActive: true },
      ],
      images: [
        { id: 1, url: 'https://picsum.photos/seed/tour-new/800/600', isThumbnail: true, isActive: true },
      ],
    });
    setEditModalOpen(true);
  };

  const handleOpenEditModal = (tour) => {
    setTourToEdit(tour);
    setFormData({
      name: tour.name,
      location: tour.location,
      duration_days: tour.duration_days,
      duration_nights: tour.duration_nights,
      price: tour.price,
      description: tour.description,
      thumbnail: tour.thumbnail,
      itinerary: [...tour.itinerary],
      images: [...tour.images],
    });
    setEditModalOpen(true);
  };

  // 4. Lưu Form Tạo mới / Cập nhật Tour
  const handleSaveTour = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || formData.price <= 0) {
      alert('Vui lòng điền đầy đủ tên tour, địa điểm và giá tiền hợp lệ.');
      return;
    }

    if (tourToEdit) {
      // Cập nhật
      setTours((prev) =>
        prev.map((t) => {
          if (t.id === tourToEdit.id) {
            return {
              ...t,
              name: formData.name,
              location: formData.location,
              duration_days: Number(formData.duration_days),
              duration_nights: Number(formData.duration_nights),
              price: Number(formData.price),
              priceFormatted: formatVND(Number(formData.price)),
              description: formData.description,
              thumbnail: formData.thumbnail || t.thumbnail,
              itinerary: formData.itinerary,
              images: formData.images,
            };
          }
          return t;
        })
      );
      setToastMessage({
        type: 'success',
        text: `Đã cập nhật thành công thông tin tour "${formData.name}".`,
      });
    } else {
      // Tạo mới
      const newId = Date.now();
      const newTour = {
        id: newId,
        code: `TP-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name,
        location: formData.location,
        duration_days: Number(formData.duration_days),
        duration_nights: Number(formData.duration_nights),
        price: Number(formData.price),
        priceFormatted: formatVND(Number(formData.price)),
        description: formData.description,
        thumbnail: formData.thumbnail || `https://picsum.photos/seed/tour-${newId}/800/600`,
        isActive: true,
        deactivatedAt: null,
        deactivatedBy: null,
        createdAt: new Date().toISOString(),
        itinerary: formData.itinerary,
        images: formData.images.length > 0 ? formData.images : [
          { id: 1, url: formData.thumbnail || `https://picsum.photos/seed/tour-${newId}/800/600`, isThumbnail: true, isActive: true },
        ],
      };

      setTours((prev) => [newTour, ...prev]);
      setToastMessage({
        type: 'success',
        text: `Đã tạo tour mới "${newTour.name}" thành công và hiển thị ở trạng thái Đang hoạt động.`,
      });
    }

    setEditModalOpen(false);
  };

  // Thêm ngày lịch trình trong Form
  const handleAddItineraryDay = () => {
    const nextDay = formData.itinerary.length + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          id: Date.now(),
          dayNumber: nextDay,
          title: `Ngày ${nextDay}: `,
          description: '',
          isActive: true,
        },
      ],
    }));
  };

  // Đổi trạng thái xóa mềm của một ngày lịch trình
  const handleToggleItineraryDayActive = (index) => {
    setFormData((prev) => {
      const nextItinerary = [...prev.itinerary];
      nextItinerary[index] = {
        ...nextItinerary[index],
        isActive: !nextItinerary[index].isActive,
      };
      return { ...prev, itinerary: nextItinerary };
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Banner Feedback */}
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between shadow-xs border ${
            toastMessage.type === 'success'
              ? 'bg-moss-100 border-moss-500/30 text-moss-700'
              : 'bg-turmeric-100 border-turmeric-500/30 text-turmeric-700'
          }`}
        >
          <div className="flex items-center gap-3">
            {toastMessage.type === 'success' ? (
              <CheckCircle size={20} weight="fill" className="shrink-0 text-moss-700" />
            ) : (
              <WarningCircle size={20} weight="fill" className="shrink-0 text-turmeric-700" />
            )}
            <p className="text-sm font-medium leading-tight">{toastMessage.text}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:opacity-75 transition-opacity"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-heading font-bold text-ink tracking-tight">
              Quản lý Tour Du Lịch
            </h2>
            <span className="bg-bay-50 text-bay-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-bay-200">
              {activeCount} tour mở bán
            </span>
          </div>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            CRUD tour trọn gói, lịch trình từng ngày, thư viện ảnh và áp dụng quy tắc{' '}
            <strong className="text-ink">Chỉ xóa mềm</strong> (Đang hoạt động ↔ Ngừng hoạt động).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tours/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bay-700 text-white font-medium text-xs hover:bg-bay-800 active:bg-bay-900 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2"
          >
            <Plus size={16} weight="bold" />
            <span>Thêm tour mới</span>
          </Link>
        </div>
      </div>

      {/* 2. Soft Delete Reminder Callout */}
      <div className="bg-bay-50/60 border border-bay-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-bay-900">
        <ShieldCheck size={20} weight="fill" className="text-bay-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-bay-800">Quy tắc nghiệp vụ Wayfare:</span> Hệ thống không
          bao giờ xóa cứng tour. Khi "Ngừng hoạt động", tour sẽ lập tức bị ẩn khỏi trang khách hàng và
          không thể đặt thêm, nhưng mọi lịch sử booking cũ vẫn hiển thị đúng tên tour. Bạn có thể kích
          hoạt lại bất kỳ lúc nào ở tab <strong>Ngừng hoạt động</strong>.
        </div>
      </div>

      {/* 3. Table Container with Tabs and Search */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Tab & Search Topbar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          {/* 2 Tabs theo đặc tả mục 3: "Đang hoạt động" và "Ngừng hoạt động" */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('ACTIVE')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                activeTab === 'ACTIVE'
                  ? 'bg-bay-700 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-ink'
              }`}
            >
              <CheckCircle size={15} weight={activeTab === 'ACTIVE' ? 'fill' : 'regular'} />
              <span>Đang hoạt động ({activeCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('DEACTIVATED')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                activeTab === 'DEACTIVATED'
                  ? 'bg-bay-700 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-ink'
              }`}
            >
              <PauseCircle size={15} weight={activeTab === 'DEACTIVATED' ? 'fill' : 'regular'} />
              <span>Ngừng hoạt động ({deactivatedCount})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tour, địa điểm, mã..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-bay-500/30 focus:border-bay-600 transition-all placeholder:text-stone-400 text-ink"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 4. High-density Table (Bảng kẻ 1px stone-200 theo đúng prompt) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                <th className="py-3 px-4">Ảnh & Tour</th>
                <th className="py-3 px-4">Điểm đến</th>
                <th className="py-3 px-4">Thời lượng</th>
                <th className="py-3 px-4">Giá tour / khách</th>
                <th className="py-3 px-4">Lịch trình & Ảnh</th>
                <th className="py-3 px-4">Trạng thái</th>
                {activeTab === 'DEACTIVATED' && <th className="py-3 px-4">Ngừng bởi</th>}
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-xs">
              {displayedTours.length === 0 ? (
                <tr>
                  <td colSpan={activeTab === 'DEACTIVATED' ? 8 : 7} className="py-12 text-center text-stone-500">
                    <p className="text-sm font-medium">Không có tour nào trong mục này</p>
                    <p className="text-xs text-stone-400 mt-1">
                      {searchQuery
                        ? 'Thử thay đổi từ khóa tìm kiếm.'
                        : activeTab === 'DEACTIVATED'
                        ? 'Hiện tại không có tour nào bị ngừng hoạt động.'
                        : 'Bấm nút "Thêm tour mới" để khởi tạo tour.'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayedTours.map((tour) => (
                  <tr
                    key={tour.id}
                    className={`hover:bg-stone-50/80 transition-colors ${
                      !tour.isActive ? 'bg-stone-50/50' : ''
                    }`}
                  >
                    {/* Ảnh & Tên Tour */}
                    <td className="py-3 px-4 min-w-[280px] max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.thumbnail}
                          alt={tour.name}
                          className="w-16 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://picsum.photos/seed/placeholder/800/600';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[10px] text-bay-900 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                              #{tour.code}
                            </span>
                          </div>
                          <h4 className="font-semibold text-ink text-xs leading-snug line-clamp-2 mt-0.5" title={tour.name}>
                            {tour.name}
                          </h4>
                        </div>
                      </div>
                    </td>

                    {/* Điểm đến */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-stone-700">
                        <MapPin size={14} className="text-bay-700 shrink-0" />
                        <span>{tour.location}</span>
                      </div>
                    </td>

                    {/* Thời lượng */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <CalendarBlank size={14} className="text-stone-400 shrink-0" />
                        <span>
                          {tour.duration_days} ngày {tour.duration_nights} đêm
                        </span>
                      </div>
                    </td>

                    {/* Giá tour / khách (font-mono) */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-ink">
                      {tour.priceFormatted}
                    </td>

                    {/* Lịch trình & Thư viện ảnh */}
                    <td className="py-3 px-4 whitespace-nowrap text-stone-600">
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="inline-flex items-center gap-1">
                          <ListNumbers size={13} className="text-stone-400" />
                          {tour.itinerary.length} ngày
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <ImageIcon size={13} className="text-stone-400" />
                          {tour.images.length} ảnh
                        </span>
                      </div>
                    </td>

                    {/* Trạng thái hoạt động (Badge chuẩn) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {tour.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-moss-100 text-moss-700">
                          <CheckCircle size={14} weight="fill" />
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                          <PauseCircle size={14} weight="fill" />
                          Ngừng hoạt động
                        </span>
                      )}
                    </td>

                    {/* Thông tin ngừng hoạt động nếu ở tab deactive */}
                    {activeTab === 'DEACTIVATED' && (
                      <td className="py-3 px-4 text-stone-500 text-[11px]">
                        <div>{tour.deactivatedBy || 'Admin'}</div>
                        <div className="font-mono text-stone-400">
                          {tour.deactivatedAt ? new Date(tour.deactivatedAt).toLocaleDateString('vi-VN') : ''}
                        </div>
                      </td>
                    )}

                    {/* Thao tác */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Xem trước */}
                        <button
                          type="button"
                          onClick={() => {
                            setTourToPreview(tour);
                            setPreviewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-bay-700 hover:bg-stone-100 transition-colors"
                          title="Xem chi tiết tour"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Chỉnh sửa */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(tour)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-bay-700 hover:bg-stone-100 transition-colors"
                          title="Chỉnh sửa thông tin tour"
                        >
                          <PencilSimple size={16} />
                        </button>

                        {/* Nút Ngừng hoạt động (khi đang hoạt động) */}
                        {tour.isActive ? (
                          <button
                            type="button"
                            onClick={() => {
                              setTourToDeactivate(tour);
                              setDeactivateModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg text-lantern-700 border border-lantern-600 hover:bg-lantern-100 active:scale-[0.98] transition-all text-xs font-medium"
                            title="Ngừng hoạt động tour"
                          >
                            Ngừng hoạt động
                          </button>
                        ) : (
                          /* Nút Kích hoạt lại (khi đã ngừng hoạt động) */
                          <button
                            type="button"
                            onClick={() => {
                              setTourToActivate(tour);
                              setActivateModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg text-moss-700 border border-moss-500 hover:bg-moss-100 active:scale-[0.98] transition-all text-xs font-medium flex items-center gap-1"
                            title="Kích hoạt lại tour"
                          >
                            <ArrowsClockwise size={13} weight="bold" />
                            Kích hoạt lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            Hiển thị <span className="font-semibold text-ink">{displayedTours.length}</span> / tổng số{' '}
            <span className="font-semibold text-ink">{tours.length}</span> tour trong hệ thống
          </div>
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            Quy tắc soft-delete: Backend sử dụng PATCH /tour-packages/:id/deactivate
          </div>
        </div>
      </div>

      {/* ================= MODAL XÁC NHẬN NGỪNG HOẠT ĐỘNG TOUR ================= */}
      {deactivateModalOpen && tourToDeactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDeactivateModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-lantern-100 text-lantern-700 flex items-center justify-center mb-4 border border-lantern-600/20">
              <PauseCircle size={26} weight="bold" />
            </div>

            <h3 className="text-lg font-heading font-bold text-ink leading-tight">
              Ngừng hoạt động tour "{tourToDeactivate.name}"?
            </h3>

            {/* Câu chữ bắt buộc chuẩn đặc tả */}
            <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-2">
              <p className="font-semibold text-ink">
                "Tour sẽ bị ẩn khỏi khách hàng và không thể đặt thêm. Các booking cũ giữ nguyên. Bạn có thể kích hoạt lại bất cứ lúc nào."
              </p>
              <ul className="list-disc list-inside text-stone-500 text-[11px] space-y-1">
                <li>Khách hàng không thấy tour này trên danh sách tìm kiếm.</li>
                <li>Không xóa dữ liệu vật lý trong cơ sở dữ liệu.</li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeactivateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeactivateTour}
                className="px-4 py-2.5 rounded-xl bg-lantern-600 text-white text-xs font-semibold hover:bg-lantern-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Xác nhận ngừng hoạt động
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XÁC NHẬN KÍCH HOẠT LẠI TOUR ================= */}
      {activateModalOpen && tourToActivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActivateModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-moss-100 text-moss-700 flex items-center justify-center mb-4 border border-moss-500/20">
              <CheckCircle size={26} weight="bold" />
            </div>

            <h3 className="text-lg font-heading font-bold text-ink leading-tight">
              Kích hoạt lại tour "{tourToActivate.name}"?
            </h3>

            <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <p>
                Tour sẽ được chuyển sang trạng thái <strong>Đang hoạt động</strong>. Khách hàng sẽ nhìn thấy tour và có thể tiếp tục đặt tour trực tuyến.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActivateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleActivateTour}
                className="px-4 py-2.5 rounded-xl bg-moss-500 text-white text-xs font-semibold hover:bg-moss-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Kích hoạt lại ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL TẠO MỚI / CHỈNH SỬA TOUR ================= */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setEditModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl z-10 border border-stone-200 overflow-y-auto max-h-[92vh]">
            <div className="flex items-start justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {tourToEdit ? 'Chỉnh sửa tour package' : 'Thêm mới tour package'}
                </span>
                <h3 className="text-xl font-heading font-bold text-ink mt-0.5">
                  {tourToEdit ? tourToEdit.name : 'Khởi tạo Tour Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="py-6 space-y-6">
              {/* 1. Thông tin chung */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-bay-700" />
                  <span>1. Thông tin cơ bản</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tên tour du lịch <span className="text-lantern-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Địa điểm / Tỉnh thành <span className="text-lantern-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="VD: Quảng Ninh, Lào Cai..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20"
                    />

                    {/* Danh sách gợi ý hiển thị nổi bên dưới */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-stone-400">Gợi ý:</span>
                      {SUGGESTED_LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, location: loc }))}
                          className="text-[10px] font-medium bg-stone-100 hover:bg-bay-100 hover:text-bay-800 text-stone-600 px-2 py-0.5 rounded-md transition-colors border border-stone-200/60"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số ngày <span className="text-lantern-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      required
                      value={formData.duration_days}
                      onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số đêm <span className="text-lantern-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      required
                      value={formData.duration_nights}
                      onChange={(e) => setFormData({ ...formData, duration_nights: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Giá tour (VNĐ / khách) <span className="text-lantern-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={100000}
                        step={1000}
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20 font-mono font-bold text-ink"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400">
                        {formatVND(Number(formData.price || 0))}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ảnh đại diện (Thumbnail)
                    </label>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="edit-tour-thumbnail-file"
                        className="px-3 py-2 bg-stone-100 hover:bg-bay-50 hover:text-bay-700 border border-stone-300 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        <UploadSimple size={15} weight="bold" />
                        <span>Tải tệp ảnh</span>
                      </label>
                      <input
                        id="edit-tour-thumbnail-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                      <input
                        type="text"
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        placeholder="Hoặc dán URL ảnh..."
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20 text-stone-600 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mô tả tổng quan tour
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả trải nghiệm, danh lam thắng cảnh và điểm nhấn của hành trình..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-400 text-xs focus:outline-none focus:border-bay-600 focus:ring-2 focus:ring-bay-500/20"
                  />
                </div>
              </div>

              {/* 2. Lịch trình từng ngày (tour_itinerary) */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ListNumbers size={16} className="text-bay-700" />
                    <span>2. Lịch trình chi tiết ({formData.itinerary.length} ngày)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-3 py-1.5 rounded-lg border border-bay-700 text-bay-700 text-xs font-medium hover:bg-bay-50 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Plus size={14} weight="bold" />
                    <span>Thêm ngày</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.itinerary.map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.isActive
                          ? 'bg-stone-50 border-stone-200'
                          : 'bg-stone-100/60 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-bay-900">
                          Ngày {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleItineraryDayActive(index)}
                          className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                            item.isActive
                              ? 'text-lantern-700 border-lantern-600/30 hover:bg-lantern-100'
                              : 'text-moss-700 border-moss-500/30 hover:bg-moss-100'
                          }`}
                        >
                          {item.isActive ? 'Ngừng hoạt động ngày này' : 'Kích hoạt lại'}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newIt = [...formData.itinerary];
                            newIt[index].title = e.target.value;
                            setFormData({ ...formData, itinerary: newIt });
                          }}
                          placeholder={`Tiêu đề ngày ${index + 1} (VD: Khởi hành - Cảng tàu...)`}
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:border-bay-600"
                        />
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const newIt = [...formData.itinerary];
                            newIt[index].description = e.target.value;
                            setFormData({ ...formData, itinerary: newIt });
                          }}
                          placeholder="Mô tả hoạt động chi tiết..."
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:border-bay-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-bay-700 text-white text-xs font-semibold hover:bg-bay-800 active:bg-bay-900 active:scale-[0.98] transition-all shadow-sm"
                >
                  {tourToEdit ? 'Lưu thay đổi' : 'Tạo tour mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL XEM CHI TIẾT TOUR (PREVIEW) ================= */}
      {previewModalOpen && tourToPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setPreviewModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl z-10 border border-stone-200 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-bay-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    #{tourToPreview.code}
                  </span>
                  {tourToPreview.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-moss-700 bg-moss-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle size={12} weight="fill" />
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                      <PauseCircle size={12} weight="fill" />
                      Ngừng hoạt động
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-ink mt-2">
                  {tourToPreview.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-5 space-y-6">
              {/* Ảnh bìa */}
              <img
                src={tourToPreview.thumbnail}
                alt={tourToPreview.name}
                className="w-full h-56 object-cover rounded-2xl border border-stone-200"
              />

              {/* Thông tin vắn tắt */}
              <div className="grid grid-cols-3 gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs text-center">
                <div>
                  <span className="text-stone-500 block text-[11px]">Địa điểm</span>
                  <span className="font-bold text-ink mt-0.5 block">{tourToPreview.location}</span>
                </div>
                <div className="border-x border-stone-200">
                  <span className="text-stone-500 block text-[11px]">Thời lượng</span>
                  <span className="font-bold text-ink mt-0.5 block">
                    {tourToPreview.duration_days}N{tourToPreview.duration_nights}Đ
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Giá niêm yết</span>
                  <span className="font-mono font-bold text-bay-700 mt-0.5 block">
                    {tourToPreview.priceFormatted}
                  </span>
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Mô tả hành trình
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {tourToPreview.description}
                </p>
              </div>

              {/* Lịch trình từng ngày */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                  Lịch trình chi tiết ({tourToPreview.itinerary.length} ngày)
                </h4>
                <div className="space-y-3">
                  {tourToPreview.itinerary.map((day) => (
                    <div
                      key={day.id}
                      className={`p-3 rounded-xl border text-xs ${
                        day.isActive
                          ? 'bg-stone-50 border-stone-200'
                          : 'bg-stone-100 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-ink">
                          Ngày {day.dayNumber}: {day.title}
                        </span>
                        {!day.isActive && (
                          <span className="text-[10px] text-stone-500 italic">
                            (Ngày này tạm ngừng)
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 leading-relaxed">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50"
              >
                Đóng
              </button>

              <button
                type="button"
                onClick={() => {
                  setPreviewModalOpen(false);
                  handleOpenEditModal(tourToPreview);
                }}
                className="px-4 py-2.5 rounded-xl bg-bay-700 text-white text-xs font-semibold hover:bg-bay-800 transition-colors"
              >
                Chỉnh sửa tour này
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

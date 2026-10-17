import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Plus,
  Trash,
  MapPin,
  CalendarBlank,
  ShieldCheck,
  Eye,
  Image as ImageIcon,
} from '@phosphor-icons/react';
import { SUGGESTED_LOCATIONS } from '../../enums/tourLocations';
import { useRef, useState } from 'react';
import useCreateTourPackage from '../../hooks/useCreateTourPackage';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';

export default function CreateTourPackagePage() {

  const [count, setCount] = useState(0)

  const imageRef = useRef(null)
  const { form, setForm, error, loading, handleChange, handleSubmit, handleItineraryChange } = useCreateTourPackage();

  const handleRemoveImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleView = () => {

    if (!imageRef.current) return;
    const viewer = new Viewer(imageRef.current, {
      navbar: true,
      toolbar: true,
      title: true,
      movable: true,
      zoomable: true,
    });

    viewer.show();
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    setCount(prev => prev + 1)
    handleSubmit(e)
  }


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header with Breadcrumb & Actions */}
      {error && (
        <Alert key={`err-${count}`} variant="error">
          {error}
        </Alert>
      )}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/tours"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-bay-700 transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại danh sách tour</span>
          </Link>
          <h2 className="text-2xl font-heading font-bold text-ink tracking-tight">
            Tạo Tour Du Lịch Mới
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Nhập thông tin hành trình, lịch trình từng ngày và chọn tệp ảnh quảng bá cho khách hàng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tours"
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 active:scale-[0.98] transition-all"
          >
            Hủy bỏ
          </Link>

          <Button
            type="submit"
            form="create-tour-form"
            variant="primary"
            className="!px-5 !py-2.5 !text-xs"
            loading={loading}
          >
            <CheckCircle size={16} weight="bold" />
            <span>Xuất bản tour ngay</span>
          </Button>
        </div>
      </div>

      {/* 2. Main Form Grid */}
      <form id="create-tour-form" onSubmit={onFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= CỘT TRÁI: THÔNG TIN TOUR & LỊCH TRÌNH (7 CỘT) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Khối 1: Thông tin cơ bản */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-ink flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-bay-100 text-bay-700 text-xs flex items-center justify-center font-bold font-mono">
                  1
                </span>
                <span>Thông tin gói tour</span>
              </h3>
              <span className="text-[11px] text-stone-400">Tất cả mục (*) là bắt buộc</span>
            </div>

            {/* Tên tour */}
            <div>
              <Input
                label={
                  <>
                    Tên tour du lịch <span className="text-lantern-600">*</span>
                  </>
                }
                id="name"
                name="name"
                type="text"
                required
                placeholder="VD: Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt"
                value={form.name}
                onChange={handleChange}
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Tên ngắn gọn, rõ ràng, làm nổi bật điểm đến và trải nghiệm cốt lõi.
              </p>
            </div>

            {/* Điểm đến */}
            <div>
              <Input
                label={
                  <>
                    Điểm đến / Tỉnh thành <span className="text-lantern-600">*</span>
                  </>
                }
                type="text"
                name="location"
                id="tour-location-input"
                required
                placeholder="VD: Quảng Ninh, Lào Cai (Sapa), Đà Nẵng, Phú Quốc..."
                value={form.location}
                onChange={handleChange}
              />

              {/* Danh sách gợi ý hiển thị nổi bên dưới */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] font-medium text-stone-400">Gợi ý địa điểm:</span>
                {SUGGESTED_LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        location: loc,
                      }));
                    }}
                    className="text-[11px] font-medium bg-stone-100 hover:bg-bay-100 hover:text-bay-800 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200/80 transition-all hover:border-bay-300 active:scale-95 cursor-pointer"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Thời lượng & Giá */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  label={
                    <>
                      Số ngày đi <span className="text-lantern-600">*</span>
                    </>
                  }
                  id="durationDays"
                  name="durationDays"
                  step={1}
                  type="number"
                  min={1}
                  max={30}
                  value={form.durationDays}
                  required
                  onChange={handleChange}
                />
                <span className="absolute right-3.5 bottom-3.5 text-xs text-stone-400 pointer-events-none">
                  ngày
                </span>
              </div>

              <div className="relative">
                <Input
                  label={
                    <>
                      Số đêm nghỉ <span className="text-lantern-600">*</span>
                    </>
                  }
                  id="durationNights"
                  name="durationNights"
                  type="number"
                  step={1}
                  min={0}
                  max={30}
                  value={form.durationNights}
                  required
                  onChange={handleChange}
                />
                <span className="absolute right-3.5 bottom-3.5 text-xs text-stone-400 pointer-events-none">
                  đêm
                </span>
              </div>

              <Input
                label={
                  <>
                    Giá tour / khách (VNĐ) <span className="text-lantern-600">*</span>
                  </>
                }
                id="price"
                name="price"
                type="number"
                min={100000}
                step={1000}
                required
                placeholder="VD: 2847000"
                value={form.price}
                onChange={handleChange}

              />
            </div>

            {/* Mô tả chi tiết */}
            <Textarea
              label="Mô tả tổng quan tour"
              id="description"
              name="description"
              rows={4}
              placeholder="Giới thiệu về vẻ đẹp cảnh quan, những trải nghiệm ấn tượng và dịch vụ bao gồm trong tour..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Khối 2: Lịch trình từng ngày (tour_itinerary) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-ink flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-bay-100 text-bay-700 text-xs flex items-center justify-center font-bold font-mono">
                    2
                  </span>
                  <span>Lịch trình chi tiết</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Hiển thị dạng timeline theo ngày cho khách hàng theo dõi trình tự chuyến đi
                </p>
              </div>


            </div>

            <div className="space-y-4">
              {form.itineraries.map((day, index) => (
                <div
                  key={day.dayNumber}
                  className="p-4 rounded-2xl border bg-stone-50/70 border-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs bg-bay-700 text-white px-2 py-0.5 rounded-md">
                      Ngày {day.dayNumber}
                    </span>
                  </div>

                  <Input
                    label="Tiêu đề hoạt động chính trong ngày"
                    id={`dayTitle-${day.dayNumber}`}
                    name="title"
                    type="text"
                    placeholder="VD: Đón khách tại Hà Nội - Khởi hành đến Vịnh Hạ Long"
                    value={day.title}
                    onChange={(e) =>
                      handleItineraryChange(index, "title", e.target.value)
                    }
                  />

                  <Textarea
                    label="Mô tả chi tiết lịch trình"
                    id={`dayDescription-${day.dayNumber}`}
                    name="description"
                    rows={2}
                    placeholder="Mô tả cụ thể thời gian, xe đưa đón, điểm tham quan và lưu ý..."
                    value={day.description}
                    onChange={(e) =>
                      handleItineraryChange(index, "description", e.target.value)
                    }
                  />

                  <div className="w-full sm:w-1/2">
                    <Input
                      label="Bữa ăn bao gồm"
                      id={`dayMeals-${day.dayNumber}`}
                      name="meals"
                      type="text"
                      placeholder="VD: Sáng, Trưa, Tối"
                      value={day.meals}
                      onChange={(e) =>
                        handleItineraryChange(index, "meals", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CỘT PHẢI: ẢNH TOUR & PREVIEW (5 CỘT) ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Khối 3: Thư viện ảnh (tour_images) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-ink flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-bay-100 text-bay-700 text-xs flex items-center justify-center font-bold font-mono">
                  3
                </span>
                <span>Thư viện ảnh tour</span>
              </h3>
              {form.images?.length > 0 && (
                <span className="text-xs text-stone-500 font-medium">
                  Đã chọn {form.images.length} ảnh
                </span>
              )}
            </div>

            {/* Input file ẩn */}
            <input
              id="tour-file-input"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleChange}
              onClick={(e) => {
                e.target.value = null;
              }}
            />

            {/* Grid danh sách ảnh đã chọn và ô dấu cộng để thêm ảnh */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" ref={imageRef}>
              {form.images &&
                form.images.map((image, index) => {
                  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;
                  return (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 group bg-stone-100 shadow-xs"

                    >
                      <img
                        src={imageUrl}
                        alt={`Ảnh tour ${index + 1}`}
                        className="w-full h-full object-cover"
                        onClick={handleView}
                      />
                      {index === 0 && (
                        <span className="absolute top-1.5 left-1.5 bg-bay-900/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                          Ảnh bìa
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-white/90 text-lantern-600 hover:bg-lantern-600 hover:text-white transition-all shadow-xs opacity-0 group-hover:opacity-100"
                        title="Xóa ảnh"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  );
                })}

              {/* Nút ô dấu cộng (+) thêm ảnh */}
              <label
                htmlFor="tour-file-input"
                className="aspect-square rounded-xl border-2 border-dashed border-stone-300 hover:border-bay-500 bg-stone-50/60 hover:bg-bay-50/50 flex flex-col items-center justify-center cursor-pointer transition-all group text-stone-400 hover:text-bay-700"
                title="Thêm ảnh"
              >
                <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-stone-200 flex items-center justify-center group-hover:scale-105 group-hover:border-bay-300 transition-all">
                  <Plus size={20} weight="bold" className="text-stone-600 group-hover:text-bay-700" />
                </div>
                <span className="text-[11px] font-medium text-stone-500 group-hover:text-bay-700 mt-1.5">
                  Thêm ảnh
                </span>
              </label>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
              * Ảnh đầu tiên hoặc ảnh được đánh dấu sẽ được dùng làm <strong>Ảnh đại diện</strong> tour.
            </p>
          </div>

          {/* Khối 4: Thẻ Xem trước Nhanh (Live Preview Card) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-heading font-bold text-sm text-ink flex items-center gap-1.5">
                <Eye size={16} className="text-bay-700" />
                <span>Xem trước thẻ tour khách hàng</span>
              </h3>
              <span className="text-[11px] font-semibold text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full">
                Đang hoạt động
              </span>
            </div>

            {/* Mock Tour Card */}
            <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="relative h-44 overflow-hidden bg-stone-100 flex items-center justify-center text-stone-400">
                {form.images && form.images.length > 0 ? (
                  <img
                    src={form.images[0] instanceof File ? URL.createObjectURL(form.images[0]) : form.images[0]}
                    alt="Tour Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={36} />
                )}
                <div className="absolute top-3 left-3 bg-bay-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <MapPin size={12} weight="fill" className="text-turmeric-500" />
                  <span>Điểm đến tour</span>
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <CalendarBlank size={14} />
                    3 ngày 2 đêm
                  </span>
                  <span className="font-mono text-[11px]">#TP-NEW</span>
                </div>

                <h4 className="font-heading font-bold text-sm text-ink line-clamp-2 leading-snug">
                  Tiêu đề tour du lịch
                </h4>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Giá trọn gói từ</span>
                    <span className="font-mono font-bold text-base text-bay-700">
                      {form.price} đ
                    </span>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-turmeric-500 text-ink font-semibold text-xs shadow-xs">
                    Đặt tour
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Khối 5: Nhắc nhở quy tắc Nghiệp vụ Wayfare */}
          <div className="bg-bay-900 text-stone-100 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <ShieldCheck size={16} className="text-turmeric-500" weight="fill" />
              <span>Quy tắc vận hành Tour</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Khi tour được xuất bản, tour sẽ hiển thị công khai trên danh mục tìm kiếm của khách hàng.
              Nếu tour tạm thời hết chỗ hoặc ngừng khai thác, hãy sử dụng tính năng <strong>"Ngừng hoạt động"</strong> thay vì xóa.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

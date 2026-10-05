import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarBlank, ArrowRight, Compass, ShieldCheck, CreditCard, Quotes, EnvelopeSimple } from '@phosphor-icons/react';
import Button from '../components/Button';

export default function HomePage() {
  const tours = [
    { id: 1, name: "Khám phá Vịnh Hạ Long", days: "3 ngày 2 đêm", price: "2.847.000 đ", img: "halongbay" },
    { id: 2, name: "Chinh phục Sapa", days: "4 ngày 3 đêm", price: "3.520.000 đ", img: "sapa" },
    { id: 3, name: "Đà Nẵng - Hội An", days: "4 ngày 3 đêm", price: "4.150.000 đ", img: "hoian" },
  ];

  const destinations = [
    { id: 1, name: "Hạ Long", desc: "Di sản thiên nhiên hùng vĩ", img: "halong" },
    { id: 2, name: "Sapa", desc: "Sương mù và ruộng bậc thang", img: "sapa2" },
    { id: 3, name: "Đà Nẵng", desc: "Thành phố biển năng động", img: "danang" },
    { id: 4, name: "Phú Quốc", desc: "Đảo ngọc nhiệt đới", img: "phuquoc" },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-ink">
      {/* HEADER */}
      <header className="w-full px-6 py-4 md:px-12 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo.svg" alt="Wayfare Logo" className="w-8 h-8 drop-shadow-sm" />
          <div className="font-heading font-bold text-2xl text-bay-700 tracking-tight">Wayfare</div>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#" className="text-bay-700 font-semibold">Trang chủ</a>
          <a href="#" className="text-stone-600 hover:text-bay-700 font-medium transition-colors">Điểm đến</a>
          <a href="#" className="text-stone-600 hover:text-bay-700 font-medium transition-colors">Tour của tôi</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-bay-700 font-medium hover:underline hover:text-bay-600">Đăng nhập</a>
          <a href="/register" className="bg-bay-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-bay-800 transition-colors active:scale-[0.98]">Đăng ký</a>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[calc(100dvh-73px)] max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl text-left w-full mt-8 md:mt-0 z-10">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bay-100/50 text-bay-700 text-sm font-semibold mb-6 border border-bay-200">
              <Compass weight="bold" size={16} /> Khám phá Việt Nam
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-ink leading-[1.1] mb-6">
              Journeys<br />done right.
            </h1>
          </motion.div>
          
          <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}} className="text-stone-600 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
            Tự do chọn lịch trình, đặt tour và trải nghiệm những điểm đến tuyệt vời nhất từ Hạ Long, Sapa đến Phú Quốc, Đà Nẵng.
          </motion.p>
          
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}}>
            <button className="bg-turmeric-500 text-ink font-semibold px-8 py-4 rounded-xl hover:bg-turmeric-600 active:scale-[0.98] transition-all text-lg focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-2 focus:ring-offset-stone-50 shadow-sm inline-flex items-center gap-2 group">
              Bắt đầu hành trình <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right: Timeline Graphic (MCU Style) */}
        <div className="flex-1 w-full flex justify-center relative h-full min-h-[500px] z-10">
          
          <div className="relative w-full max-w-[600px] h-[500px] mt-10 md:mt-0">
            {/* SVG Timeline */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 drop-shadow-sm" 
              viewBox="0 0 600 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
               {/* Main Axis Background */}
               <motion.path 
                 d="M 40 250 L 560 250"
                 stroke="var(--color-stone-200)"
                 strokeWidth="4"
                 strokeLinecap="round"
               />
               
               {/* Main Axis Animated */}
               <motion.path 
                 d="M 40 250 L 560 250"
                 stroke="var(--color-turmeric-500)"
                 strokeWidth="4"
                 strokeLinecap="round"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
               />

               {/* Branch 1: Hà Nội */}
               <motion.path 
                 d="M 100 250 L 130 220 L 130 120"
                 stroke="var(--color-turmeric-500)"
                 strokeWidth="3"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.8 }}
               />
               <motion.circle cx="100" cy="250" r="6" fill="var(--color-turmeric-500)" stroke="white" strokeWidth="2" initial={{scale:0}} animate={{scale:1}} transition={{delay: 0.8}} />
               <motion.circle cx="130" cy="120" r="4" fill="var(--color-bay-700)" initial={{scale:0}} animate={{scale:1}} transition={{delay: 1.6}} />

               {/* Branch 2: Hải Phòng */}
               <motion.path 
                 d="M 280 250 L 310 280 L 310 380"
                 stroke="var(--color-turmeric-500)"
                 strokeWidth="3"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 0.8, delay: 1.6 }}
               />
               <motion.circle cx="280" cy="250" r="6" fill="var(--color-turmeric-500)" stroke="white" strokeWidth="2" initial={{scale:0}} animate={{scale:1}} transition={{delay: 1.6}} />
               <motion.circle cx="310" cy="380" r="4" fill="var(--color-bay-700)" initial={{scale:0}} animate={{scale:1}} transition={{delay: 2.4}} />

               {/* Branch 3: Hạ Long */}
               <motion.path 
                 d="M 440 250 L 470 220 L 470 140"
                 stroke="var(--color-turmeric-500)"
                 strokeWidth="3"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 0.8, delay: 2.4 }}
               />
               <motion.circle cx="440" cy="250" r="6" fill="var(--color-turmeric-500)" stroke="white" strokeWidth="2" initial={{scale:0}} animate={{scale:1}} transition={{delay: 2.4}} />
               <motion.circle cx="470" cy="140" r="4" fill="var(--color-bay-700)" initial={{scale:0}} animate={{scale:1}} transition={{delay: 3.2}} />
            </svg>

            {/* Labels and Photos using Absolute Positioning */}
            
            {/* Start Label */}
            <div className="absolute left-[6.66%] top-[50%] z-20">
              <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="text-xs font-bold text-stone-400 -translate-x-full -translate-y-1/2 block pr-3">
                BẮT ĐẦU
              </motion.span>
            </div>

            {/* End Label */}
            <div className="absolute left-[93.33%] top-[50%] z-20">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay: 3.5, type:"spring"}} className="flex items-center gap-2 -translate-y-1/2 translate-x-3">
                <div className="w-3 h-3 rounded-full bg-turmeric-500 animate-pulse"></div>
                <span className="text-xs font-bold text-turmeric-600 whitespace-nowrap">TIẾP TỤC</span>
              </motion.div>
            </div>

            {/* Card 1: Hà Nội */}
            <div className="absolute left-[21.66%] top-[24%] z-20">
              <motion.div 
                className="flex flex-col items-center"
                initial={{opacity: 0, y: 10, x: '-50%'}} 
                animate={{opacity: 1, y: 'calc(-100% - 12px)', x: '-50%'}} 
                transition={{delay: 1.6, type: "spring"}}
              >
                <div className="w-24 h-24 rounded-2xl border-[3px] border-white shadow-lg overflow-hidden bg-stone-200 mb-2">
                  <img src="https://picsum.photos/seed/hanoicity/200/200" alt="Hà Nội" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-heading font-bold text-bay-900 bg-white/90 px-3 py-1 rounded-full backdrop-blur shadow-sm border border-stone-100 whitespace-nowrap">Hà Nội</span>
              </motion.div>
            </div>

            {/* Card 2: Hải Phòng */}
            <div className="absolute left-[51.66%] top-[76%] z-20">
              <motion.div 
                className="flex flex-col items-center"
                initial={{opacity: 0, y: -10, x: '-50%'}} 
                animate={{opacity: 1, y: '12px', x: '-50%'}} 
                transition={{delay: 2.4, type: "spring"}}
              >
                <span className="text-sm font-heading font-bold text-bay-900 bg-white/90 px-3 py-1 rounded-full backdrop-blur shadow-sm border border-stone-100 whitespace-nowrap mb-2 z-10">Hải Phòng</span>
                <div className="w-20 h-20 rounded-full border-[3px] border-white shadow-lg overflow-hidden bg-stone-200">
                  <img src="https://picsum.photos/seed/haiphong/200/200" alt="Hải Phòng" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Card 3: Hạ Long */}
            <div className="absolute left-[78.33%] top-[28%] z-20">
              <motion.div 
                className="flex flex-col items-center"
                initial={{opacity: 0, y: 10, x: '-50%'}} 
                animate={{opacity: 1, y: 'calc(-100% - 12px)', x: '-50%'}} 
                transition={{delay: 3.2, type: "spring"}}
              >
                <div className="w-28 h-28 rounded-2xl border-[3px] border-white shadow-xl overflow-hidden bg-stone-200 mb-2">
                  <img src="https://picsum.photos/seed/halongbay/300/300" alt="Vịnh Hạ Long" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-heading font-bold text-bay-900 bg-white/90 px-3 py-1 rounded-full backdrop-blur shadow-sm border border-stone-100 whitespace-nowrap">Vịnh Hạ Long</span>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. VALUES / FEATURES SECTION */}
      <section className="w-full bg-white py-24 px-6 md:px-12 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">Du lịch theo cách của bạn</h2>
            <p className="text-stone-600 text-lg">Chúng tôi lo liệu những chi tiết phức tạp, để bạn có thể tập trung vào điều quan trọng nhất: tận hưởng chuyến đi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-bay-100 text-bay-700 flex items-center justify-center mb-6 shadow-sm">
                <Compass size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-heading font-bold text-ink mb-3">Hành trình độc bản</h3>
              <p className="text-stone-600 leading-relaxed">Không gò bó lịch trình. Các tuyến điểm được chọn lọc kỹ càng, giữ lại vẻ đẹp nguyên bản của thiên nhiên Việt Nam.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-bay-100 text-bay-700 flex items-center justify-center mb-6 shadow-sm">
                <CreditCard size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-heading font-bold text-ink mb-3">Thanh toán liền mạch</h3>
              <p className="text-stone-600 leading-relaxed">Tích hợp sẵn VNPay và MoMo. Đặt tour và hoàn tất thanh toán chỉ trong vài bước thao tác an toàn.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-bay-100 text-bay-700 flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-heading font-bold text-ink mb-3">Hỗ trợ tận tâm</h3>
              <p className="text-stone-600 leading-relaxed">Đội ngũ nhân viên trực tiếp nhận và xử lý từng booking của bạn, theo dõi liên tục cho đến khi chuyến đi kết thúc.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. DESTINATIONS SECTION */}
      <section className="w-full bg-stone-50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">Điểm đến hàng đầu</h2>
              <p className="text-stone-600 max-w-2xl text-lg">Từ vùng núi cao phương Bắc đến những bãi biển cát trắng phương Nam.</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-bay-700 font-medium hover:text-bay-600 hover:underline">
              Khám phá tất cả <ArrowRight />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {destinations.map((dest, i) => (
              <motion.a 
                href="#" 
                key={dest.id} 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden block"
              >
                <img 
                  src={`https://picsum.photos/seed/${dest.img}/400/600`} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bay-900/90 via-bay-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 md:p-6 text-white w-full">
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-1 group-hover:-translate-y-1 transition-transform">{dest.name}</h3>
                  <p className="text-stone-100/90 text-sm md:text-base opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 transform translate-y-4">{dest.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOURS SECTION */}
      <section className="w-full bg-stone-100 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">Tour nổi bật</h2>
              <p className="text-stone-600 max-w-2xl text-lg">Những hành trình được thiết kế sẵn để bạn khởi hành bất cứ lúc nào.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-bay-700 font-medium hover:text-bay-600 hover:underline">
              Xem toàn bộ danh sách <ArrowRight />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <div className="h-56 overflow-hidden bg-stone-200 relative">
                  <img 
                    src={`https://picsum.photos/seed/${tour.img}/800/600`} 
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-bay-100 text-bay-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <MapPin weight="fill" /> {tour.img === 'halongbay' ? 'Quảng Ninh' : tour.img === 'sapa' ? 'Lào Cai' : 'Quảng Nam'}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-heading font-bold text-ink mb-3 group-hover:text-bay-700 transition-colors">{tour.name}</h3>
                  <div className="flex items-center gap-2 text-stone-600 mb-6 text-sm font-medium">
                    <CalendarBlank size={18} />
                    <span>{tour.days}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <p className="text-xs text-stone-600 mb-1">Giá từ</p>
                      <p className="text-lg font-bold text-bay-700 font-mono tracking-tight">{tour.price}</p>
                    </div>
                    <Button variant="secondary" className="px-4 py-2 text-xs">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="secondary" className="w-full justify-center">
              Xem toàn bộ danh sách <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="w-full bg-bay-900 text-white py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-bay-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-bay-700 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Quotes size={48} weight="fill" className="text-turmeric-500 mx-auto mb-8 opacity-80" />
          <h2 className="text-2xl md:text-4xl font-heading font-medium leading-relaxed max-w-4xl mx-auto mb-10 text-stone-50">
            "Chuyến đi Hạ Long của gia đình diễn ra rất suôn sẻ. Giao diện trực quan, nhân viên theo dõi sát sao từ lúc đặt vé đến khi về nhà. Thực sự an tâm."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-bay-700" />
            <div className="text-left">
              <p className="font-semibold text-white">Lê Hoàng</p>
              <p className="text-stone-100/60 text-sm">Booking #30492 - Vịnh Hạ Long</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER CTA */}
      <section className="w-full bg-white py-20 px-6 md:px-12 border-b border-stone-200">
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-200 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-turmeric-100 text-turmeric-700 flex items-center justify-center mb-6">
            <EnvelopeSimple size={28} weight="duotone" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">Nhận thông tin hành trình mới</h2>
          <p className="text-stone-600 mb-8 max-w-lg mx-auto">Đăng ký email để nhận những gợi ý du lịch và ưu đãi độc quyền dành riêng cho khách hàng Wayfare.</p>
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Địa chỉ email của bạn" 
              className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-bay-500/30 focus:border-bay-600 transition-all"
            />
            <Button variant="primary" className="whitespace-nowrap">Đăng ký ngay</Button>
          </form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-bay-900 text-stone-100 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-bay-800 pb-12 mb-8">
          <div className="col-span-1 md:col-span-4 lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/src/assets/logo.svg" alt="Wayfare Logo" className="w-8 h-8 opacity-90 brightness-0 invert" />
              <div className="font-heading font-bold text-3xl text-white tracking-tight">Wayfare</div>
            </div>
            <p className="text-stone-100/80 leading-relaxed mb-8 max-w-sm">
              Journeys done right.<br/>Nền tảng đặt tour du lịch nội địa uy tín, tập trung vào trải nghiệm cốt lõi của từng điểm đến.
            </p>
            <div className="space-y-2 text-stone-100/80 text-sm">
              <p>Email: hotro@wayfare.vn</p>
              <p>Hotline: 1900 6868</p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="font-heading font-bold text-white mb-6 text-lg">Khám phá</h4>
            <ul className="space-y-4 text-stone-100/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Vịnh Hạ Long</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sapa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Phú Quốc</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đà Nẵng</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="font-heading font-bold text-white mb-6 text-lg">Về chúng tôi</h4>
            <ul className="space-y-4 text-stone-100/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Câu chuyện Wayfare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ đối tác</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Góc báo chí</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <h4 className="font-heading font-bold text-white mb-6 text-lg">Hỗ trợ</h4>
            <ul className="space-y-4 text-stone-100/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quy định hoàn hủy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-100/50">
          <p>&copy; {new Date().getFullYear()} Wayfare. Không ngừng vươn xa.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Youtube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

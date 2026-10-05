import React from 'react';
import { motion } from 'framer-motion';

export default function AuthLayout({ 
  children, 
  title, 
  imageSrc = "https://picsum.photos/seed/wayfare-auth/1200/1600",
  imageTitle = "Khám phá vẻ đẹp đích thực của Việt Nam.",
  imageSubtitle = "Vịnh Hạ Long"
}) {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col md:flex-row bg-white text-ink font-sans">
      {/* Left Column: Form */}
      <div className="w-full md:w-[50%] lg:w-[45%] xl:w-[40%] h-full flex flex-col justify-center px-6 md:px-12 py-6 z-10 bg-white relative overflow-y-auto">
        <motion.div 
          className="max-w-[400px] w-full mx-auto my-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Logo Section */}
          <motion.div variants={fadeUpVariant} className="mb-6">
            <div className="flex items-center gap-2.5 mb-1">
              <img src="/src/assets/logo.svg" alt="Wayfare Logo" className="w-8 h-8 drop-shadow-sm" />
              <h1 className="text-2xl font-heading font-bold text-bay-700 tracking-tight">
                Wayfare
              </h1>
            </div>
            <p className="text-sm text-stone-600">Journeys done right.</p>
          </motion.div>

          <motion.h2 variants={fadeUpVariant} className="text-lg font-heading font-semibold mb-4">
            {title}
          </motion.h2>

          {/* Form Content */}
          {children}
        </motion.div>
      </div>

      {/* Right Column: Visual */}
      <div className="hidden md:block md:w-[50%] lg:w-[55%] xl:w-[60%] h-full relative overflow-hidden bg-stone-50">
        <motion.div 
          className="w-full h-full relative"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={imageSrc}
            alt="Wayfare Destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 lg:bottom-12 lg:left-12 right-10 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="font-heading text-2xl lg:text-4xl font-medium leading-tight mb-3 max-w-xl">
                {imageTitle}
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-white/50"></div>
                <p className="text-white/90 text-xs tracking-widest uppercase font-medium">
                  {imageSubtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

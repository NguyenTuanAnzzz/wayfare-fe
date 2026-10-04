import React from 'react';
import { motion } from 'framer-motion';
import { GoogleLogo, SignIn } from '@phosphor-icons/react';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';

export default function LoginPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AuthLayout 
      title="Đăng nhập"
      imageSrc="https://picsum.photos/seed/wayfare-login/1200/1600"
      imageTitle="Khám phá vẻ đẹp đích thực của Việt Nam."
      imageSubtitle="Vịnh Hạ Long"
    >
      <motion.form variants={fadeUpVariant} className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <Input 
          id="email" 
          type="email" 
          label="Email" 
          placeholder="ten@wayfare.vn" 
        />
        
        <Input 
          id="password" 
          type="password" 
          label="Mật khẩu" 
          placeholder="••••••••" 
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={SignIn}>
            Đăng nhập
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-5 pt-5 border-t border-ink/5">
        <Button variant="secondary" className="w-full" icon={GoogleLogo}>
          Tiếp tục với Google
        </Button>
      </motion.div>
      
      <motion.div variants={fadeUpVariant} className="mt-5 text-center">
        <p className="text-sm text-ink/70">
          Chưa có tài khoản?{' '}
          <a href="/register" className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
            Đăng ký ngay
          </a>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

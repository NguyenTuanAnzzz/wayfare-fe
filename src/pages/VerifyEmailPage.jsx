import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import Alert from '../components/Alert';
import useVerifyEmail from '../hooks/useVerifyEmail';

export default function VerifyEmailPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const { email, otp, handleChange, handleSubmit, loading, message, error } = useVerifyEmail();
  const [submitCount, setSubmitCount] = useState(0);

  const onFormSubmit = (e) => {
    setSubmitCount(c => c + 1);
    handleSubmit(e);
  };

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <AuthLayout 
      title="Xác thực Email"
      imageSrc="https://picsum.photos/seed/wayfare-verify/1200/1600"
      imageTitle="Bảo mật tuyệt đối cho tài khoản của bạn."
      imageSubtitle="Hội An, Việt Nam"
    >
      <motion.div variants={fadeUpVariant} className="mb-6">
        <p className="text-sm text-ink/70 leading-relaxed">
          Chúng tôi vừa gửi một mã xác thực gồm 6 ký tự đến email <strong className="text-ink">{email || "của bạn"}</strong>. Vui lòng kiểm tra hộp thư đến (hoặc thư rác) và nhập mã vào bên dưới.
        </p>
      </motion.div>

      <motion.form variants={fadeUpVariant} className="space-y-4" onSubmit={onFormSubmit}>
        
        {error && (
          <Alert key={`err-${submitCount}`} variant="error">
            {error}
          </Alert>
        )}

        {message && (
          <Alert key={`msg-${submitCount}`} variant="success">
            {message}
          </Alert>
        )}

        <Input 
          id="otp" 
          name="otp" 
          type="text" 
          maxLength={6}
          label="Mã xác thực (OTP)" 
          placeholder="Ví dụ: A1B2C3" 
          value={otp} 
          onChange={handleChange} 
          className="text-center tracking-widest text-lg font-bold"
          required
          disabled={!!message || loading}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={CheckCircle} loading={loading} disabled={!!message}>
            Xác thực ngay
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-6 text-center">
        <p className="text-sm text-ink/70">
          Chưa nhận được email?{' '}
          <button 
            type="button" 
            disabled={timeLeft > 0}
            onClick={() => {
              // TODO: Call API to resend email here
              setTimeLeft(60);
            }}
            className={`font-semibold transition-colors inline-flex items-center gap-1 ${
              timeLeft > 0 
                ? 'text-ink/40 cursor-not-allowed' 
                : 'text-primary hover:underline hover:text-primary/80'
            }`}
          >
            <EnvelopeSimple weight="bold" /> 
            {timeLeft > 0 ? `Gửi lại mã sau ${timeLeft}s` : 'Gửi lại mã'}
          </button>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import Alert from '../components/Alert';

import useVerifyEmail from '../hooks/useVerifyEmail';
import useResendOtp from '../hooks/useResendOtp';

export default function VerifyEmailPage() {

  const location = useLocation();

  // expiresAt từ lúc Register
  const [expiresAt, setExpiresAt] = useState(
    location.state?.expiresAt || null
  );

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const {
    email,
    otp,
    handleChange,
    handleSubmit,
    loading,
    message,
    error
  } = useVerifyEmail();

  // Hook gửi lại OTP
  const {
    handleSubmit: handleResendOtp,
    loading: resendLoading,
    message: resendMessage,
    error: resendError
  } = useResendOtp();

  const [submitCount, setSubmitCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);

  const onFormSubmit = (e) => {
    setSubmitCount(c => c + 1);
    handleSubmit(e);
  };

  /*
   * Tính số giây còn lại dựa trên expiresAt
   */
  useEffect(() => {

    if (!expiresAt) {
      setTimeLeft(0);
      return;
    }

    const updateTimeLeft = () => {

      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(expiresAt).getTime() - Date.now()) / 1000
        )
      );

      setTimeLeft(remaining);
    };

    // Tính ngay lần đầu
    updateTimeLeft();

    // Sau đó cập nhật mỗi giây
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);

  }, [expiresAt]);

  /*
   * Gửi lại OTP
   */
  const handleResend = async () => {

    const result = await handleResendOtp();

    if (result) {
      // Backend trả về expiresAt mới
      setExpiresAt(result.expiresAt);
    }
  };

  return (
    <AuthLayout
      title="Xác thực Email"
      imageSrc="https://picsum.photos/seed/wayfare-verify/1200/1600"
      imageTitle="Bảo mật tuyệt đối cho tài khoản của bạn."
      imageSubtitle="Hội An, Việt Nam"
    >

      <motion.div
        variants={fadeUpVariant}
        className="mb-6"
      >
        <p className="text-sm text-stone-600 leading-relaxed">
          Chúng tôi vừa gửi một mã xác thực gồm 6 ký tự đến email{' '}
          <strong className="text-ink">
            {email || "của bạn"}
          </strong>.
          Vui lòng kiểm tra hộp thư đến (hoặc thư rác)
          và nhập mã vào bên dưới.
        </p>
      </motion.div>

      <motion.form
        variants={fadeUpVariant}
        className="space-y-4"
        onSubmit={onFormSubmit}
      >

        {error && (
          <Alert
            key={`err-${submitCount}`}
            variant="error"
          >
            {error}
          </Alert>
        )}

        {message && (
          <Alert
            key={`msg-${submitCount}`}
            variant="success"
          >
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

          <Button
            type="submit"
            className="w-full"
            icon={CheckCircle}
            loading={loading}
            disabled={!!message}
          >
            Xác thực ngay
          </Button>

        </div>

      </motion.form>

      <motion.div
        variants={fadeUpVariant}
        className="mt-6 text-center"
      >

        <p className="text-sm text-stone-600">

          Chưa nhận được email?{' '}

          <button
            type="button"
            disabled={timeLeft > 0 || resendLoading}
            onClick={handleResend}
            className={`font-semibold transition-colors inline-flex items-center gap-1 ${
              timeLeft > 0 || resendLoading
                ? 'text-stone-400 cursor-not-allowed'
                : 'text-bay-700 hover:underline hover:text-bay-600'
            }`}
          >

            <EnvelopeSimple weight="bold" />

            {resendLoading
              ? 'Đang gửi...'
              : timeLeft > 0
                ? `Gửi lại mã sau ${timeLeft}s`
                : 'Gửi lại mã'
            }

          </button>

        </p>

      </motion.div>

      {resendError && (
        <Alert variant="error">
          {resendError}
        </Alert>
      )}

      {resendMessage && (
        <Alert variant="success">
          {resendMessage}
        </Alert>
      )}

    </AuthLayout>
  );
}
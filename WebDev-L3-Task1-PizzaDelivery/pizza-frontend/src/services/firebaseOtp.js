import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../firebase";

// Create Invisible reCAPTCHA
export const generateRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified");
        },
      }
    );

    window.recaptchaVerifier.render();
  }
};

// Send OTP
export const sendFirebaseOtp = async (phone) => {
  generateRecaptcha();

  const appVerifier = window.recaptchaVerifier;

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    `+91${phone}`,
    appVerifier
  );

  window.confirmationResult = confirmationResult;

  return true;
};

// Verify OTP
export const verifyFirebaseOtp = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);

  return result.user;
};
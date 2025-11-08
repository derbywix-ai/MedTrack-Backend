const express = require('express');
const authController = require('../controllers/authController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log('🔍 Auth route hit:', req.method, req.path);
  console.log('Headers:', req.headers);
  next();
});

// Auth routes
router.post('/signup', (req, res, next) => {
  console.log('📝 Signup attempt received');
  authController.signup(req, res);
});
router.post('/signin', authController.signin);
router.post('/signout', identifier, authController.signout);

// Verification routes
router.patch('/send-verification-code', identifier, authController.sendVerificationCode);
router.patch('/verify-verification-code', identifier, authController.verifyVerificationCode);
router.patch('/change-password', identifier, authController.changePassword);

// Forgot password routes
router.patch('/send-forgot-password-code', authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code', authController.verifyForgotPasswordCode);
router.patch('/update-fcm-token', identifier, authController.updateFcmToken);

module.exports = router;  
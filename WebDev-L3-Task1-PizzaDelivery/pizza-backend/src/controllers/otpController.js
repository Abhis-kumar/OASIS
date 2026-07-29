const axios = require("axios");

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        mobile: `91${phone}`,
        template_id: process.env.MSG91_TEMPLATE_ID,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "OTP Send Failed",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?mobile=91${phone}&otp=${otp}`,
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
};
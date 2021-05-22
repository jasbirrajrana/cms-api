import OtpModel from "../schema/OtpSchema";

export const confirmOtp = async (email: string, otp: number) => {
  let otp_obj;

  try {
    otp_obj = await OtpModel.findOne({ email, otp });
  } catch (error) {
    throw new Error(error);
  }

  if (!otp_obj) {
    throw new Error("Incorrect otp");
  }

  return otp_obj;
};

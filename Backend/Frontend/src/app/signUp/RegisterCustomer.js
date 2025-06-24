// Transform data to match backend expectations
const registrationData = {
  username: formData.fullName,
  email: formData.email,
  password: formData.password,
  confirmPassword: formData.confirmPassword,
};

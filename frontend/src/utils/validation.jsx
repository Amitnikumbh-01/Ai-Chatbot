export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateRegistration = (formData) => {
    const errors = {};
  
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!validatePassword(formData.password)) {
      errors.password = 
        'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
  
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      errors.age = 'Please enter a valid age';
    }
  
    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
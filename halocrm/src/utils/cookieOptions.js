const cookieOptions = {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only secure in production (HTTPS)
    sameSite: 'Strict', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
  };
  
  module.exports = cookieOptions;
  
const TOKEN_KEY = "timesheet_token";
const USER_KEY = "timesheet_user";

/**
 * Login user (dummy auth)
 */
export const loginUser = async (email, password) => {
  // simulate API call
  await new Promise((res) => setTimeout(res, 800));

  if (email === "test@demo.com" && password === "123456") {
    const user = {
      email,
      name: "Demo User",
    };

    const token = "dummy-token";

    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      token,
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
};

/**
 * Get current logged-in user
 */
export const getUser = () => {
  if (typeof window === "undefined") return null;

  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Check authentication
 */
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  return !!sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Logout user
 */
export const logoutUser = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};
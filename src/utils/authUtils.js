// Save auth token to local storage
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  export const setUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  export const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };
  
  export const removeUserData = () => {
    localStorage.removeItem('user');
  };
  
  export const logout = () => {
    removeAuthToken();
    removeUserData();
  };
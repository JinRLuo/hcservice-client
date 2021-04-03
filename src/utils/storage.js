export const setTokenIntoStorage = function(data) {
  window.localStorage.setItem('token',data);
}

export const getTokenFromStorage = function() {
  let token = window.localStorage.getItem('token');
  return token ? token : '';
}

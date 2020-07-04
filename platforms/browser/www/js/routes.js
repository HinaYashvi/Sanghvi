var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'index',
  },
  {
    path: '/registration/',
    url: './registration.html',
    name: 'registration',
  },
  {
    path: '/otp_verify/:reg_mobile/:insert_id/',
    url: './otp_verify.html?reg_mobile={{reg_mobile}}/insert_id={{insert_id}}',
    name: 'otp_verify',
  }, 
  {
    path: '/dashboard/',
    url: './dashboard.html',
    name: 'dashboard',
  }, 
];

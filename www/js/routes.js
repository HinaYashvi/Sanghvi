var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'index',
  },
  {
    path: '/internet/',
    url: './internet.html',
    name: 'internet',
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
  /*{
    path: '/company_category/:c_id/:c_name/:segment/',
    url: './company_category.html?c_id={{c_id}}/c_name={{c_name}}/segment={{segment}}',
    name: 'company_category',
  },*/
  {
    path: '/company_category/',
    url: './company_category.html',
    name: 'company_category',
  },

  /*{
    path: '/company_category/:c_id/:c_name/',
    url: './company_category.html?c_id={{c_id}}/c_name={{c_name}}',
    name: 'company_category',
  }, */
  {
    path: '/products/:comp_id/:cat_name/:comp_name/',
    url: './products.html?comp_id={{comp_id}}/cat_name={{cat_name}}/comp_name={{comp_name}}',
    name: 'products',
  }, 
  {
    path: '/profile/',
    url: './profile.html',
    name: 'profile',
  },
  {
    path: '/change_pwd/',
    url: './change_pwd.html',
    name: 'change_pwd',
  },
  {
    path: '/forgot_pwd/',
    url: './forgot_pwd.html',
    name: 'forgot_pwd',
  },
  {
    path: '/aboutus/',
    url: './aboutus.html',
    name: 'aboutus',
  },
  {
    path: '/contactus/',
    url: './contactus.html',
    name: 'contactus',
  },
];

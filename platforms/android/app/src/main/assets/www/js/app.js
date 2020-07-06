// Initialize your app 
var $$ = Dom7;
var app = new Framework7({  
  root: '#app', // App root element
  pushState: true, 
  //popupCloseByOutside:true,
  name: 'Sanghvi Consultancy',// App Name 
  id: 'com.phonegap.sanghvi', // App id //
  panel: {
    //swipe: 'left', // Enable swipe panel //
    closeByBackdropClick : true,    
  },  
  input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
  },
  animateNavBackIcon:true,  
  dynamicNavbar: true,  
  //theme:'material',
  //material: true, //enable Material theme
  //materialRipple: false,
  routes: routes, 
  clicks: { 
    externalLinks: '.external',
  },
  navbar: {     
    hideOnPageScroll: false,
    iosCenterTitle: false,
    closeByBackdropClick: true,
  },
  picker: {
    rotateEffect: true,
    //openIn: 'popover', 
  },
  popover: {
    closeByBackdropClick: true,
  },  
  on:{
    pageInit: function(e, page) {    
      //console.log(e+"-----"+page); 
    }
  },
  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
    app.showIndicator();
  },
  onAjaxComplete: function (xhr) {
    app.hideIndicator();
  }
}); 
var base_url = 'http://oteqprojects.co.in/sanghvi/';
var mainView = app.views.create('.view-main');

document.addEventListener("deviceready", checkStorage, false); 
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);
function onDeviceReady() { 
  
}
function onBackKeyDown() {
  checkConnection(); 
  //$(".slider").removeClass("slider_bottom");
  $(".swiper-container_slider").removeClass("slider_bottom");
  if(app.views.main.router.history.length==2 || app.views.main.router.url=='/'){
    app.dialog.confirm('Do you want to Exit ?', function () {
      navigator.app.clearHistory(); navigator.app.exitApp();
    });
  }else{ 
    $$(".back").click();
  } 
}
function checkStorage(){
  checkConnection();  
  var session_regid = window.localStorage.getItem("session_regid");
  //alert(session_regid);
  if(session_regid!=null){
    mainView.router.navigate("/dashboard/");
  }else{
    mainView.router.navigate("/index/"); 
  }
}
// --------------------- C H E C K  I N T E R N E T  C O N N E C T I O N --------------------- //
function checkConnection(){  
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }
}
// ----------------------- C H E C K  L O G I N -------------------------------- //
function logincheck(){
  checkConnection();    
  var lform = $(".lform").serialize();
  console.log(lform);
  var email = $("#email").val();
  var password = $("#password").val();
  if(email==''){
    $("#passerror").html("");
    $("#emailerror").html("<i class='f7-icons fs-14 mr-5'>envelope</i>Email address is required.");
    return false;
  }else if(password==''){
    $("#emailerror").html("");
    $("#passerror").html("<i class='f7-icons fs-14 mr-5'>lock</i>Password is required.");
    return false;
  }else{
    $("#passerror").html("");
    $("#emailerror").html("");
    $.ajax({
      type:'POST', 
      url:base_url+'APP/Appcontroller/authenticateUser',
      data:lform,  
      success:function(authRes){ 
        var parsedata = $.parseJSON(authRes);
        var msg = parsedata.msg;
        var user_session = parsedata.user_session[0];
        if(msg=='invalid_pass'){
          var toastBottom = app.toast.create({
            text: 'Incorrect Passsword.',
            closeTimeout: 3000,
          }); 
          toastBottom.open();         
        }else if(msg=='no_active'){
          var toastBottom = app.toast.create({
            text: 'Inactive User.',
            closeTimeout: 3000,
          });
          toastBottom.open();
        }else if(msg=='invalid_email'){
          var toastBottom = app.toast.create({
            text: 'Incorrect Email.',
            closeTimeout: 3000,
          }); 
          toastBottom.open();
        }else if(msg=='active'){
          mainView.router.navigate("/dashboard/");  
          window.localStorage.setItem("session_regid",parsedata.user_session[0].reg_id);
          window.localStorage.setItem("session_user_name",parsedata.user_session[0].name);
          window.localStorage.setItem("session_user_cid",parsedata.user_session[0].c_id);
          window.localStorage.setItem("session_user_email",parsedata.user_session[0].email);
          window.localStorage.setItem("session_user_mob",parsedata.user_session[0].mobileno);
          window.localStorage.setItem("session_user_state",parsedata.user_session[0].state);
          window.localStorage.setItem("session_user_city",parsedata.user_session[0].city);
          window.localStorage.setItem("session_user_add",parsedata.user_session[0].address);
          window.localStorage.setItem("session_user_zcode",parsedata.user_session[0].zipcode);
          window.localStorage.setItem("session_user_cdate",parsedata.user_session[0].created_date);
        }        
      }
    });
  }
}
function secondpart_reg(){
  checkConnection();   
  var rform = $(".rform").serialize();
  var reg_name = $("#reg_name").val();
  var reg_email = $("#reg_email").val();
  var reg_mobile = $("#reg_mobile").val();
  var reg_pass = $("#reg_pass").val();
  var re_pass = $("#re_pass").val();
  if(reg_name==''){
    $("#regemailerror").html('');
    $("#moberror").html('');
    $("#regpasserror").html('');
    $("#regre_passerror").html('');
    $("#nameerror").html("<i class='f7-icons fs-14 mr-5'>person_circle_fill</i>Name is required.");
    return false;
  }else if(reg_email==''){
    $("#nameerror").html('');
    $("#moberror").html('');
    $("#regpasserror").html('');
    $("#regre_passerror").html('');
    $("#regemailerror").html("<i class='f7-icons fs-14 mr-5'>envelope_circle_fill</i>Email is required.");
    return false;
  }else if(reg_mobile==''){
    $("#nameerror").html('');
    $("#regemailerror").html('');
    $("#regpasserror").html('');
    $("#regre_passerror").html('');
    $("#moberror").html("<i class='f7-icons fs-14 mr-5'>phone_circle_fill</i>Mobile no is required.");
    return false;
  }else if(reg_pass==''){
    $("#nameerror").html('');
    $("#regemailerror").html('');
    $("#moberror").html('');
    $("#regre_passerror").html('');
    $("#regpasserror").html("<i class='f7-icons fs-14 mr-5'>lock_circle_fill</i>Password is required.");
    return false;
  }else if(re_pass==''){
    $("#nameerror").html('');
    $("#regemailerror").html('');
    $("#moberror").html('');
    $("#regpasserror").html('');
    $("#regre_passerror").html("<i class='f7-icons fs-14 mr-5'>lock_rotation_open</i>Re-enter password is required.");
    return false;
  }else{
    if(reg_mobile!=''){
      var length_mob = reg_mobile.length;
      if(length_mob < 10){
        app.dialog.alert("Mobile no must be of 10 digits");
        $("#reg_mobile").focus();
        return false;
      }
    }
    if(reg_pass!=''){
      checkspecialchars(reg_pass);
    }
    if(re_pass!=''){
      checkspecialchars(re_pass);
    }
    $("#first_section").removeClass("display-block");
    $("#first_section").addClass("display-none");
    $(".logo").removeClass("display-block");
    $(".logo").addClass("display-none");

    $("#mainrow").addClass("jc-fs");
    $("#second_section").removeClass("display-none");
    $("#second_section").addClass("display-block");
    $(".logo_seocnd").removeClass("display-none");
    $(".logo_seocnd").addClass("display-block");
    
    /*$("#first_section").removeClass("display-block");
    $("#first_section").addClass("display-none");
    $(".logo").removeClass("display-block");
    $(".logo").addClass("display-none");

    $("#mainrow").addClass("jc-fs");
    $("#second_section").removeClass("display-none");
    $("#second_section").addClass("display-block");
    $(".logo_seocnd").removeClass("display-none");
    $(".logo_seocnd").addClass("display-block");*/
  }
  
}
function compare_pass(){
  var reg_pass = $("#reg_pass").val();
  var re_pass = $("#re_pass").val();
  $("#regre_passerror").html("");
  if(reg_pass!='' && re_pass!=''){
    if(reg_pass!=re_pass){
      $("#next_btn").attr("disabled","disabled");
      $("#nosame_passerror").html("<i class='f7-icons fs-14 mr-5'>xmark_circle_fill</i>Passwords not matched.");
      return false;
    }else{
      $("#next_btn").removeAttr("disabled");
      $("#nosame_passerror").html("");
      return false;
    }
  }
}
$(document).on('page:init', '.page[data-name="registration"]', function (page) {
  checkConnection();
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getCategories',
    success:function(res){
      app.preloader.show();
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      $(".categories").html(html);
      app.preloader.hide();
    }
  });
});
function checklength(mob){
  var moblen=mob.length;
  if(moblen > 10){    
    app.dialog.alert("Mobile no must be of 10 digits only");       
    $(".reg_mobile").val('');
    $(".reg_mobile").focus();
    return false;
  }
}
function registerMe(){
  checkConnection();   
  var rform = $(".rform").serialize();
  var reg_mobile = $("#reg_mobile").val();
  //console.log(rform);
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/registration',
    data:rform,
    success:function(result){
      var parse_result = $.parseJSON(result);
      var msg = parse_result.msg;
      var insert_id = parse_result.insert_id;
        if(msg=='registered'){
          var toastIcon = app.toast.create({
          icon: '<i class="f7-icons">checkmark_alt_circle</i>',
          text: 'Registration done successfully!',
          position: 'center',
          closeTimeout: 3000,
        });
        toastIcon.open();  
        mainView.router.navigate('/otp_verify/'+reg_mobile+"/"+insert_id+"/"); 
      }
    }
  });
}
$(document).on('page:init', '.page[data-name="otp_verify"]', function (page) {
  checkConnection();
  var reg_mobile = page.detail.route.params.reg_mobile; 
  var insert_id = page.detail.route.params.insert_id;
  $("#last_ins_id").val(insert_id);
  $(".otp_txt").html('Your are registered successfully.Please enter and verify the OTP sent to your registered mobile number '+reg_mobile+'.');
});
function verify_otp(){
  var otp_ver = $("#otp_ver").val();
  var last_ins_id = $("#last_ins_id").val();
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/otpemailVerify',
    data:{'otp_ver':otp_ver,'reg_id':last_ins_id},
    success:function(msg_result){
      var parseRes = $.parseJSON(msg_result);
      var msg_status = parseRes.msg_status;
      if(msg_status=='verified'){
        var toastIcon = app.toast.create({
          icon: '<i class="f7-icons">checkmark_alt_circle</i>',
          text: 'OTP verified!',
          position: 'center',
          closeTimeout: 3000,
        });
        toastIcon.open();  
        mainView.router.navigate('/'); 
      }else if(msg_status=='notsame_otp'){
        app.dialog.alert("Incorrect OTP.");
        return false;
      }
    }
  });
}
function showletter(show){
  if(show=='show'){
    $("#eyeicon").html("");
    $("#otp").attr('type','text');    
    $("#eyeicon").html('<i class="f7-icons text-white" onclick="showletter('+"'"+"hide"+"'"+')">eye_slash</i>');
  }else if(show=='hide'){
    $("#eyeicon").html("");
    $("#otp").attr('type','password');
    $("#eyeicon").html('<i class="f7-icons text-white" onclick="showletter('+"'"+"show"+"'"+')">eye</i>');
  }
}
function backsec(){
  $("#first_section").removeClass("display-none");
  $("#first_section").addClass("display-block");
  $(".logo").removeClass("display-none");
  $(".logo").addClass("display-block");

  $("#mainrow").removeClass("jc-fs");
  $("#second_section").removeClass("display-block");
  $("#second_section").addClass("display-none");
  $(".logo_seocnd").removeClass("display-block");
  $(".logo_seocnd").addClass("display-none");
}
function checkemailexists(emailid){
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/checkEmail',
    data:{'email':emailid},
    success:function(res){
      var parsejson = $.parseJSON(res);
      var msg = parsejson.msg;
      var otp_msg = parsejson.otp_msg;
      var insert_id = parsejson.regID;
      var reg_mobile = parsejson.mobile_no;
      if(msg=='exists'){
        /*$("#reg_email").val("");
        app.dialog.alert("Email id already registerd");
        return false;*/
        if(otp_msg=='otp_notsend'){
          var toastIcon = app.toast.create({
            icon: '<i class="f7-icons">Email id already registerd.Try to login.</i>',
            text: 'OTP verified!',
            position: 'center',
            closeTimeout: 3000,
          });
          toastIcon.open();  
          mainView.router.navigate('/');
        }else if(otp_msg=='otp_send'){          
          $.ajax({
            type:'POST',     
            url:base_url+'APP/Appcontroller/notverifiedOTP',
            data:{'email':emailid},
            success:function(res){
              //dg@4dsd.rrer
            }
          });
          mainView.router.navigate('/otp_verify/'+reg_mobile+"/"+insert_id+"/"); 
        }
      }
    }
  });
}
$(document).on('page:init', '.page[data-name="dashboard"]', function (page) {
  checkConnection();
  app.preloader.show();
  //$(".slider").removeClass("slider_bottom");
  $(".swiper-container_slider").removeClass("slider_bottom");
  var slides='';
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/sliderimages', 
    success:function(res){      
      var parseres = $.parseJSON(res);
      var slider = parseres.slider; 
      var tot_slides = slider.length;
      for(var i=0;i<tot_slides;i++){
        var adv_img_path = slider[i].adv_img_path;
        slides+='<div class="swiper-slide dash_slides"><img src="'+base_url+adv_img_path+'" class="w-100 slide-height"></div>';
      }
      if(tot_slides>0){
        $(".swiper-wrapper").html(slides);
          var swiper1 = new Swiper('.swiper-container_slider', {
          //parallax: true,
          //autoHeight: true,
          setWrapperSize: true,
          slidesPerView: 1,
          spaceBetween: 0,  
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            dynamicBullets: true,
          },
          observer: true,
          observeParents: true, 
        });
      }else{
        $(".swiper-container_slider").remove();
      }
      /*var total_records = parseres.total_records;
      if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }*/
    }
  });

  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getCategoriesDashboard', 
    success:function(res){      
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      $(".dashcats").html(html);
      var total_records = parseres.total_records;
      if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }      
    }
  });
  app.preloader.hide();
});
function checkspecialchars(pass){
  $("#lblError").html("");
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var chk_pass=format.test(pass);
  if(chk_pass==true){    
    $("#reg_pass").val("");
    $("#re_pass").val("");
    $("#lblError").html("<i class='f7-icons fs-14 mr-5'>xmark_circle_fill</i>Only Alphabets and Numbers allowed for password.");
    return false;
  }
}
function ValidateEmail(mail) 
{
  var format_chk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var chk_email=format_chk.test(mail);
  if(chk_email==false){
    $("#invalidemailerror").html("<i class='f7-icons fs-14 mr-5'>xmark_circle_fill</i>Invalide Email.");
    return false;
  }else{
    $("#invalidemailerror").html("");
    return false;
  }
 }
function getCatData(c_id,c_name,segment){ 
  checkConnection();
  //mainView.router.navigate("/company_category/"+c_id+"/"+c_name+"/"+segment+"/");
  mainView.router.navigate("/company_category/");
  app.preloader.show();
  var slides='';
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getCategoriesData',
    data:{'c_id':c_id,'c_name':c_name,'segment':segment},
    success:function(res){
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      var catname = parseres.catname;
      /*var slider = parseres.slider;
      var tot_slides = slider.length;
      for(var i=0;i<tot_slides;i++){
        var adv_img_path = slider[i].adv_img_path;
        slides+='<div class="swiper-slide dash_slides"><img src="'+base_url+adv_img_path+'" class="w-100 slide-height"></div>';
      }
      if(tot_slides>0){
        $(".swiper-wrapper").html(slides);
          var swiper1 = new Swiper('.swiper-container_slider', {
          //parallax: true,
          //autoHeight: true,
          setWrapperSize: true,
          slidesPerView: 1,
          spaceBetween: 0,  
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            dynamicBullets: true,
          },
          observer: true,
          observeParents: true, 
        });
      }else{
        $(".swiper-container_slider").remove();
      }
      var catname = parseres.catname;
      var total_records = parseres.total_records;
      if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }*/
      var total_records = parseres.total_records;
      if(total_records==0){
        $(".swiper-container_slider1").addClass("slider_bottom");
        // $(".swiper-container_slider").removeClass("slider_bottom"); 
        // $(".swiper-container_slider").addClass("slider_bottom_prod");
      }else{
        $(".swiper-container_slider1").removeClass("slider_bottom");
      }

      
      $(".comps").html(html);
      //$(".slider").html(slider);
      $(".cat_name").html(catname);
    }
  });
  app.preloader.hide();
}
$(document).on('page:init', '.page[data-name="company_category"]', function (page) {
  //alert("page loaded");
  $(".swiper-container_slider1").removeClass("slider_bottom");
  var slides='';
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/sliderimages', 
    success:function(res){      
      var parseres = $.parseJSON(res);
      var slider = parseres.slider; 
      var tot_slides = slider.length;
      for(var i=0;i<tot_slides;i++){
        var adv_img_path = slider[i].adv_img_path;
        slides+='<div class="swiper-slide dash_slides"><img src="'+base_url+adv_img_path+'" class="w-100 slide-height"></div>';
      }
      if(tot_slides>0){ 
        $(".swiper-wrapper").html(slides);
          var swiper2 = new Swiper('.swiper-container_slider1', {
          //parallax: true,
          //autoHeight: true,
          setWrapperSize: true,
          slidesPerView: 1,
          spaceBetween: 0,  
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            dynamicBullets: true,
          },
          observer: true,
          observeParents: true, 
        });
      }else{
        $(".swiper-container_slider1").remove();
      }
      /*var total_records = parseres.total_records;
      if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }*/
    }
  });
  app.preloader.hide();
});
/*$(document).on('page:init', '.page[data-name="company_category"]', function (page) {
  checkConnection();
  app.preloader.show();
  //$(".slider").removeClass("slider_bottom");
  $(".swiper-container_slider").removeClass("slider_bottom");
   

  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getCategoriesDashboard', 
    success:function(res){      
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      $(".dashcats").html(html);      
    }
  });
  app.preloader.hide();
});*/
/*$(document).on('page:init', '.page[data-name="company_category"]', function (page) {
  checkConnection();
  app.preloader.show();
  var c_name = page.detail.route.params.c_name;
  $(".cat_name").html(c_name);
  app.preloader.hide();
});*/
/*$(document).on('page:init', '.page[data-name="company_category"]', function (page) {
  checkConnection();
  var c_id = page.detail.route.params.c_id; 
  var c_name = page.detail.route.params.c_name;
  var segment = page.detail.route.params.segment;
  app.preloader.show();
  $(".cat_name").html(c_name);
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getCategoriesData',
    data:{'c_id':c_id,'c_name':c_name,'segment':segment},
    success:function(res){
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      var slider = parseres.slider;
      var total_records = parseres.total_records;
      if(total_records==0){
        $(".slider").addClass("slider_bottom");
      }else{
        $(".slider").removeClass("slider_bottom");
      }
      $(".comps").html(html);
      $(".slider").html(slider);
    }
  });
  app.preloader.hide();
});*/
function slideradjust(){
  //$(".slider").removeClass("slider_bottom");
  //$(".swiper-container_slider").removeClass("slider_bottom");
}
function view_products(comp_id,cat_name,comp_name){
  checkConnection();
  mainView.router.navigate("/products/"+comp_id+"/"+cat_name+"/"+comp_name+"/");
}
$(document).on('page:init', '.page[data-name="products"]', function (page) {
  checkConnection();
  var comp_id = page.detail.route.params.comp_id; 
  var cat_name = page.detail.route.params.cat_name;
  var comp_name = page.detail.route.params.comp_name;
  app.preloader.show();
  $(".cat_name").html(cat_name);
  var slides='';
  var slides='';
  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/sliderimages', 
    success:function(res){      
      var parseres = $.parseJSON(res);
      var slider = parseres.slider; 
      var tot_slides = slider.length;
      for(var i=0;i<tot_slides;i++){
        var adv_img_path = slider[i].adv_img_path;
        slides+='<div class="swiper-slide dash_slides"><img src="'+base_url+adv_img_path+'" class="w-100 slide-height"></div>';
      }
      if(tot_slides>0){
        $(".swiper-wrapper").html(slides);
          var swiper3 = new Swiper('.swiper-container_slider', {
          //parallax: true,
          //autoHeight: true,
          setWrapperSize: true,
          slidesPerView: 1,
          spaceBetween: 0,  
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            dynamicBullets: true,
          },
          observer: true,
          observeParents: true, 
        });
      }else{
        $(".swiper-container_slider").remove();
      }
      var total_records = parseres.total_records;
      /*if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }*/
    }
  });

  $.ajax({
    type:'POST',     
    url:base_url+'APP/Appcontroller/getProducts',
    data:{'comp_id':comp_id,'comp_name':comp_name},
    success:function(res){
      var parseres = $.parseJSON(res);
      var html = parseres.html;
      /*var slider = parseres.slider;
      var total_records = parseres.total_records;
      var tot_slides = slider.length;
      for(var i=0;i<tot_slides;i++){
        var adv_img_path = slider[i].adv_img_path;
        slides+='<div class="swiper-slide dash_slides"><img src="'+base_url+adv_img_path+'" class="w-100 slide-height"></div>';
      }
      if(tot_slides>0){
        $(".swiper-wrapper").html(slides);
          var swiper1 = new Swiper('.swiper-container_slider', {
          //parallax: true,
          //autoHeight: true,
          setWrapperSize: true,
          slidesPerView: 1,
          spaceBetween: 0,  
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            dynamicBullets: true,
          },
          observer: true,
          observeParents: true, 
        });
      }else{
        $(".swiper-container_slider").remove();
      }
      if(total_records==0){ 
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");        
      }*/
      
      /*if(total_records==0){ 
        $(".swiper-container_slider").addClass("slider_bottom");
      }else if(total_records==1){ 
        $(".swiper-container_slider").removeClass("slider_bottom");
        $(".swiper-container_slider").addClass("pos_slider");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");        
      }*/
      var total_records = parseres.total_records;
      /*if(total_records==0){
        $(".swiper-container_slider").addClass("slider_bottom");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom");
      }*/
      if(total_records==0){
        $(".swiper-container_slider").removeClass("slider_bottom"); 
        $(".swiper-container_slider").addClass("slider_bottom_prod");
      }else if(total_records==1){ 
        $(".swiper-container_slider").removeClass("slider_bottom");
        $(".swiper-container_slider").removeClass("slider_bottom_prod");
        $(".swiper-container_slider").addClass("pos_slider");
      }else{
        $(".swiper-container_slider").removeClass("slider_bottom"); 
        $(".swiper-container_slider").removeClass("slider_bottom_prod");
      }
      $(".products").html(html);
      //$(".slider").html(slider);
    }
  });
  app.preloader.hide();
});
function openpopup(cat_name,comp_name,comp_desc){
  var dynamicPopup = app.popup.create({
  content: '<div class="popup over_scroll">'+'<div class="block"><p><a href="#" class="link popup-close text-red fw-600">CLOSE ME</a></p><div class="block-title">Category </div><div class="block"><p class="text-uppercase">'+cat_name+'</p></div><div class="block-title">Company name</div><div class="block"><p class="text-uppercase">'+comp_name+'</p></div><div class="block-title">Description </div><div class="block"><p class="text-uppercase">'+comp_desc+'</p></div></div>',
  });
  dynamicPopup.open();
}
function openpopup_product(comp_name,p_name,p_desc){
  var dynamicPopup_prod = app.popup.create({
  content: '<div class="popup over_scroll">'+'<div class="block"><p><a href="#" class="link popup-close text-red fw-600">CLOSE ME</a></p><div class="block-title">Company </div><div class="block"><p class="text-uppercase">'+comp_name+'</p></div><div class="block-title">Product </div><div class="block"><p class="text-uppercase">'+p_name+'</p></div><div class="block-title">Product Description </div><div class="block"><p class="text-uppercase">'+p_desc+'</p></div></div>',
  });
  dynamicPopup_prod.open();
}
// -------------------------------- L O G O U T -------------------------------- //
function logOut(){
  checkConnection();
  window.localStorage.removeItem("session_regid"); 
  window.localStorage.removeItem("session_user_name"); 
  window.localStorage.removeItem("session_user_cid");   
  window.localStorage.removeItem("session_user_email"); 
  window.localStorage.removeItem("session_user_mob"); 
  window.localStorage.removeItem("session_user_state"); 
  window.localStorage.removeItem("session_user_city");
  window.localStorage.removeItem("session_user_add");
  window.localStorage.removeItem("session_user_zcode");
  window.localStorage.removeItem("session_user_cdate");
  mainView.router.navigate('/');   
  app.panel.close();
} 
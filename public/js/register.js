window.addEventListener('load', function () {
    let eye = document.querySelector('.eye');
    let username = document.querySelector('.username');
    let passwords = document.querySelectorAll('.password');
    let dlanniu = document.querySelector('.dlanniu');
    let verify = document.querySelector('.verify')
    let img = eye.querySelector('img');
    let flag = true;
    // 密码可视化js
    eye.addEventListener('click', function () {
        if (flag) {
            passwords[0].type = 'text';
            passwords[1].type = 'text';
            img.src = 'https://img.js.design/assets/img/62b282a3f7713cce283e2e00.png';
            flag = false;
        } else {
            passwords[0].type = 'password';
            passwords[1].type = 'password';
            img.src = 'https://img.js.design/assets/img/62b282baf59c9f23db7e6368.png';
            flag = true;
        }
    })

    // dlanniu.classList.add("disClick");
    // 注册按钮是否可以点击的布尔判断变量
    var btnClick1 = false;
    var btnClick2 = false;
    var btnClick3 = false;
    var btnClick4 = false;

    let p1 = document.querySelector('.p-1')
    username.addEventListener('blur', function () {
        if (username.value != '') {
            if (!localStorage.getItem(username.value)) {
                // 里面可以写axios向接口发送请求判断用户名是否可用
                p1.style.color = 'green'
                p1.innerHTML = '用户名可用';
                btnClick1 = true;

            } else {
                p1.style.color = 'red'
                p1.innerHTML = '用户名已存在';
                btnClick1 = false;
            }
        }

    })
    let p2 = document.querySelector('.p-2')
    let p3 = document.querySelector('.p-3')
    passwords[0].addEventListener('blur', function () {
        if (passwords[0].value != '') {
            let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)/;
            if (!reg.test(passwords[0].value)) {
                // alert('密码错误,至少包含数字、字母、符号中的2种');
                p2.style.color = 'red';
                p2.innerHTML = '密码错误,至少包含数字、字母、符号中的2种';
                btnClick2 = false;
            } else {
                p2.style.color = 'green';
                p2.innerHTML = '格式正确';
                btnClick2 = true;
            }
            if (!(this.value.length >= 8 && this.value.length <= 16)) {
                p3.style.color = 'red';
                p3.innerHTML = '长度错误,请输入长度在8~16位之间的密码';
                btnClick3 = false;
            } else {
                p3.style.color = 'green';
                p3.innerHTML = '长度合适';
                btnClick3 = true;
            }
        }

    })
    let p4 = document.querySelector('.p-4')
    passwords[1].addEventListener('blur', function () {
        if (passwords[1].value != '') {
            if (passwords[0].value != passwords[1].value) {

                p4.style.color = 'red';
                p4.innerHTML = '两次密码输入不一致';
                btnClick4 = false;
            } else if (passwords[0].value == passwords[1].value) {

                p4.style.color = 'green';
                p4.innerHTML = '两次密码输入一致';
                btnClick4 = true;
            }
        }
    })
    let p5 = document.querySelector('.p-5')

    dlanniu.addEventListener('click', function (e) {
        if(btnClick1 && btnClick2 && btnClick3 && btnClick4){
            if (username.value != '' && passwords[0].value != '' && passwords[1].value != '' ) {
                // 当符合登录注册要求时
                var userName = document.querySelector(".username").value;
                var userPwd = document.querySelectorAll(".password")[0].value;
                var sexs = document.querySelectorAll(".sex-text input");
                for(let i = 0;i<sexs;i++){
                    if(sexs[i].checked){
                        var userSex = sexs[i].value;
                    }
                }
                var params = {
                    userName:userName,
                    userPwd:userPwd,
                    userSex:userSex
                }

                var registerUrl = "http://127.0.0.1:3000/admin/register";
                axios({
                    method:"post",
                    url:registerUrl,
                    data:params
                }).then((res)=>{
                    if(res.data == "注册成功"){
                        layer.msg('注册成功'); 
                        setTimeout(() => {
                            window.location.href = "../static/login.html"
                        }, 2000);
                    }
                })
                
            } 
        }else{
            layer.msg('请输入正确的注册格式'); 
        }
    })
})
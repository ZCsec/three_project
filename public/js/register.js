window.addEventListener('load', function () {
    let eye = document.querySelector('.eye');
    let username = document.querySelector('.username');
    let passwords = document.querySelectorAll('.password');
    let dlanniu = document.querySelector('.dlanniu');
    let verify = document.querySelector('.verify')
    let img = eye.querySelector('img');
    let flag = true;
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
    let p1 = document.querySelector('.p-1')
    username.addEventListener('blur', function () {
        if (username.value != '') {
            if (!localStorage.getItem(username.value)) {
                p1.style.color = 'green'
                p1.innerHTML = '用户名可用';

            } else {
                p1.style.color = 'red'
                p1.innerHTML = '用户名已存在';
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
            } else {
                p2.style.color = 'green';
                p2.innerHTML = '格式正确';
            }
            if (!(this.value.length >= 8 && this.value.length <= 16)) {
                p3.style.color = 'red';
                p3.innerHTML = '长度错误,请输入长度在8~16位之间的密码';
            } else {
                p3.style.color = 'green';
                p3.innerHTML = '长度合适';
            }
        }

    })
    let p4 = document.querySelector('.p-4')
    passwords[1].addEventListener('blur', function () {
        if (passwords[1].value != '') {
            if (passwords[0].value != passwords[1].value) {

                p4.style.color = 'red';
                p4.innerHTML = '两次密码输入不一致';
            } else if (passwords[0].value == passwords[1].value) {

                p4.style.color = 'green';
                p4.innerHTML = '两次密码输入一致';
            }
        }
    })
    let p5 = document.querySelector('.p-5')

    dlanniu.addEventListener('click', function (e) {
        if (username.value != '' && passwords[0].value != '' && passwords[1].value != '' && verify.value != '') {
            if (!localStorage.getItem(username.value)) {
                localStorage.setItem(username.value, passwords[0].value);
                p1.style.color = '#999'
                p1.innerHTML = '取一个你自己喜欢的用户名吧';
                p2.style.color = '#999'
                p2.innerHTML = '至少包含数字、字母、符号中的2种';
                p3.style.color = '#999'
                p3.innerHTML = '请输入长度在8~16位之间的密码';
                p4.style.color = '#999'
                p4.innerHTML = '两次输入的密码要一致';
                p5.style.color = '#999'
                p5.innerHTML = '输入右侧图片里的数字';
                passwords[0].value = '';
                passwords[1].value = '';
                username.value = '';
                verify.value = '';
                alert('注册成功');
                location.href = 'register.html';
            }
        } else {
            alert('账号、密码或验证码不能为空')
        }

    })
})
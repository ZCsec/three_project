window.addEventListener('load', function () {
    let eye = document.querySelector('.eye');
    let username = document.querySelector('.username');
    let password = document.querySelector('.password');
    let check = document.querySelector('.check');
    let dlanniu = document.querySelector('.dlanniu');
    let verify = document.querySelector('.verify')
    let img = eye.querySelector('img');
    let flag = true;
    img.addEventListener('click', function () {
        if (flag) {
            password.type = 'text';
            img.src = 'https://img.js.design/assets/img/62b282a3f7713cce283e2e00.png';
            flag = false;
        } else {
            password.type = 'password';
            img.src = 'https://img.js.design/assets/img/62b282baf59c9f23db7e6368.png';
            flag = true;
        }
    })
    if (localStorage.getItem('username')) {
        username.value = localStorage.getItem('username');
        password.value = localStorage.getItem('password');
        check.checked = true;
    }
    check.addEventListener('change', function () {
        if (this.checked) {
            localStorage.setItem('username', username.value)
            localStorage.setItem('password', password.value)

        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    })
    // console.log(localStorage.getItem(username.value));
    // dlanniu.addEventListener('click', function (e) {
    //     let name = username.value;
    //     localStorage.setItem('name', name);
    //     if (username.value == '' || password.value == '' ) {
    //         e.preventDefault();
    //         alert('用户名、密码为空或验证码输入错误');
    //     } else if (!localStorage.getItem(username.value)) {
    //         e.preventDefault();
    //         alert('用户名未注册');
    //     }
    // })
})
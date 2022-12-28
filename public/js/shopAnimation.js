    // 先获取加入购物车按钮
    var cartBtn = document.querySelector(".btn-cart2")
    var cartIcon = document.querySelector(".top-main-right ul li:nth-child(3)")
    var goodsTitle = document.querySelector(".sp2 h3")
    var heart = document.querySelector(".animationHeart")
    heart.style.display = "none";
    cartBtn.addEventListener("click",function(e){
        // 获取到按钮当前的坐标位置
        var startPos1 = {
            x:cartBtn.offsetLeft,
            y:cartBtn.offsetTop
        }
        // 获取动画结束位置
        var targetPos1 = {
            x:cartIcon.offsetLeft,
            y:cartIcon.offsetTop
        }

        heart.style.display = "block";
        

        // 商品名字
        var goodsName = document.querySelector(".sp2 h3").innerText;
        // 商品数量
        var goodsNum = document.querySelector(".goodsNum").value
        // 商品价格
        var goodsPrice = document.querySelector(".price-regular").innerText
        goodsPrice = goodsPrice.substring(1,4);
        // 商品总价
        var totalPrice = goodsNum * goodsPrice;
        console.log("单价是"+goodsPrice);
        console.log("价格是"+totalPrice);
        // 商品尺寸
        var select = document.querySelector(".nice-select");
        var index = select.selectedIndex;
        var goodsSize = select.options[index].text 
        
        // 用户id
        var userId = window.location.search;
        userId = userId.substring(userId.indexOf("userId="),userId.indexOf("&province"))
        userId = userId.substring(userId.indexOf("=")+1,userId.length)
        // 商品id
        var goodsId = window.location.search;
        goodsId = goodsId.substring(goodsId.indexOf("goodsId="),goodsId.indexOf("&userType"))
        goodsId = goodsId.substring(goodsId.indexOf("=")+1,goodsId.length)
        // 当前地址
        var province = window.location.search;
        province = province.substring(goodsId.indexOf("province="),province.length);
        province = province.substring(goodsId.indexOf("=")+1,province.length)


        var params={
            goodsName:goodsName,
            goodsId:goodsId,
            userId:userId,
            goodsNum:goodsNum,
            goodsPrice:goodsPrice,
            totalPrice:totalPrice,
            goodsSize:goodsSize
        }

        console.log(userId);
        // 接口地址 购物车表 goodsId userId goodsNum goodsPrice totalPrice
        var url = 'http://127.0.0.1:3000/admin/shopCartMsg?' + "province=" + province;

        // 当点击按钮时向接口发送ajax请求
        axios({
            method:"post",
            url:url,
            data:params
        }).then((res)=>{
            if(res.data == "添加成功"){
                // parabolaAnimation(startPos1, targetPos1,heart, animationTime = 400, time = 10, ()=>{
                //     // console.log("动画执行结束");
                //     heart.style.display = "none";
                //     location.reload();
                // });
                layer.msg('添加成功'); 
            }
        })


    })

// 元素抛物线动画

// startPos 动画元素起始位置

// targetPos 动画元素结束位置

// animationDom 动画元素

// animationTime 动画执行时间

// time 动画执行间隔

// callback动画执行完回调函数

function parabolaAnimation(startPos, targetPos, animationDom, animationTime = 400, time = 10, callback) {

    const [x1, x2, y1, y2] = [parseInt(-startPos.x), parseInt(-targetPos.x), parseInt(-startPos.y), parseInt(-targetPos.y)]

    const x3 = (x1 + x2) * 3 / 5

    const y3 = y2 + 30

    const dom = document.createElement('img')

    dom.src = '../static/img/facebook.png'

    dom.width = 30

    dom.height = 30

    const animationDoms = animationDom ? animationDom : dom

    const speedX = (x2 - x1) * time / animationTime

    let times = 0

    animationDoms.style.position = 'fixed'

    animationDoms.style.left = `${-x1}px`

    animationDoms.style.top = `${-y1}px`

    animationDoms.style.zIndex = '10000'

    document.body.appendChild(animationDoms)

    // 利用抛物线方程： y = ax^2 + bx + c 带入三点坐标求得抛物线方程系数 a, b, c 。再根据方程，传入X 求Y

    const a = (y3 - y1 + (y2 - y1) * (x1 - x3) / (x2 - x1)) / (x3 * x3 - x1 * x1 - (x3 - x1) * (x1 + x2))

    const b = (y2 - y1 + a * x1 * x1 - a * x2 * x2) / (x2 - x1)

    const c = y1 - a * x1 * x1 - b * x1

    const timer = setInterval(() => {

        times += 1

        const x = x1 + speedX * times

        const y = a * x * x + b * x + c

        if (times * time > animationTime) {

            clearInterval(timer)

            document.body.removeChild(animationDoms)

            callback && callback()

        } else {

            animationDoms.style.left = `${-x}px`

            animationDoms.style.top = `${-y}px`

        }

    }, time)

}



// 执行完抛物线动画，可以在让购物车按钮加点抖动动画效果，抖动动画：

// 元素抖动动画

// maxDistance 抖动偏移距离

// interval  抖动快慢，数字越小越快，太小DOM反应不过来，看不出动画

// quarterCycle 一次完整来回抖动的四分之一周期

function shakingAnimation(el, maxDistance = 5, interval = 15, quarterCycle = 8) {

    let curDistance = 0

    let direction = 1

    const timer = setInterval(function () {

        if (direction > 0) {

            curDistance++

            if (curDistance === maxDistance) {

                direction = -1

                maxDistance -= 1

            }

        } else {

            curDistance--

            if (curDistance === -maxDistance) {

                direction = 1

            }

        }

        el.style.transform = `translateY(${curDistance}px)`;

    }, interval)

    setTimeout(function () {

        clearInterval(timer)

        el.style.transform = `translateY(0)`;

    }, maxDistance * interval * quarterCycle);

}
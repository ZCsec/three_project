function ajax(options){
    var defaults = {
        type:"get",
        url:"",
        data:{},
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(){

        },
        error:function(){

        }
    }
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults,options);
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 拼接请求参数
    var params = "";
    for(var attr in defaults.data){
        params += attr + "=" + defaults.data[attr] + "&"
    }
    // 将参数最后面的&截取掉
    params = params.substring(0,params.length-1);
    // 判断请求方式
    if(defaults.type == "get" ){
        defaults.url = defaults.url + "?" + params;
    }
    // 配置ajax
    xhr.open(defaults.type,defaults.url);
    // 如果请求方式是post
    if(defaults.type == "post"){
        // 用户希望向服务器端传递的参数类型
        var contentType = defaults.header["Content-Type"];
        // 设置请求参数格式类型
        xhr.setRequestHeader("Content-Type",contentType)
        // 判断类型是否是JSON
        if(contentType == "application/JSON"){
            xhr.send(JSON.stringify(defaults.data))
        }else{
            xhr.send(params)
        }
    }else{
        // get请求 send 不需要参数 
        xhr.send();
    }
    // 监听xhr对象onload事件
    xhr.onload = function(){
        // 获取相应头中的数据
        var contentType = xhr.getResponseHeader("Content-Type");
        // 服务器返回的数据
        var responseTest = xhr.responseText;
        // 如果响应头类型中包含application/json
        if(contentType!=null && contentType.includes("application/json")){
            responseTest = JSON.parse(responseTest)
        }
        // 当http状态码为200
        if(xhr.status == 200){
            // 请求成功
            defaults.success(responseTest,xhr)
        }else{
            // 请求失败
            defaults.error(responseTest,xhr)
        }
    }
}   
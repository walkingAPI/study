var xmlhttp;
function ajaxLoad(url,fun){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        //IE5,IE6 浏览器代码
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xmlhttp.onloadajax = fun;
    xmlhttp.open('GET',url,true);
    //设置头部信息
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}

function myFunction(){
    ajaxLoad('/try/ajax/ajax_info.txt',function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200){
            document.getElementById('myDiv').innerHTML = xmlhttp.responseText;  //responseXML
            document.getElementById('myDiv').innerHTML = xmlhttp.responseXML;
            //检索资源（文件）的头信息。
            document.getElementById('myDiv').innerHTML=xmlhttp.getAllResponseHeaders(); //方法返回所有的响应头
            //用AJAX进行一次指定的 HEAD 请求
            document.getElementById('myDiv').innerHTML="Last modified: " + xmlhttp.getResponseHeader('Last-Modified');
            //读取来自 JSON 文件的信息
            document.getElementById('myDiv').innerHTML=JSON.parse(this.responseText);

        }
    });
}

/**  关于JSON
1.JSON.parse(text, reviver): 将一个 JSON 字符串转换为 JavaScript 对象。
参数说明：text:必需， 一个有效的 JSON 字符串。   reviver: 可选，一个转换结果的函数， 将为对象的每个成员调用此函数。

2.JSON.stringify(value, replacer, space): 将 JavaScript 值（通常为对象或数组）转换为 JSON 字符串。
参数说明：value:必需， 要转换的 JavaScript 值（通常为对象或数组）
replacer:可选。用于转换结果的函数或数组。
space:可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格

3.可以使用 delete 关键字来删除 JSON 对象的属性：delete myObj.sites.site1;
可以使用 for-in 来访问json数组
delete 运算符并不是彻底删除元素，而是删除它的值，但仍会保留空间。
运算符 delete 只是将该值置为 undefined，而不会影响数组长度，即将其变为稀疏数组

4.splice() 方法 可以彻底删除JSON对象属性
var test = [{ "a": "1", "b": "2" }, { "a": "3", "b": "4" }, { "a": "5", "b": "6" }];
test.length   //输出为 3
test.splice(1, 1);
test.length   //输出为 2

5.eval() 可用于将 JSON 文本转换为 JavaScript 对象
eval() 函数使用的是 JavaScript 编译器，可解析 JSON 文本，然后生成 JavaScript 对象。必须把文本包围在括号中，这样才能避免语法错误：
var obj = eval ("(" + txt + ")");
 */


/**解析数据
1.JSON 不能存储 Date 对象。
如果你需要存储 Date 对象，需要将其转换为字符串。
之后再将字符串转换为 Date 对象。
var text = '{ "name":"Runoob", "initDate":"2013-12-14", "site":"www.runoob.com"}';
var obj = JSON.parse(text);
obj.initDate = new Date(obj.initDate);

可以启用 JSON.parse 的第二个参数 reviver，一个转换结果的函数，对象的每个成员调用此函数

2.JSON 不允许包含函数，但你可以将函数作为字符串存储，之后再将字符串转换为函数。
var text = '{ "name":"Runoob", "alexa":"function () {return 10000;}", "site":"www.runoob.com"}';
var obj = JSON.parse(text);
obj.alexa = eval("(" + obj.alexa + ")");

3.JSON.stringify() 会将所有日期转换为字符串。
JSON 不允许包含函数，JSON.stringify() 会删除 JavaScript 对象的函数，包括 key 和 value。
解决办法：将函数转换为字符串来避免以上问题的发生
var obj = { "name":"Runoob", "alexa":function () {return 10000;}, "site":"www.runoob.com"};
obj.alexa = obj.alexa.toString();
var myJSON = JSON.stringify(obj);
 */



/** 对象转换成数组
 1.只是为了得到对象的key的集合或者value的集合
var arr = []
for (let i in obj) {
    arr.push(i)); //属性
    //arr.push(obj[i]); //值
}
2.完全把对象转换成数组
var arr = []
for (let i in obj) {
    let o = {};
	o[i] = obj[i];
	arr.push(o)
}
 */

/**
Object.entries(object)   //返回一个给定对象自身可枚举属性的键值对数组
此方法与上面for in 方法也不同：for in返回的是[{},{},{}] 
而此方法返回的是：[[key,value],[key,value],[key,value]]
 */




/**
 Array.from() 方法，用于数组的浅拷贝。就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
 tips: 1. object中必须有length属性，返回的数组长度取决于length长度
       2.key 值必须是数值
       3.而且key的数值就代表着你在数组中key-1的位置，如果没有这个位置 就会显示undefined
 */

/**
 1.Object.values(object)
 返回一个对象所有可枚举属性值
 2.Object.keys(object)
 返回一个对象所有可枚举keys
 */

 /**JSONP(因为同源策略)
是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。
  */

//关于setTimeout注意：
; (function () {
    function fn() {
        alert(2)
    }
    setTimeout('fn()', 1000); // 全局变量 打印1
    setTimeout(fn, 1000); // 局部变量 打印2
    setTimeout(fn(), 10000);    //立即执行 局部变量  打印2
})()

function fn() {
    alert(1)
}


/**

关于delete：

一、delete是干什么的：
delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
二、delete使用要注意什么：
如果你试图删除的属性不存在，那么delete将不会起任何作用，但仍会返回true
如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，delete操作只会在自身的属性上起作用）
任何使用 var 声明的属性不能从全局作用域或函数的作用域中删除。
这样的话，delete操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
除了在全局作用域中的函数不能被删除，在对象(object)中的函数是能够用delete操作删除的。
任何用let或const声明的属性不能够从它被声明的作用域中删除。
不可设置的(Non-configurable)属性不能被移除。这意味着像Math, Array, Object内置对象的属性以及使用Object.defineProperty()方法设置为不可设置的属性不能被删除。
 */
//如下几种写法都是可以的：
(function foo(){/*...*/}());

(function foo(){/*...*/})();

!function foo() {/*...*/}();

+function foo() {/*...*/}();

-function foo() {/*...*/}();

~function foo() {/*...*/}();

//在需要表达式的场景下，就不需要用括号括起来了：
void function(){/*...*/}();         //void声明了不需要返回值

var foo = function(){/*...*/}();        //将IIFE函数的返回值赋给了foo

true && function () { /*...*/ }();

0, function () { /*...*/ }();


//---------------------------------------------

a  =  b  +  c 
;(function  () { 
  // code 
})();
//如果没有第二行的分号，那么该处有可能被解析为c()而开始执行。所以有的时候，可能会看到这样的写法：;(function foo(){/*...*/}())，前边的分号可以认为是防御型分号。

//$(function(){/*...*/});是$(document).ready(function(){/*...*/})的简写形式，是在DOM加载完成后执行的回调函数，并且只会执行一次。
$( document ).ready(function() {
    console.log( "ready!" );
 }); 

 $(function() {
    console.log( "ready!" );
 });

 //起到的效果完全一样。
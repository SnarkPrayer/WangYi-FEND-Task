//公用函数

/**
 * 元素获取
 * @param {string} id id名
 */
function $(id) {
	return document.getElementById(id);
}


//获取css
function getStyle(ele, name) {
	if (ele.currentStyle) {
		// IE下的处理
		return ele.currentStyle[name];
	} else {
		// 标准浏览器处理
		return getComputedStyle(ele, false)[name];
	}
}

/**
 *  显示隐藏函数,如果是显示就隐藏,是隐藏就显示
 * @param {object} obj 需要在点击或hover后实现点击显示隐藏.的对象
 */
function showHide(obj) {
	var objDisplay = getStyle(obj, "display");
	if (objDisplay == "none") {
		obj.style.display = "block";
	} else {
		obj.style.display = "none";
	}
}

/**
 * 设置cookie
 * @param {string} name cookie名
 * @param {string} value cookie值
 * @param {number} end 有效时间（day）
 */
function setCookie(name, value, end) {
	var exdate = new Date();
	exdate.setDate(exdate.getDay() + end);
	document.cookie = name + "=" + value + ";expires=" + exdate;
}

/**
 * 获取cookie
 * @param {string} name cookie名
 */
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';'); //把cookie分割成组  
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]; //取得字符串  
		while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格  
			c = c.substring(1, c.length); //有的话，从第二位开始取  
		}
		if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name  
			return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值  
		}
	}
	return false;
}


//页面逻辑
/**
 * 顶部提示条关闭
 * @param {Type}  
 */
function tiphidden() {
	this.style.display = 'none';
	setCookie("tip", "false", 30);
}

$('tips').addEventListener('click', tiphidden, false);

//检测cookie

function cookiecheck() {
	if (getCookie('tip')) {
		$('tips').style.display = 'none';
	} else {
		setCookie("tip", "false", 30);
	}
}
cookiecheck();

//登陆
function followclick() {
	if (getCookie('loginSuc')) {
		//			得到cookie，改变样式
		//			followstyle();
		//			从服务器得到数据，添加关注
		//			followcookie();
	} else {
		//显示登陆层
		showHide($('login-warp'));
	}
}


$('followbtn').addEventListener('click', followclick, false);
$('iconclose').onclick = function () {
	$('login-warp').style.display = 'none';
}

//输入验证
function inputchenk() {
	//	var username = $()
}

//登陆函数
//function loginsend(){
//	var user = $('login-warp').getElementsByTagName('input')[0];
//	var pass = $('login-warp').getElementsByTagName('input')[1];
//	var send = {
//		uesrName:md5(user.value()),
//		passWord:md5(pass.value())
//	}
//	ajax("get","http://study.163.com /webDev/login.htm",)
//}
function Ajax() {
	var xmlhttp;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "http://study.163.com /webDev/login.htm", true);
	xmlhttp.send();
}
window.onload = Ajax;
//公用函数

/**
 * 元素获取
 * @param {string} id id名
 */
function $(id) {
	return document.getElementById(id);
}

/**通过class类名来选取元素
 * @param   {Object} parent 父级对象,
 * @param   {String} sClass className类名
 * @returns {Array}  获取到的节点数组
 */
function getByClassName(parent, sClass) {
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(sClass);
	} else {
		var oEle = parent.getElementsByTagName("*"),
			arr = [],
			reg = new RegExp("\\b" + sClass + "\\b");
		for (var i = 0, len = oEle.length; i < len; i++) {
			if (reg.test(oEle[i].className)) {
				arr.push(oEle[i]);
			}
		}
		return arr;
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


/**
 * Ajax函数
 * @param {Type} type get por post
 * @param {Type} url 请求地址
 * @param {Type} data 数据
 * @param {Type} success 请求成功执行函数
 * @param {Type} faild 请求失败执行函数
 */
function Ajax(type, url, data, success, failed) {
	// 1.创建ajax对象
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		//兼容ie6
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	var type = type.toUpperCase();
	// 用于清除缓存
	var random = Math.random();

	if (typeof data == 'object') {
		var str = '';
		for (var key in data) {
			str += key + '=' + data[key] + '&';
		}
		data = str.replace(/&$/, '');
	}
	//2.拼接传入的json,链接服务器
	if (type == 'GET') {
		if (data) {
			xhr.open('GET', url + '?' + data, true);
		} else {
			xhr.open('GET', url + '?t=' + random, true);
		}
		//3.发送请求
		xhr.send();
	} else if (type == 'POST') {
		xhr.open('POST', url, true);
		// 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}

	// 4.处理返回数据
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				success(xhr.responseText);
			} else {
				if (failed) {
					failed(xhr.status);
				}
			}
		}
	};
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
	if (getCookie('loginSuc')) {
		loginSuccess();
	}
}
cookiecheck();

//输入验证
function inputchenk() {
	//	var username = $()
}

//关注与登陆函数

function follow() {
	//判断是否已登陆
	if (getCookie('loginSuc') === 'true') {
		followshow(); //更改关注样式
	} else {
		//显示登陆层
		loginshow();
	}
}
//登陆函数
function login() {
	var user = $('username');
	var pass = $('password')

	var send = {
		userName: md5(user.value),
		password: md5(pass.value)
	};
	//提交
	Ajax("GET", "http://study.163.com/webDev/login.htm", send, loginSuccess, function (error) {
		console.log("服务器响应失败,错误号:" + error);
	});
}

function loginSuccess() {
	//设置登录cookie
	setCookie('loginSuc', 'true', 30);
	//更改关注样式
	$('followbtn').style.display = 'none';
	$('unfollowbtn').style.display = 'inline';
	//登陆层消失
	loginhide();
}

//登陆层显示
function loginshow() {
	$('login-warp').style.display = 'block';
}

//登录层消失
function loginhide() {
	$('login-warp').style.display = 'none';
}

$('login-btn').addEventListener('click', login, false);
$('followbtn').addEventListener('click', follow, false);
$('iconclose').addEventListener('click', loginhide, false);


//slide
window.onload = function slide() {
	var oBox = $("slide");
	var aUl = oBox.getElementsByTagName("ul");
	var aImg = aUl[0].getElementsByTagName("li");
	var aNum = aUl[1].getElementsByTagName("li");
	var timer = play = null;
	var i = index = 0;
	//切换按钮
	for (i = 0; i < aNum.length; i++) {
		aNum[i].index = i;
		aNum[i].onmouseover = function () {
			show(this.index)
		}
	}
	//鼠标划过关闭定时器
	oBox.onmouseover = function () {
		clearInterval(play)
	};

	//鼠标离开启动自动播放
	oBox.onmouseout = function () {
		autoPlay()
	};

	//自动播放函数
	function autoPlay() {
		play = setInterval(function () {
			index++;
			if (index >= aImg.length) {
				index = 0;
			}
			show(index);
		}, 5000);
	}
	autoPlay(); //应用
	//图片切换, 淡入淡出效果
	function show(a) {
		var index = a;
		var alpha = 0;
		for (var i = 0; i < aImg.length; i++) {
			aImg[i].className = "";
			aNum[i].className = "";
		}
		clearInterval(timer);
		aImg[index].className = 'current';
		aNum[index].className = 'current';
		timer = setInterval(function () {
			alpha += 2;
			alpha > 100 && (alpha = 100);
			aImg[index].style.opacity = alpha / 100;
			aImg[index].style.filter = "alpha(opacity = " + alpha + ")";
			alpha == 100 && clearInterval(timer)
		}, 10)
	}
}

//课程列表

function course() {
	var pageNumber = 1;
	var psizeNumber = 20;
	var typeNumber = 10;

	var senddata = {
		"pageNo": pageNumber,
		"psize": psizeNumber,
		"type": typeNumber
	}

	Ajax("get", "http://study.163.com/webDev/couresByCategory.htm", senddata,
		function (str) {
			//成功时，创建html
			var arr = JSON.parse(str);
		console.log(arr);
			for (var i = 0; i < arr.list.length; i++) {
				var coursebox = document.createElement('div');
				coursebox.className = "course";

				var img = document.createElement('img');
				img.setAttribute('src', arr.list[i].middlePhotoUrl)

				var name = document.createElement('span')
				name.className = "name";
				name.innerHTML = arr.list[i].name

				var provider = document.createElement('span')
				provider.className = "provider";
				provider.innerHTML = arr.list[i].provider;

				var learnerCount = document.createElement('span')
				learnerCount.className = "learnerCount";
				learnerCount.innerHTML = "<img src=" + "imgs/learnerCount.png" + " >" + arr.list[i].learnerCount;

				var price = document.createElement('span')
				price.className = "price";
				price.innerHTML = "￥" + arr.list[i].price;

				var contentlist = $('courselist');

				var coursefa = contentlist.appendChild(coursebox);
				coursefa.appendChild(img);
				coursefa.appendChild(name);
				coursefa.appendChild(provider);
				coursefa.appendChild(learnerCount);
				coursefa.appendChild(price);

				if (price.innerHTML == "￥0") {
					price.innerHTML = "免费";
				}
			}
		}
	)
}
course();

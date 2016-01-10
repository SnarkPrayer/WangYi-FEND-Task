//function setCookie(name, value, end) {
//	var exdate = new Date();
//	exdate.setDate(exdate.getDate() + end);
//	document.cookie = name + "=" + name;
//	document.cookie = value + "=" + value
//}

function setCookie(name, value, day) {  
 seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。  
 var expires = "";  
 if (seconds != 0 ) {      //设置cookie生存时间  
 var date = new Date();  
 date.setTime(date.getDate()+day);  
 expires = "; expires="+date.toGMTString();  
 }  
 document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值  

setCookie("test","tank",1800);   
console.log(getCookie("test"))
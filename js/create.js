var item_left=document.querySelector(".item_left"); 

var right_imgs=document.querySelectorAll(".right_img");
var Ochecks=document.querySelectorAll(".check");

var right_down=document.querySelector(".right_down");
console.log(right_down)

var right_up=document.querySelector(".right_up");
var check=document.querySelector(".check");

var breadline=document.querySelector(".breadline");

var warn=document.querySelector(".warn");
var remind=document.querySelector('.remind')

var itemRight=document.querySelector('.item_right')

//获取页面中的一组div元素
var boxs=document.getElementsByClassName('right_box');
//获取一组check
var checks=document.getElementsByClassName('check');

var rename=document.querySelector(".rename");

var moveWrap=document.querySelector(".move_wrap");

console.log(moveWrap)

var moveItemDown=document.querySelector('.move_item_down');

var closeMove=document.querySelector('.move_item_upR')

//var activeFlie=right_down.getElementsByTagName('div');

//console.log(inputs)

//var right_box=document.querySelectorAll('.right_down .right_box');
 //console.log(right_box)


//子级的pid永远是父级的id,里面有id和pid是为了把所有数据关联起来。id是找到对应的数据。


//生成左侧的数据 字符串的方法

item_left.innerHTML = createList(data);
			
function createList(data){
	var str = '';
	
	for(var i=0; i<data.length; i++){
		if(data[i].checked) continue

		str += `<li><span class="items_tree" date-id="${data[i].id}"><i class="add" date-id="${data[i].id}"></i><span date-id="${data[i].id}">${data[i].name}</span></span>`;
		
		if(data[i].child){
			str += `<ul>${createList(data[i].child)}</ul>`;
		}
		
		str += `</li>`;
	}	
	return str;
}



//生成出中间的数据

createMidDiv(creatDivHtml(data,0));

//var aaa=createMidDiv(creatDivHtml(data,idd));

function createMidDiv(data){ 
	var str=``;	
	for (var i = 0; i < data.length; i++) {				
		str+=`<div class="right_box" date-id=${data[i].id}>
				<span class="check"></span>
				<div class="right_img" date-id=${data[i].id}></div>
				<input type="text" value=${data[i].name} date-id=${data[i].id}>
			</div>`;
	};
	right_down.innerHTML=str;	

}

function creatDivHtml(data,idd){
	var res=currentData=Pan.getChildrenById(data,idd);  
	return res;
}




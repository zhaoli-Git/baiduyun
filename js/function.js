
var idd=0;

// idd=~~e.target.parentNode.getAttribute('date-id')  //点击时候的id

currentObj=Pan.getDataById(data,idd);

currentData=Pan.getChildrenById(data,idd);

console.log(currentData)


//点击左侧的时候。面包屑和面板发生变化

item_left.onclick=function(e){
	console.log(e.target)
	if(e.target.nodeName.toUpperCase()==='SPAN' || e.target.classList.contains('add')){
		idd=Number.parseInt(e.target.getAttribute('date-id'));
		bread(data,idd);
		createMidDiv(creatDivHtml(data,idd));
		currentData=Pan.getChildrenById(data,idd)
		// console.log(e.target);
	}
}

//文件进入	利用事件委托，当点击选中框的时候给选中框加active属性,当点击文件图标的时候进入文件 
//其实就是再次利用文件生成			
right_down.onclick=function(e){			
	if(e.target.classList.contains('add') || e.target.nodeName.toUpperCase()==='DIV'  ){
		idd=Number.parseInt(e.target.getAttribute('date-id'));
		createMidDiv(creatDivHtml(data,idd));
		bread(data,idd);		
		console.log(idd);
		currentData=Pan.getChildrenById(data,idd);	
	}
	
	if(e.target.classList.contains('check')){
		//currentData=Pan.getChildrenById(data,idd);	
		//idd=Number.parseInt(e.target.parentNode.getAttribute('date-id'));
		
		e.target.classList.toggle('active2');
		
		e.target.parentNode.classList.toggle('active');	

		//e.target.parentNode.lastElementChild.classList.toggle('active')

		var idd=~~e.target.parentNode.getAttribute('date-id')  //点击时候的id
		var currentObj=Pan.getDataById(data,idd);

		//将选中的文件的checked变成true	,没有选中的时候，check变成false
		//先找到是active的那个对象，才能改变这个对象下的checked属性
		//console.log(currentObj)

		if(e.target.classList.contains('active2')){			
			currentObj.checked=true;
		}else{
			currentObj.checked=false; 
		}
		console.log(currentData);		
		
		if(isAllSelect()){
			rightAllBtn.classList.add('active2');
		}else{
			rightAllBtn.classList.remove('active2');
		}

	}		
}



//面包屑导航条函数  将选中的文件的父级全部找出来
function bread(data,idd){
	var bagParent=Pan.getParentsById(data,idd)

	var str='';
	for (var i = 0; i <bagParent.length; i++) {
		str=`<i>${bagParent[i].name}</i><span class="next_me">></span>`+str;
	}
	breadline.innerHTML=str;
	console.log(breadline)
	breadline.lastElementChild.remove(breadline.lastElementChild);
}

//新建文件夹
//思路：新建一个节点，放到right_down的文件夹中的最前面一个

var newfile=document.querySelector('.newfile');

newfile.onclick=function(){

	var str=document.createElement('div');
	var span=document.createElement('span');
	var div=document.createElement('div');
	
	
	var input=document.createElement('input');
	span.className="check";

	str.appendChild(span);
	str.appendChild(div);
	div.className="right_img";

	str.className='right_box';	
	
	str.appendChild(input);
	input.value="";			
	
	right_down.insertBefore(str,right_down.firstElementChild);
	input.focus();	

	input.onblur=function (e){
		currentData=Pan.getChildrenById(data,idd);
		
		var val=this.value.trim();  //去掉空格，防止空格的时候也能新建出文件夹
				
		if(val===''){
			right_down.removeChild(str);	
		}else{
			if(canUseName(currentData,val)){
				var newfileDta={
					name:val,
					id:++maxId,
					checked:false,
					pId:idd,
					child:[]
				}				
			
				currentData.unshift(newfileDta);					
				console.log(currentData)
				//三个函数再次调用
				remind.firstElementChild.innerHTML="新建文件夹成功";
				TweenMax.to(remind,0.5,{top:50,background:'#6982bb',opacity:1,scale:1,ease:Bounce.easeOut});
				TweenMax.to(remind,0.5,{top:-30,background:'#6982bb',opacity:0,delay:1.2});
				item_left.innerHTML = createList(data);															
				createMidDiv(creatDivHtml(data,idd));				
				bread(data,idd);}				

			else{
				console.log('名字冲突');
				this.select();
				warn.firstElementChild.innerHTML="命名重复";
				warn.lastElementChild.innerHTML="请重新命名";

				TweenMax.to(warn,0.5,{top:50,opacity:1,scale:1,ease:Bounce.easeOut})
				TweenMax.to(warn,0.5,{top:-30,opacity:0,delay:1.2})
			}				
		}
	}
}

//拿到同级下其他的文件夹名字，进行对比
function canUseName(data,val){
	for (var i = 0; i < data.length; i++) {		
		if(data[i].name==val){
			return false;
		}
	}
	return true;
}

var maxId=10; //设置一个最大的id，以后新建的都需要++  最后再来完善，写成一个函数


//判断active有没有
function isRename(){
	var temp=[];

	for (let i = 0; i < checks.length; i++) {
		temp.push(checks[i].classList.contains('active2'));
		console.log(temp)
	}
	return temp
}


//判断active有几个，设置i=0，选中过了就i++，return出去。由此来判断有几个
function activeLength(){
	var sss=isRename();
	console.log(sss)   // [true, true, false]
	var i=0;
	for(var value of sss){		
		if(value==true){
			i++;
		}
	}
	return i
}

//重命名 判断是否与本页面的名字有重复的地方
function canUseNameRename(data,val,inputsVal){
	for (var i = 0; i < data.length; i++) {		
		if(data[i].name==val && data[i].name!=inputsVal){
			return false;
		}
	}
	return true;
}


rename.onclick=function(){
	var activeLengthNum=activeLength();
	console.log(activeLengthNum);
	
	if(!activeLengthNum){
		warn.firstElementChild.innerHTML="未选中文件";
		warn.lastElementChild.innerHTML="请选择后进行重命名";
		alertMessage(warn,'#de5549');
	}else if(activeLengthNum==1){  //当选中一个的时候，进行重新命名
		var divs=right_down.getElementsByClassName('right_box');
		
		for (let i = 0; i < divs.length; i++) {
								
			if(divs[i].classList.contains('active')){
				// var idd=divs[i].getAttribute('date-id')

				// console.log(idd);

				// div[i].index=idd;

				divs[i].lastElementChild.select();

				console.log(divs[i].lastElementChild.getAttribute('date-id'))

				var Odd=~~divs[i].lastElementChild.getAttribute('date-id');

				console.log(Odd)
				
				var inputsVal=divs[i].lastElementChild.value;
				//选中的那个当前的value
				console.log(inputsVal)
				
				//当前这个元素失去焦点的时候
				divs[i].lastElementChild.onblur=function (){
					
					var currentValue=this.value; 

					if(canUseNameRename(currentData,currentValue,inputsVal)){
						remind.firstElementChild.innerHTML="重命名成功";

						//重命名成功了之后更改原始数据
						var currentObj=Pan.getDataById(data, Odd);
						currentObj.name=currentValue;
						currentObj.checked=false;
						console.log(currentData)

						console.log(data)
						
						item_left.innerHTML = createList(data);
						
						createMidDiv(creatDivHtml(data,idd));	
						
						alertMessage(remind,'#94e040');

					}else{					
					 	this.select();
						remind.firstElementChild.innerHTML="名字重复 无法重命名";
						alertMessage(remind,'#94e040');
					 }
				};	
			}
		}		
	}else if(activeLengthNum>1){
		warn.firstElementChild.innerHTML="只能选择一个";
		warn.lastElementChild.innerHTML="文件进行重命名";
		alertMessage(warn,'#de5549');		
	}
}



// 删除文件夹

var deleteBtn=document.querySelector(".delete");

deleteBtn.onclick=function(){
	var res=delateData();
	if(res.length){ 
		console.log(res)	
		for (let k = 0; k <res.length; k++) {	
			currentData.splice(res[k]-k,1); 	
		}	
		
		createMidDiv(creatDivHtml(data,idd));
		item_left.innerHTML = createList(data);			
		
		remind.firstElementChild.innerHTML="删除成功";
		alertMessage(remind,'#94e040');		
	}else{
		remind.firstElementChild.innerHTML="请选中要删除的文件";
		alertMessage(remind,'#94e040');			
	}
	rightAllBtn.classList.remove('active2');
}


//判断有没有checked

function delateData(){
	var temp=[];
	console.log(currentData)
	for (var j = 0; j < currentData.length; j++) {
		// console.log(j)
		if(currentData[j].checked){
			temp.push(j);
		}		
	}
	return temp
}


//全选按钮
var rightAllBtn=document.querySelector(".right_all_btn");

function isAllSelect(){
	for (var i = 0; i < currentData.length; i++) {
		if(currentData[i].checked==false){
			return false;
		}		
	}	
	return true;
}


//点击全选框时，下面的文件加active并且checked属性变成true,再次点击的时候，active取消。checked变成false

var onOff=true;

itemRight.onclick=function(e){
		
	
	if(e.target.classList.contains('right_all_btn')){
		if(onOff){
			rightAllBtn.classList.toggle('active2');
			
			for (var i = 0; i < currentData.length; i++) {
				currentData[i].checked=true;
				boxs[i].classList.add('active');
				checks[i].classList.add('active2')
			}
			console.log(currentData);

		}else{
			rightAllBtn.classList.toggle('active2');
			for (var i = 0; i < currentData.length; i++) {
				currentData[i].checked=false;
				boxs[i].classList.remove('active');
				checks[i].classList.remove('active2')
			}
		}
		onOff=!onOff;	
	}
}


//移动到
var move=document.querySelector('.move');
move.onclick=function(){
	var activeLengthNum=activeLength();
	console.log(activeLengthNum);
	
	if(!activeLengthNum){
		warn.firstElementChild.innerHTML="请选择文件";
		warn.lastElementChild.innerHTML="然后进行移动";
		alertMessage(warn,'#de5549');
	}else{

		if(activeLength()==currentData.length && currentData[0].pId==0){
			remind.firstElementChild.innerHTML="没有可移动的位置";
			alertMessage(remind,'#de5549');	
			return 	
		}else{
			console.log('yid')
		}

		moveWrap.style.display='block';
	}			
}


moveItemDown.innerHTML = createList(data);

closeMove.onclick=function(){
	closeMove.style.transform='rotate(-270deg)';
	TweenMax.to(moveWrap,0.8,{opacity:0,delay:0.8})
	//moveWrap.style.display='none';

}

console.log(currentData)

//展开移动到的时候，利用事件委托

toMove()

function toMove(){
	moveItemDown.onclick=function(e){

	if(e.target.nodeName.toUpperCase()==='SPAN' ||e.target.nodeName.toUpperCase()==='I'){
		
		var Odd=~~e.target.getAttribute('date-id');
		console.log(Odd)
		//找到点击到换的  它的父级
		var Movespace=Pan.getParentsById(data,Odd);
		
		console.log(Movespace)

		for (var i = 0; i < currentData.length; i++) {
			if(currentData[i].checked){
				currentData.splice(i,1)
			}		
		}	
	}
	// 	idd=Number.parseInt(e.target.getAttribute('date-id'));
	// 	bread(data,idd);
	// 	createMidDiv(creatDivHtml(data,idd));
	// 	currentData=Pan.getChildrenById(data,idd)
	// 	// console.log(e.target);
	// }
}

}

/*思路：遮罩层
选中了几个文件

点击移动到按钮的时候，
1.当前是否有选中的文件，如果没有，不能移动。如果有才能移动
2.当前选中的文件是否在根目录，如果在根目录，并且全部选中，则不能移动，因为没有地方移动
3.如果当前选中的文件被移动到的目标是当前目录是不能移动的
4.被选中的文件不能移动到自己的子目录
5.如果选中的文件移动到目标目录，但是名字有冲突，处理
   1.如果有重名，是否覆盖？如果是，直接覆盖，让当前被移动的数据覆盖目标文件目录
   否：是否保留两者
   是的话，保留两者，是的话，保留两者，将名字添加一个副本


   替换过来的时候，把pId换过来。checked也要换回来

*/


function alertMessage(obj,color){
	TweenMax.to(obj,0.5,{top:50,backgroundColor:`${color}`,opacity:1,scale:1,ease:Bounce.easeOut})
	TweenMax.to(obj,0.8,{top:-30,backgroundColor:`${color}`,opacity:0,delay:1.5})
}
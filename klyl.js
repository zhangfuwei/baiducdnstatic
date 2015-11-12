/*Version 3.0
参数从左至右说明：参数1:菜单id属性值;		参数2:切换区域id属性值;		参数3:切换区域下级元素类型，如果是div则填写div		参数4：菜单区域滑过时的class样式名		参数5：调用事件类型，默认为onmouseover，只支持onclick和onmouseover,此参数可省略  参数6：自动切换时间间隔 注:如果填写了这个参数，则参数5不可省略！
*/
function showTabfun(obj,menuList,showTabList) 
{	
	obj.className = obj.className.replace(/_ed/g,"")+"_ed";
	for(var i=0;i<menuList.length;i++)
	{
		if(obj == menuList[i])
		{
			showTabList[i].style.display = "block";
		}else {
			menuList[i].className = menuList[i].className.replace(/_ed/g,"");
			showTabList[i].style.display = "none";
		}
	}
}
function showTable(menuid,showid,showCon,Event,time)
{
	function sobj(objlist,sobj){
		for(var i=0;i<objlist.length;i++){
			if(sobj==objlist[i])return i;
		}
	}
	if(!Event)Event="onmouseover";
	var menu = document.getElementById(menuid);
	var menuList = menu.getElementsByTagName("li");
	var showTab = document.getElementById(showid);
	var TmpList = showTab.getElementsByTagName(showCon);
	var showTabList = Array();
	var j=0;
	for(var i=0;i<TmpList.length;i++)
	{
		if(TmpList[i].parentNode.id == showid)
		{
			showTabList[j] = TmpList[i];
			j++;
		}
	}
	
	for(i=0;i<menuList.length;i++)
	{
		switch(Event)
		{
			case "onclick":menuList[i].onclick = function(){if(time)j=sobj(menuList,this);showTabfun(this,menuList,showTabList)};break;
			case "onmouseover":menuList[i].onmouseover = function(){if(time)j=sobj(menuList,this);showTabfun(this,menuList,showTabList)};break;
			default:menuList[i].onmouseover = function(){if(time)j=sobj(menuList,this);showTabfun(this,menuList,showTabList)};break;
		}
	}
	if(time){
		j=0;	
		var sz = setInterval(function(){menuList[j].onmouseover();j = j==menuList.length-1 ? 0 : (j+1);},time);	
		menu.onmouseover = showTab.onmouseover = function(){clearInterval(sz);}
		menu.onmouseout = showTab.onmouseout = function(){sz = setInterval(function(){menuList[j].onmouseover();j = j==menuList.length-1 ? 0 : (j+1);},time);	}
	}
}
/*Version 4.0*/
function KL_gundong(speed,speedMultiple,boxname,direction,Btntype,ContDirection,status){
	function MarqueeObj(tab,tab1,tab2,direction,speedMultiple,ContDirection,MyMarobj,speed){
		if(!ContDirection)
		{
			switch(direction){
				case 'left':	for(var i=0;i<speedMultiple;i++)
									{
										if(tab2.offsetWidth-tab.scrollLeft<=0 ){
											tab.scrollLeft-=tab1.offsetWidth
										}else{
											tab.scrollLeft++;
										}
									};break;
				case 'right':for(var i=0;i<speedMultiple;i++)
									{
										if(tab.scrollLeft==0)tab.scrollLeft=tab1.offsetWidth;
										tab.scrollLeft--;
									};break;
				case 'up':for(var i=0;i<speedMultiple;i++)
									{
										if(tab2.offsetHeight-tab.scrollTop<=0)
											tab.scrollTop-=tab1.offsetHeight
										else{
											tab.scrollTop++;
										}
									};break;
				case 'down':for(var i=0;i<speedMultiple;i++)
									{
										if(tab.scrollTop==0)tab.scrollTop=tab1.offsetHeight;
										  tab.scrollTop--;
									};break;
				default:break;
			}
		}else{
				switch(direction){
				case 'left':
					if(tab.scrollLeft%ContDirection == 0 && tab.scrollLeft != 0){
							if(tab2.offsetWidth-tab.scrollLeft<=0)tab.scrollLeft-=tab1.offsetWidth;
							clearInterval(MyMarobj);
					}else{
						if(ContDirection - tab.scrollLeft%ContDirection >= speedMultiple)
							tab.scrollLeft+=speedMultiple;
						else tab.scrollLeft+=(ContDirection - tab.scrollLeft%ContDirection);
					};
				break;
				case 'right':
					if(tab.scrollLeft%ContDirection == 0 || tab.scrollLeft == 0){
						if( tab.scrollLeft==0 )tab.scrollLeft=tab1.offsetWidth;
						clearInterval(MyMarobj);
					}else{
						if(tab.scrollLeft%ContDirection >= speedMultiple)
							tab.scrollLeft-=speedMultiple;
						else tab.scrollLeft-=(tab.scrollLeft%ContDirection);
					}
				;break;
				case 'up':
					if(tab.scrollTop%ContDirection == 0 && tab.scrollTop != 0 ){
						if(tab2.offsetHeight-tab.scrollTop<0 )tab.scrollTop-=tab1.offsetHeight
						clearInterval(MyMarobj);
					}else{
						if(ContDirection - tab.scrollTop%ContDirection >= speedMultiple)
							tab.scrollTop+=speedMultiple;
						else tab.scrollTop+=(ContDirection - tab.scrollTop%ContDirection);
					}
				break;
				case 'down':
					if(tab.scrollTop%ContDirection == 0 || tab.scrollTop == 0 ){
						if(tab.scrollTop==0)tab.scrollTop=tab1.offsetHeight;
						clearInterval(MyMarobj);
					}else{
						if(tab.scrollTop%ContDirection >= speedMultiple)
							tab.scrollTop-=speedMultiple;
						else tab.scrollTop-=(tab.scrollTop%ContDirection);
					}
				break;
		
			}
		}
	}

	var MyMar;
	direction=direction?direction:'left';
	status = status ? false:true;
	var tab=document.getElementById(boxname);
	var tab1=document.getElementById(boxname+"_1");
	var tab2=document.getElementById(boxname+"_2");
	tab2.innerHTML=tab1.innerHTML;
	if(Btntype=='L_R' || Btntype=='U_D'){
		var MyMarBtn;
		var clickstatus;
		var btn1;
		var btn2;
		if(status) MyMarBtn=setInterval(function(){clearInterval(MyMar);
																switch(direction)
																{
																	case 'left':tab.scrollLeft++;break;
																	case 'right':{ if(tab.scrollLeft==0) tab.scrollLeft = tab1.offsetWidth;	tab.scrollLeft--;	}break;
																	case 'up':tab.scrollTop++; break;
																	case 'down':{if(tab.scrollTop==0) tab.scrollTop = tab1.offsetHeight; tab.scrollTop--;}; break;
																	default:break;
																}
															MyMar=setInterval(function(){MarqueeObj(tab,tab1,tab2,direction,speedMultiple,ContDirection,MyMar,speed)},1);
														},speed);
		if(btn1=document.getElementById(boxname+'_btn1'))
		btn1.onclick=function() {
												clearInterval(MyMar);
												clearInterval(MyMarBtn);
												switch(direction){
													case 'left': tab.scrollLeft++; break;
													case 'right': { if(tab.scrollLeft==0) tab.scrollLeft = tab1.offsetWidth; tab.scrollLeft++;}; break;
													case 'up': tab.scrollTop++;break;
													case 'down':{if(tab.scrollTop==0) tab.scrollTop = tab1.offsetHeight; tab.scrollTop++;}; break;
													default:break;
													}
												MyMar=setInterval(function(){
																							if(Btntype=='L_R')  MarqueeObj(tab,tab1,tab2,'left',speedMultiple,ContDirection,MyMar,speed);
																							if(Btntype=='U_D') MarqueeObj(tab,tab1,tab2,'up',speedMultiple,ContDirection,MyMar,speed);
																							},1);
												if(status){
													if(clickstatus){clearTimeout(clickstatus);clickstatus=false;}
													
														clickstatus=setTimeout(function(){		clearInterval(MyMar);
																												clearInterval(MyMarBtn);
																												MyMarBtn=setInterval(function(){clearInterval(MyMar);
																																					if(direction=='left')tab.scrollLeft++;
																																					if(direction=='right')tab.scrollLeft--;
																																					if(direction=='up')tab.scrollTop++;
																																					if(direction=='down')tab.scrollTop--;
																																					MyMar=setInterval(function(){MarqueeObj(tab,tab1,tab2,direction,speedMultiple,ContDirection,MyMar,speed)},1);
																																				},speed)
																												},speed);
												}
											};
		if(btn2=document.getElementById(boxname+'_btn2'))
		btn2.onclick=function() { 
												clearInterval(MyMar);
												clearInterval(MyMarBtn);
												switch(Btntype){
													case 'L_R':{ if(tab.scrollLeft==0)tab.scrollLeft=tab1.offsetWidth; tab.scrollLeft--;};break;
													case 'U_D':{if(tab.scrollTop==0)tab.scrollTop=tab1.offsetHeight; tab.scrollTop--;};break;
													default:break;
													}
												MyMar=setInterval(function(){
																							if(Btntype=='L_R')	  MarqueeObj(tab,tab1,tab2,'right',speedMultiple,ContDirection,MyMar,speed);
																							if(Btntype=='U_D')  MarqueeObj(tab,tab1,tab2,'down',speedMultiple,ContDirection,MyMar,speed);
																							},1);
												if(status){
													if(clickstatus){clearTimeout(clickstatus);clickstatus=false;}																							
														clickstatus=setTimeout(function(){
																												clearInterval(MyMar);
																												clearInterval(MyMarBtn);
																												MyMarBtn=setInterval(function(){clearInterval(MyMar);
																																					if(direction=='left')tab.scrollLeft++;
																																					if(direction=='right')tab.scrollLeft--;
																																					if(direction=='up')tab.scrollTop++;
																																					if(direction=='down')tab.scrollTop--;
																																					MyMar=setInterval(function(){MarqueeObj(tab,tab1,tab2,direction,speedMultiple,ContDirection,MyMar,speed)},1);
																																				},speed)
																											},speed);
												}
											};
	}else{
		MyMar=setInterval(function(){MarqueeObj(tab,tab1,tab2,direction,speedMultiple)},speed);
		tab.onmouseover=function() {clearInterval(MyMar)};
		tab.onmouseout=function() {MyMar=setInterval(function(){MarqueeObj(tab,tab1,tab2,direction,speedMultiple)},speed)};
	}
}

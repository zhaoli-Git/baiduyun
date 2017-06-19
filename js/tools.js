var Pan = {};

// 通过指定的id获取到对应的数据
Pan.getDataById = function (data, id){
  var item = null;
  for(var i=0; i<data.length; i++){
    if(data[i].id === id){
      item = data[i];
      break;
    }
    if(!item && data[i].child){
      item = this.getDataById(data[i].child, id);
      if(item){
        break;
      }
    }
  }
  return item;
};

// 获取到一组数据data中指定id的所有的子集child
Pan.getChildrenById = function (data, id){
  var targetData = this.getDataById(data, id);
  if(targetData && targetData.child){
    return targetData.child;
  }
};


// 通过指定的id获取到自己以及自己所有的父级
Pan.getParentsById = function (data, id){
  var items = [];
  var current = this.getDataById(data, id);
  if(current){
    items.push(current);
    items = items.concat(this.getParentsById(data, current.pId));
  }
  return items;
};




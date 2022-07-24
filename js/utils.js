/**
 * 
 * @param {Element} element 父元素对象
 * @param {String} childElement 子元素标签字符串
 * @param {Number} num 子元素需插入个数
 * @param {[...args]} classArray 子元素需要添加的class样式
 */
function generateEmptyLiEl(element,childElement,num,classArray) {
  for (var i = 0; i < num; i++) {
    var createChildEl = document.createElement(childElement)
    for(var item of classArray) {
      createChildEl.classList.add(item)
    }
    element.append(createChildEl)
  }
}



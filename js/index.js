var serverURL = "https://res.vmallres.com/pimages"
// 获取轮播图列表信息 post请求
$.post('https://www.fastmock.site/mock/ae0babd1926b040dc68bd7b6fde5fbf1/shop/banners', res => {
  // console.log(res)
})
// 获取商品列表信息 get请求
$.get('https://www.fastmock.site/mock/ae0babd1926b040dc68bd7b6fde5fbf1/shop/proinfo', res => {
  var data = res
  refreshPage()

  
  var discountUlEl = document.querySelector('.discount')
  //记录点击服务优惠的筛选项
  var discountArr = []

  discountUlEl.onclick = function (event) {
    if (event.target.classList.contains('item-head')|| event.target.classList.contains('discount')) return

    if (event.target.classList.toggle('active')) {
      discountArr.push(event.target.textContent)
    } else {
      discountArr.splice(discountArr.findIndex(item => item === event.target.textContent), 1)
    }

    //每次都拿到服务器返回的全部商品列表信息
    var newData = res
    // 然后根据 每次点击记录的服务优惠筛选项discountArr，进行过滤 拿到相关匹配的商品列表
    for (var item1 of discountArr) {
      newData = newData.filter(item => {
        return item.services.includes(item1)
      })

    }
    // 拿到匹配的商品列表后，进行重新展示
    data = newData
    refreshPage()
  }




// 更新商品列表
  function refreshPage() {
    var commodityEl = document.querySelector('.commodity-list')
    commodityEl .innerHTML = ""
    for (var item of data) {
      var createLiEl = document.createElement('li')
      createLiEl.classList.add('item')

      var tipList = ""
      for (var tipItem of item.services) {
        tipList += `<span class="tip-item">${tipItem}</span>`
      }

      createLiEl.innerHTML = `
        <a href="#">
          <img src="${serverURL}${item.photoPath}428_428_${item.photoName}" alt="" class="album">
          <div class="title">${item.name}</div>
          <p class="desc">${item.promotionInfo}</p>
          <p class="price">￥${item.price}</p>
          <div class="tips">${tipList}</div>
          <div class="evaluate">
            <span class="comment">${item.rateCount}人评论</span>
            <span class="praise">${item.goodRate}%好评</span>
          </div>
        </a>`
      commodityEl.append(createLiEl)
    }
    generateEmptyLiEl(commodityEl, 'li', 2, ['item', 'empty'])
  }
})

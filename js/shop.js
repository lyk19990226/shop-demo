var serverURL = "https://res.vmallres.com/pimages"
var discountUlEl = document.querySelector('.discount')
var discountArr = []  //记录点击服务优惠的筛选项
var sortEl = document.querySelector('.sort')
var activeEl = sortEl.querySelector('.active')
var sortStr = '综合'//记录此时的排序方式
// 获取商品列表信息 get请求
$.get('https://www.fastmock.site/mock/ae0babd1926b040dc68bd7b6fde5fbf1/shop/proinfo', res => {
  var data = res
  refreshPage(data)
  // 2、服务优惠-> 点击筛选商品功能
  discountUlEl.onclick = function (event) {
    if (event.target.classList.contains('item-head') || event.target.classList.contains('discount')) return

    if (event.target.classList.toggle('active')) {
      discountArr.push(event.target.textContent)
    } else {
      discountArr.splice(discountArr.findIndex(item => item === event.target.textContent), 1)
    }
// 过滤方法一：（不推荐）
    // //每次都拿到服务器返回的全部商品列表信息
    // var newData = res
    // // 然后根据 每次点击记录的服务优惠筛选项discountArr，进行过滤 拿到相关匹配的商品列表
    // for (var item1 of discountArr) {
    //   newData = newData.filter(item => {
    //     return item.services.includes(item1)
    //   })

    // }
    // // 拿到匹配的商品列表后，进行重新展示
    // data = newData
// 过滤方法二
    data = res.filter(item => {
      var isFlag = true
      for(var item1 of discountArr){
        if(!item.services.includes(item1)) {
          isFlag = false
          break
        }
      }
      return isFlag
    })
    shopListSort()
  }

  ///3、点击排序功能
  sortEl.onclick = function (event) {
    if (event.target.classList.contains('item-head') || event.target.classList.contains('sort')) return
    activeEl.classList.remove('active')
    event.target.classList.add('active')
    activeEl = event.target
    if (sortStr === event.target.textContent) return
    sortStr = event.target.textContent//修改排序方式
    shopListSort()
  }

  // 点击排序，页面刷新工具函数封装
  function shopListSort() {//商品列表排序
    var sortData = JSON.parse(JSON.stringify(data))// 深拷贝
    console.log(sortData)
    if (sortStr === '好评') {
      sortData.sort((item1, item2) => item2.goodRate - item1.goodRate)
    } else if (sortStr === '评论数') {
      sortData.sort((item1, item2) => item2.rateCount - item1.rateCount)
    } else if (sortStr === '价格') {
      sortData.sort((item1, item2) => item2.price - item1.price)
    } else {
      sortData = data
    }
    console.log('调用了shopListSort函数对商品重新进行了排序', '排序规则:', sortStr)
    refreshPage(sortData)
  }

  // 1、更新商品列表
  function refreshPage(data) {
    var commodityEl = document.querySelector('.commodity-list')
    commodityEl.innerHTML = ""
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
          <div class="title ellipsis_one_line">${item.name}</div>
          <p class="desc ellipsis_one_line">${item.promotionInfo}</p>
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
    console.log('调用了refreshPage函数更新了页面')
  }

})

var bannerServerURL = "https://res.vmallres.com/"
var bannersEl = document.querySelector('.banners')
var imagesUlEl = document.querySelector('.images')
var indicatorEl = document.querySelector('.indicator')
var preBtnEl = document.querySelector('.pre')
var nextBtnEl = document.querySelector('.next')
var preBtnIndex = 0 //记录上一个active的索引
var currentBtnIndex = 0//记录当前active的索引
var timer = null //定时器初始值

// 获取轮播图列表信息 post请求
$.post('https://www.fastmock.site/mock/ae0babd1926b040dc68bd7b6fde5fbf1/shop/banners', res => {
  var bannersCount = res.length

  for (var item of res) {
    // 动态创建img列表
    var createLiEl = document.createElement('li')
    var imgEl = document.createElement('img')
    createLiEl.classList.add('item')
    imgEl.src = `${bannerServerURL}${item.imgUrl}`
    createLiEl.append(imgEl)
    imagesUlEl.append(createLiEl)
    // 动态创建指示器列表
    var createDivEl = document.createElement('div')
    createDivEl.classList.add('item')
    indicatorEl.append(createDivEl)
  }
  // 给第一个图片，及指示器默认添加active样式
  imagesUlEl.children[0].classList.add('active')
  indicatorEl.children[0].classList.add('active')

  // 开启轮播
  startRotation()

  // 点击按钮上一张，下一张来切换图片
  preBtnEl.onclick = function () {//点击按钮切换上一张图片
    preBtnIndex = currentBtnIndex
    currentBtnIndex--
    if (currentBtnIndex === -1) {
      currentBtnIndex = bannersCount - 1
    }
    switchBanner()
  }

  nextBtnEl.onclick = switchNextImg//点击按钮切换下一张图片

  // 鼠标 移入关闭定时器，移出开启定时器
  bannersEl.onmouseenter = function () {
    stopRotation()
    console.log('stop')
  }

  bannersEl.onmouseleave = function () {
    startRotation()
    console.log('start')
  }

  // 指示器点击切换图片功能
  for (var i = 0; i < bannersCount; i++) {
    indicatorEl.children[i].index = i
    indicatorEl.children[i].onclick = function () {
      preBtnIndex = currentBtnIndex
      currentBtnIndex = this.index
      switchBanner()
    }
  }


  // 工具函数封装
  // 下一张图片按钮，及自动轮播函数封装
  function switchNextImg() {
    preBtnIndex = currentBtnIndex
    currentBtnIndex++
    if (currentBtnIndex === bannersCount) {
      currentBtnIndex = 0
    }
    switchBanner()
  }

  // 开启轮播功能函数封装
  function startRotation() {
    if(timer) return
    timer = setInterval(switchNextImg, 3000)
  }
  // 停止轮播功能函数封装
  function stopRotation() {
    if(!timer) return
    clearInterval(timer)
    // console.log('清除定时器')
    timer = null
    console.log(timer)
  }
  // 切换图片
  function switchBanner() {
    console.log('next一张')
    // 图片样式切换
    imagesUlEl.children[preBtnIndex].classList.remove('active')
    imagesUlEl.children[currentBtnIndex].classList.add('active')
    // 指示器样式切换
    indicatorEl.children[preBtnIndex].classList.remove('active')
    indicatorEl.children[currentBtnIndex].classList.add('active')
  }
  // 通过window的焦点
  document.onvisibilitychange = function () {
    console.log("可见性发生改变", document.visibilityState)
    if (document.visibilityState === "visible") {
      startRotation()
    } else if (document.visibilityState === "hidden") {
      stopRotation()
    }
  }
})

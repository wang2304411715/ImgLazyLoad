/*
1、打开的第一版页面应该立刻加载；
2、找到所有的懒加载图片，并放到数组里，监听window的scroll事件；
3、触发节流函数和setTimeout，规定时间结束，把回调函数放入执行队列里；
4、回调函数判断图片所在位置是否处于可视窗口内并记录结果；
5、如果在可视窗口内就加载图片，否则跳过加载；
6、加载图片使用自定义的src的值赋予src。
*/
(function() {

    //添加监听scroll函数,触发节流函数
    window.addEventListener("scroll", _throttle, false);

    // 触发节流函数和setTimeout
    var _continueTimeout = true;

    // 打开的第一版页面应该立刻加载；
    _throttle();

    function _throttle() {

        if (!_continueTimeout) {
            return;
        }
        _continueTimeout = false;

        setTimeout(function() {

            //规定时间结束，把回调函数放入执行队列里，顺序执行
            //加载图片
            _loadImage();

            //可以继续执行时间函数
            _continueTimeout = true;

        }, 1000);
    }
    //判断图片所在位置是否处于可视窗口内并记录结果

    function _loadImage() {

        // 找到所有的懒加载图片，并放到数组里
        var imgList = document.querySelectorAll(".imgLazyLoad"); //获取图片数组

        for (var i = 0; i < imgList.length; i++) {

            //如果在可视窗口内就加载图片，否则跳过加载
            //加载图片使用自定义的src的值赋予src
            if (_isInner(imgList[i])) {
                imgList[i].src = imgList[i].getAttribute("data-src");
            }
        }

        //判断是否在可视窗口内
        function _isInner(element) {

        	//获取元素在窗口的位置，getBoundingClientRect支持IE4以上
            var positionInWin = element.getBoundingClientRect();

            var totalH = positionInWin.top > -element.height && positionInWin.top < window.innerHeight;
            var totalW = positionInWin.left > -element.width && positionInWin.left < window.innerWidth;

            return totalH && totalW ? true : false;
        }
    }
})()
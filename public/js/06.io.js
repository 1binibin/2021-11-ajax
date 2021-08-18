/* 함수의 인자는 정해져 있다.
function myFn(fn, option) {
	var root = option.root = 'hi';
	var opt = option.rootMargin+"%";
	fn(this, root, opt);
}

myFn(onFn, option);
function onFn(el, rootValue, option) {
	console.log(el, rootValue, option);
}
*/


var observer;   //관찰자
var option = {
    //root: null, // null을 주거나 값을 안준다면 brower의 뷰포트
    //rootMargin: '0px',  // px을 주어야함, 안주면 '0px', 마진값(gap)에 반응해서 나타남.
    //threshold: 0,   // 기본값:0 , 1을 주면 화면에 다 나와야 true값을 준다. , .5 절반 정도 나왔을때 ture, [0, .25, .5, .75, 1] 배열로 주면 배열의 값에 intersectionRatio가반응함
}
observer = new IntersectionObserver(onIntersection, option);
observer.observe( document.querySelector('.wrapper') );

function onIntersection(el, observer) {
    el.forEach(function(v, i) {
        //console.log(v, v.isIntersecting);   //intersecint 겹치는가 안겹치는가.
        if(v.isIntersecting){
            if(v.intersectionRatio < .25){
                $(v.target).css('background-color', 'red');
                // observer.unobserve(v.target); observer 죽이기
            }
            else if(v.intersectionRatio >= .25 && v.intersectionRatio < .5){
                $(v.target).css('background-color', 'green');
            }
            else if(v.intersectionRatio >=.5 && v.intersectionRatio < .75){
                $(v.target).css('background-color', 'blue');
            }
            else if(v.intersectionRatio >=.75){
                $(v.target).css('background-color', 'purple');
            }
            else{
                $(v.target).css('background-color', 'beige');
            }
        }
        console.log(v.isIntersecting);
    });

    // console.log(el, observer);
}
/*************** global init *****************/
var auth = 'KakaoAK e353e600436866e7fd69f646401bf28a';
var kakaoURL = 'https://dapi.kakao.com/'

/*************** user function  *****************/
function getPath(cate) {
    return kakaoURL + (cate === 'book' ? 'v3': 'v2')+/search/+ cate;
}

function getParams(query) {
    return{
        params: { query: query },
        headers: { Authorization: auth }
    }
}

function setTotalCnt(cnt) {
    $('.result-cnt').html(numberFormat(cnt));
}

function setWebLists(r) {
    $('.lists').empty();
    r.forEach(function(v, i) {
        var html = '<li class="list web">';
        html += '<a class="title" href="'+v.url+'">'+v.title+'</a>';
        html += '<p class="content">'+v.contents+'</p>';
        html += '<a href="'+v.url+'" class="link" target="_blank">'+v.url+'</a>';
        html += '<div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
        html += '</li>';
        $('.lists').append(html);
    });
}

function setImageLists(r) {

}

function setVedioLists(r) {

}

function setBlogLists(r) {

}

function setBookLists(r) {

}

function setCafeLists(r) {

}

/*************** event callback *****************/
function onSubmit(e) {
    e.preventDefault();
    var cate = $(this).find('select[name="category"]').val().trim();
    var query = $(this).find('input[name="query"]').val().trim();
    axios.get(getPath(cate), getParams(query)).then(onSuccess).catch(onError);
}

function onSuccess(res) {
    var cate = res.config.url.split('/').pop();
    var v = res.data;
    setTotalCnt(v.meta.total_count);
    switch(cate){
        case 'web':
            setWebLists(v.documents);
            break;
        case 'image':
            setImageLists(v.documents);
            break;
        case 'vclip':
            setVedioLists(v.documents);
            break;
        case 'blog':
            setBlogLists(v.documents);
            break;
        case 'book':
            setBookLists(v.documents);
            break;
        case 'cafe':
            setCafeLists(v.documents);
            break;
    }

}

function onError(err) {
    console.log(err);
}

/*************** event init *****************/
$('.search-form').submit(onSubmit);


/*************** start init *****************/


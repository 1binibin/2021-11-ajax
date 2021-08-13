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
    $('.lists').empty().attr('class', 'lists web');
    r.forEach(function(v, i) {
        var html = '<li class="list">';
        html += '<a class="title" href="'+v.url+'">'+v.title+'</a>';
        html += '<p class="content">'+v.contents+'</p>';
        html += '<a href="'+v.url+'" class="link" target="_blank">'+v.url+'</a>';
        html += '<div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
        html += '</li>';
        $('.lists').append(html);
    });
}

function setImageLists(r) {
	$('.lists').empty().attr('class', 'lists image grid-wrap');
	$('.lists').append('<li class="list grid-sizer"></li>');
	r.forEach(function(v, i) {
        var info = JSON.stringify({
            collection: v.collection,
            width: v.width,
            height: v.height,
            src: v.image_url,
            thumb: v.thumbnail_url,
            name: v.display_sitename,
            url: v.doc_url,
            dt: v.datetime
        });
		var html = '<li class="list grid-item" data-info=\''+info+'\'>';
		html += '<img src="'+v.thumbnail_url+'" class="w100" data-thumb="'+v.thumbnail_url+'">';
        html += '<div class="info"></div>'
		html += '</li>';
		$(html).appendTo('.lists').click(onModalShow);
	});
	var $grid = $('.grid-wrap').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	$grid.imagesLoaded().progress(function() {
		$grid.masonry('layout');
		$grid.masonry('reloadItems');
	});

}

function setVedioLists(r) {
    console.log(r);
}

function setBlogLists(r) {
    console.log(r);
}

function setBookLists(r) {
    console.log(r);
}

function setCafeLists(r) {
    console.log(r);
}

/*************** event callback *****************/
function onLoadError(el) {
    $('.modal-wrapper .img-wp img').attr('src', $(el).data('thumb'));
}

function onModalShow() {
    var v = $(this).data('info');
    $('.modal-wrapper').show();
    $('.modal-wrapper .img-wp img').attr('src',v.src);
    $('.modal-wrapper .img-wp img').data('thumb', v.thumb);
    $('.modal-wrapper .size-wp').html(v.width + 'x' + v.height);
    $('.modal-wrapper .collection').html('['+v.collection+'] ');
    $('.modal-wrapper .name').html(v.name);
    $('.modal-wrapper .link').attr('href', v.url).html(v.url);
    $('.modal-wrapper .dt').html(moment(v.datetime).format('YYYY-MM-DD HH:mm:ss'));
}

function onSubmit(e) {
    e.preventDefault();
    var cate = $(this).find('select[name="category"]').val().trim();
    var query = $(this).find('input[name="query"]').val().trim();
    axios.get(getPath(cate), getParams(query)).then(onSuccess).catch(onError);
}

function onSuccess(res) {
    var cate = res.config.url.split('/').pop(); //체크
    var v = res.data;
    setTotalCnt(v.meta.total_count);
    console.log(v);
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


/* var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.status === 200 && xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
    }
}
xhr.open('GET', 'https://dapi.kakao.com/v2/search/web?query=블랙핑크');
xhr.setRequestHeader('Authorization', 'KakaoAK e353e600436866e7fd69f646401bf28a');
xhr.send(); */

/* $.ajax({
    url: 'https://dapi.kakao.com/v2/search/web',
    type: 'GET',
    dataType: 'json',
    data: { query: '블랙핑크' },
    beforeSend: onBefore,
    success: onSuccess,
    error: onError

});

function onBefore(xhr) {
    xhr.setRequestHeader('Authorization', 'KakaoAK e353e600436866e7fd69f646401bf28a');
}

function onSuccess(v) {
    console.log(v);
}
function onError(xhr, status, error) {
    console.log(xhr, status, error);
} */

axios
.get('https://dapi.kakao.com/v2/search/web', {
    params: { query:'블랙핑크'},
    headers: {Authorization: 'KakaoAK e353e600436866e7fd69f646401bf28a'}
})
.then(onResult)
.catch(onAxiosError);

function onResult(v) {
    console.log(v.data);
}
function onAxiosError(err) {
    console.log(err);
}
var events = [
    // page load events
    'pagebeforeload',
    'pageload',
    'pageloadfailed',

    // page chage events
    'pagebeforechange',
    'pagechange',
    'pagechangefailed',

    // page transition events
    'pageshow',
    'pagehide',
    'pagebeforehide',
    'pagebeforeshow',

    // page initialization events
    'pagebeforecreate',
    'pagecreate',
    'pageinit',

    // page remove events
    'pageremove',

    // layout update events
    'updatelayout'
].join(' ');


// 발생하는 이벤트 이름을 엘리먼트 별로 담아둔다.
var firedOnDocument = [],
    firedOnMain = [],
    firedOnPageInDoc = [],
    firedOnNextPage = [];

$(document).on(events, function (e) {
    firedOnDocument.push(e.type);
});

$(document).on(events, '#main', function (e) {
    firedOnMain.push(e.type);
});

$(document).on(events, '#nextpage', function (e) {
    firedOnNextPage.push(e.type);
});

$(document).on(events, '#pageindoc', function (e) {
    firedOnPageInDoc.push(e.type);
});

function print() {
    console.log('>>>>>>>>>>>');
    console.log('Document:', formatLog(firedOnDocument));
    console.log('Main Page:', formatLog(firedOnMain));
    console.log('Page In Document:', formatLog(firedOnPageInDoc));
    console.log('Next Page:', formatLog(firedOnNextPage));
    console.log('<<<<<<<<<<<');
}

function formatLog(arr) {
    return arr.map(function (v, i) {
        // 보기 좋게 4개 단위로 자른다.
        if (i % 4 === 0) {
            return '\n\t' + v;
        }
        return v;
    }).join(' -> ');
}

function clear() {
    firedOnDocument.length = 0;
    firedOnMain.length = 0;
    firedOnPageInDoc.length = 0;
    firedOnNextPage.length = 0;
}

// 이벤트 확인용 코드
$(document).on('vclick', '[data-eventorder]', print);
$(document).on('vclick', 'a[data-role=button]', clear);
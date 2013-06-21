jQuery Mobile 이벤트 순서
======================

JQM을 사용해보려고 하니 페이지를 열거나 다른 페이지를 불러올 때,  
각 이벤트가 어떤 순서로 발생하는 한 눈에 보이지 않는다.  
또한, 어떤 이벤트는 `document`에 할당할 수 있고, 어떤 이벤트는 각 페이지 엘리먼트에 할당할 수 있어서,  
각 엘리먼트 별로 발생하는 이벤트의 흐름을 확안해보고자 테스트 페이지를 만들었다.


## 이벤트 순서

페이지를 열거나, 다른 페이지를 로드했을 때 발생하는 이벤트의 순서와 각 이벤트에 대한 설명.

- mobileinit  
    jQuery 모바일이 초기화되었을 때 발생하는 이벤트.  
    페이지 내에서 최초 한 번만 발생하며, JQM 스크립트를 추가하기 전에 할당해야 한다.  
    주로, 글로벌 설정을 위한 용도로 사용한다.

- pagebeforechange  
    페이지가 로딩되거나 트랜지션 하기 전에 발생하는 이벤트.  
    toPage에 대한 정보를 가지고 있으며,  
    이 이벤트에서 목적지 정보를 변경하거나 이벤트를 중지할 수 있다.

- pagebeforeload  
    페이지를 로드하기 전에 발생하는 이벤트.  
    XHR 요청을 보내기 전에 발생한다.

- pagebeforecreate  
    페이지 엘리먼트가 추가되었으며, JQM 플러그인이나 위젯이 초기화되기 전  
    플러그인이나 위젯이 초기화되기 전에 DOM을 추가하려고 한다면 이 이벤트를 사용한다.  
    예를 들어, 자바스크립트로 DOM을 만들어 추가하려고 하는 경우.

- pagecreate  
    각 위젯 초기화가 완료된 후 호출되는 이벤트.

- pageinit  
    모든 위젯의 초기화가 완료된 후 호출되는 이벤트.  
    정확히는 모르겠으나, pagecreate는 각각의 위젯이 초기화되면서 호출되는 거라면,  
    pageinit은 모든 위젯의 초기화가 완료된 후에 호출되는 것 같다.  
    정확한 '초기화 완료' 시점을 의도하는 거라면, pageinit을 사용하는 게 좋다.

- pageload  
    로드한 페이지가 DOM에 추가되고 초기화도 모두 완료된 상태에서 발생하는 이벤트.  
    pageinit 보다 나중에 호출되는 것에 주의한다.

- pagebeforeshow  
    트랜지션을 시작하기 전에, 목적 페이지의 엘리먼트에서 발생하는 이벤트.  
    최초로 페이지가 로드되는 거라면, 두 번째 파라미터인 prevPage 값에 빈 배열이 할당된다.

- pagebeforehide  
    pagebeforeshow와 비슷하지만, 시작 페이지에서 발생하는 이벤트.  
    nextPage에 대한 값을 갖는다.

- pageshow  
    트랜지션이 종료된 후에, 목적 페이지의 엘리먼트에서 발생하는 이벤트.  
    prevPage를 갖는다.

- pagechange  
    페이지가 로드돼서 DOM에 추가되어 초기화가 완료된 이후나,  
    트랜지션이 완전히 종료된 다음에 호출되는 이벤트.  
    트랜지션 관련 이벤트(show/hide)는 pagechange 전에 호출되는 것에 주의한다.


## 순서만 한 눈에 보기

### 최초 페이지를 열었을 때

- 전체 문서(document)  
  mobileinit -> pagebeforechange -> pagebeforecreate -> pagecreate  
  -> pageinit -> pagebeforeshow -> pageshow -> pagechange

- 열린 문서의 페이지 엘리먼트  
  pagebeforecreate -> pagecreate -> pageinit -> pagebeforeshow -> pageshow


### Ajax로 다른 페이지를 불러와 열었을 때

- 전체 문서(document)  
  pagebeforechange -> pagebeforeload -> pagebeforecreate -> pagecreate  
  -> pageinit -> pageload -> pagebeforechange -> pagebeforehide  
  -> pagebeforeshow -> pagehide -> pageshow -> pagechange

- 열린 문서의 페이지 엘리먼트  
  pagebeforehide -> pagehide

- 불러온 문서의 페이지 엘리먼트  
  pagebeforecreate -> pagecreate -> pageinit -> pagebeforeshow -> pageshow


## 직접 테스트해보기

1. 리파지터리를 클론하고, 각자 원하는 방식으로 웹서버를 띄워서, `index.html` 페이지를 연다.

2. 콘솔을 열고, '발생한 이벤트 확인하기' 버튼을 눌러 로그를 확인한다.

3. 다음 페이지로 이동하며, 이동 과정에서 발생한 이벤트를 확인한다.  




//获取多次数据
let count = 0;
for(let i = 0;count < 100;i++){
  
  hot(count,true);
  // console.log(count)
  count += 20;
}
console.log(count + "count");


//移动端下拉刷新
let body = document.getElementsByTagName("body")[0];
let wrap = document.getElementsByClassName("wrap")[0];
body.start = 0;
body.dis = 0;
body.addEventListener("touchstart",function(event){
  body.start = event.targetTouches[0].pageY;
  // console.log(body.start);
},false)
body.addEventListener("touchmove",function(event){
  let touch = event.targetTouches[0];
  console.log("touch.pageY"+touch.pageY)
  if (touch.pageY >= 70) {
    wrap.style.top  = "70px";
  }else{
      wrap.style.top = wrap.offsetTop + touch.pageY - body.start + "px";

  }

  body.dis = touch.pageY - body.start;

  console.log(body.dis);
},false)
body.addEventListener("touchend",function(event){
 
  let timer = null;
 
  if (body.dis > 0) {

    timer = setInterval(function(){
      wrap.style.top =  wrap.offsetTop -2+'px';
      console.log(wrap.style.top)
      if (wrap.offsetTop <= 0) {
        // alert(2);
        clearInterval(timer);
        wrap.style.top = "0px";
      }
    },30)
  }
  if (body.dis >= 50){
    
    count += 20;
    hot(count,false);
  }  
},false)



//top250
function hot(count,is_true){
 
$.ajax({
    url:`http://api.douban.com/v2/movie/top250?count=20&start=${count}`,
    type: 'get',
    
    dataType: 'jsonp',
    success: (res) => {
      console.log(res.subjects)
   
      
      create(res.subjects,is_true);
      
      
    }
  })
}


//rem适配
let html = document.getElementsByTagName("html")[0];
let width = html.offsetWidth ;
// console.log(width-30);
html.style.fontSize = (width -30)/ 10 +"px";

window.addEventListener("resize",()=>{
  let width = document.documentElement.clientWidth || document.body.clientWidth;
console.log(width);
  html.style.fontSize = width / 10 +"px";
})




//delegate 给动态添加的dom加上点击事件
$(".content").delegate("li","click",function(e){
 let id = $(this).attr("data_id");
 console.log(id);
 $.ajax({
  url:`http://api.douban.com/v2/movie/celebrity/${id}`,
  type:"get",
 
  dataType: 'jsonp',
  success:(res) =>{
    console.log(res);
    
  }
 })
})

//搜索点击
let btn = document.getElementById("btn");
let input = document.getElementById("input");
btn.onclick = function(){
  if (input.value == undefined || input.value == "") {
    hot();
   }else{
    search(input.value)
   }
}

//搜索词
function search(word){
  $.ajax({
     url:"http://api.douban.com/v2/movie/search", 
      type: 'get',
      data: {
        q: encodeURI(word)
      },
      dataType: 'jsonp',
      success: (res) => {
        console.log (res);
        // 结果就在res里面
        $(".content").html("");
        create(res.subjects)
      }
    });
}

//创建dom
function create(res,is_Clockwise){
   for(let i = 0 ; i <res.length ;i++){
      
        // console.log(res.subjects[i].id);
          let $li = $("<li></li>");
          $li.attr("class","item")
          $li.attr("data_id",res[i].id )
           
          //title
          let $a = $("<a ></a>");
          $a.attr("href","detail.html?id="+res[i].id);
          
          //star

          let $star = $("<div></div>");
          $star.attr("class","star");
          let owidth = res[i].rating.average * 10 + "%";
          console.log(owidth);
          let inner = $(`<div style="width:${owidth}"></div>`);
          inner.attr("class","inner-star");
          $star.append(inner);
          //评分
          let $star_right = $(`<div>${res[i].rating.average}</div>`);
          $star_right.attr("class","star_right");


          
          $a.attr("class","item_link");
          $li.append($a);
          let $div = $("<div></div>");
          $div.attr("class","item_pic");
          let $img = $("<img>");
          $img.attr("src",res[i].images.small) ; 
          $div.append($img);

        //content
          let $div_2 = $("<div ></div>");
          $div_2.attr("class","item_content");
          let $daoyan= $(`<p class='title'>${res[i].title}</p>`);
 // console.log(res.subjects[i].rating);
        
          let $zhuyan = $("<p></p>");
          $div_2.append($daoyan);
          $div_2.append($zhuyan);
          $div_2.append($star);
          $div_2.append($star_right);
          $a.append($div);
          $a.append($div_2);
          console.log(is_Clockwise);
          if (is_Clockwise) {
            $(".content").append($li);
          }else{
            // alert(1);
            $(".content").prepend($li);
          }
          

      }
  
}

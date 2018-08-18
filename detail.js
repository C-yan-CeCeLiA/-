//rem适配
let html = document.getElementsByTagName("html")[0];
let width = document.documentElement.clientWidth || document.body.clientWidth;
console.log(width);
html.style.fontSize = width / 10 +"px";

window.addEventListener("resize",()=>{
  let width = document.documentElement.clientWidth || document.body.clientWidth;
console.log(width);
  html.style.fontSize = width / 10 +"px";
})


    
   $(document).ready(function(){
    let id =  location.search;
   id = id.split("=")[1];
      $.ajax({
        url:"http://api.douban.com/v2/movie/subject/"+id,
        dataType: 'jsonp',
        success: (res) => {
          console.log (res);
          $(".d-title h1").html(res.title);
          $(".main img").attr("src",res.images.large);
          $(".detail").html(res.summary);
          console.log(res.directors);
          //导演
          for(let i = 0; i <res.directors.length; i++){
           $(".daoyan").html(res.directors[i].name);
          }
          //演员表
          let cast ="";
          for(let i =0; i<res.casts.length;i++){
            cast = cast + res.casts[i].name +" "; 
          }
          $(".zhuyan").html("主演: " + cast );
        }
      })
    })
    
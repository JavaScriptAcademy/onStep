function flyIn(obj){
  $(obj).next().addClass('flyIn').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
    $(this).removeClass('flyIn');
  })
}
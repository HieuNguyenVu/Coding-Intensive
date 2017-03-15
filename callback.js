setTimeout(
  function(){
    alert('Hello!');
  },
  1000
);

function countDown(count){
    for(var i = count;i>=0;i--){
      setTimeout(function(){
        console.log(i);},(count-i)*1000);
    }
}
countDown(6);

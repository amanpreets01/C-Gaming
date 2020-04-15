function newWindow(game_name , user_id){
      console.log(game_name , user_id);
      //var myWindow = window.open("http://192.168.0.108:8080/user/games/"+user_id+"/play",'_blank', "MsgWindow", "titlebar=yes,fullscreen=yes,width=500,height=500");
      
      var myWindow  = window.open("http://192.168.0.115:8080/user/games/"+user_id+"/play",'_blank', "MsgWindow", "titlebar=yes,fullscreen=yes,width=500,height=500");





    }


var socket=io() 
// make connection with server from user side 
socket.on('connect', function(){ 
console.log('Connected to Server');
}); 


socket.emit('createMsg' ,  {
  "to" : "server",
  "from" : "client"
});

function newWindow(game_name){
      console.log(game_name);
      var myWindow = window.open("#",'_blank', "MsgWindow", "titlebar=yes,fullscreen=yes,width=500,height=500");
    
      myWindow.document.write("<head><title>"+game_name+"</title></head>");
      /*
      We will load different javascripts file to process from server
      
      */
      //myWindow.document.write(' <iframe src="../test"></iframe> ')
      myWindow.document.write('<iframe src="./../test" height="100%" width="100%"></iframe>')

    }

    
'use strict';

let stringName = 'HERMAN_HANGMAN_TEST';
let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;

function storeInfo() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        let infoToSave = recordsList;
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(infoToSave), p : updatePassword },
                success : updateReady, error : errorHandler
              }
        );
    } 
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}


function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}


function read() {
  $.ajax(
    {
      url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
      data : { f : 'READ', n : stringName },
      success : readReady, error : errorHandler
    }
  );
}
let listInfo;

function readReady(callresult) {
  if ( callresult.error!=undefined )
    alert(callresult.error); 
  else
  {
    listInfo = callresult.result;
  }
}
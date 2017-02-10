
var counter = 0;
function setTimer(intervalTime) {
    if(counter > 3){
            console.log("stop interval");
            return;
        }

    var timeout = setTimeout(function () {
        
        console.log(new Date().valueOf());
        console.log('clear timeout');
        clearTimeout(timeout);
        counter++;
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.')
        setTimer(intervalTime);
    }, intervalTime);
}

function testInterval() {
    console.log("start interval");
    setTimer(1000);
}

function login() {
    var username = document.getElementById("username").value;
    if (username.length < 8) {
        alert("your name is short");
        return;
    }
    var password = document.getElementById("passwd").value;
    var post_data = { 'user_id': username, 'password': password };
    console.log(post_data);
    $.ajax({
        url: "/api/login",
        data: post_data,
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function (data) {
            console.log(data);
            alert(data.message)
        }
    });
}

function login2() {
    var username = document.getElementById("username").value;
    if (username.length < 1) {
        alert("your name is short");
        return;
    }
    var password = document.getElementById("passwd").value;

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result =  eval("("+xmlhttp.responseText+")");
            console.log(result);
            alert(result.message);
        }
    }
    var url = "/api/login";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send( 'user_id='+username+'&password='+password);

}

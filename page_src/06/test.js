
var bizList;
var groupList;

function createBizDiv(biz) {

    var bizGuid = biz.biz_guid;
    var bizName = biz.biz_name
    var content = document.getElementById("biz");
    var divBiz = document.createElement("div");
    divBiz.id = bizGuid;
    divBiz.style.margin = "20px";
    divBiz.style.padding = "10px"

    var textNodeDiv = document.createElement("div");
    textNodeDiv.style.fontSize = "20px";
    textNodeDiv.addEventListener("click", function(){
        showKb(bizGuid);
    });

    var addAndSubDiv = document.createElement("div");
    addAndSubDiv.style.display="inline";
    addAndSubDiv.style.padding="6px";
    addAndSubDiv.width="6px";
    addAndSubDiv.style.fontSize="40px";
    addAndSubDiv.id=bizGuid+"add_sub";
    addAndSubDiv.appendChild(document.createTextNode("+"));

    textNodeDiv.appendChild(addAndSubDiv);
    textNodeDiv.appendChild(document.createTextNode("团队名称：" + bizName))
    divBiz.appendChild(textNodeDiv);
    content.appendChild(divBiz);
}

function showKb(className){
    if($("#"+className+"add_sub").text() == "+"){
        $("#"+className+"add_sub").text("-")
    }else{
         $("#"+className+"add_sub").text("+")
    }
     $("."+className).toggle();
}

function appendKbDiv(groupKb) {
    var bizGuid = groupKb.bizGuid;
    var kbName = groupKb.kbName;
    var biz = document.getElementById(bizGuid);
    var divKb = document.createElement("div");
    divKb.className=bizGuid;
    divKb.style.padding = "20px";
    divKb.appendChild(document.createTextNode("群组名称：" + kbName));
    biz.appendChild(divKb);
}

function processData() {
    if (!bizList || !groupList) {
        return;
    }
    for (i = 0; i < bizList.length; i++) {
        var biz = bizList[i];
        var bizGuid = biz.biz_guid;
        createBizDiv(biz);
    }
    for (j = 0; j < groupList.length; j++) {
        if (groupList[j].bizGuid) {
            appendKbDiv(groupList[j]);
        }
    }
}


function getBiz() {
    var token = getCookie("token");
    if (!token) {
        location.replace("index.html")
    }
    var post_data = { 'token': token, 'api_version': 6 };
    $.ajax({
        url: "/wizas/a/biz/user_bizs",
        data: post_data,
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.return_code == 200) {
                bizList = data.result;
                processData();
            }
        }
    });

}

function getKb() {
    var token = getCookie("token");
    if (!token) {
        location.replace("index.html")
    }
    var post_data = { 'token': token, 'api_version': 6 };
    $.ajax({
        url: "/wizas/a/groups",
        data: post_data,
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.return_code == 200) {
                groupList = data.group_list;
                processData();
            }
        }
    });

}


function login() {
    $("#submit").attr("disabled", "disabled");
    $("#submit").css("background", "gray");
    $("#login").fadeOut(1);
    $("#loading").css("display", "block");
    setTimeout(loginAjax, 2);
    function loginAjax() {
        var username = document.getElementById("user_name").value;
        if (!username) {
            alert("your name is null");
            return;
        }
        var password = document.getElementById("password").value;
        if (!password) {
            alert("your password is null");
            return;
        }
        var post_data = { 'user_id': username, 'password': password };
        console.log(post_data);
        $.ajax({
            url: "/api/login",
            data: post_data,
            type: 'POST',
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.code == 200) {
                    setCookie("token", data.token);
                    $("#login").css("display", "none");
                    $("#loading").css("display", "none");
                    $("#content").css("display", "block");
                    getBiz();
                    getKb();
                } else {
                    alert("登陆失败");
                }

            },
            error: function (data) {
                alert("error")
            }
        });
    }
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + encodeURI(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return decodeURI(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function removeCookie(name) {
    setCookie(name, "", -1);
}
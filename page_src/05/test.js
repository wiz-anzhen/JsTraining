
var bizList;
var groupList;
var toDoList;

function createBizDiv(bizGuid, bizName) {
    var content = document.getElementById("content");
    var divBiz = document.createElement("div");
    divBiz.id = bizGuid;
    divBiz.style.margin = "20px";
    var bizText = document.createTextNode("团队名称：" + bizName);
    divBiz.appendChild(bizText);
    content.appendChild(divBiz);
}

function appendKbDiv(bizGuid, kbName) {
    console.log(kbName);
    var biz = document.getElementById(bizGuid);
    var divKb = document.createElement("div");
    var kbText = document.createTextNode("群组名称：" + kbName);
    divKb.appendChild(kbText);
    biz.appendChild(divKb);
}

function processData() {
    for (i = 0; i < bizList.length; i++) {
        var biz = bizList[i];
        console.log(biz.biz_guid)
        createBizDiv(biz.biz_guid, biz.biz_name);

        for (j = 0; j < groupList.length; j++) {
            if (groupList[j].bizGuid && groupList[j].bizGuid == biz.biz_guid) {
                console.log(groupList[j].bizGuid);
                appendKbDiv(biz.biz_guid, groupList[j].kbName);
            }
        }
        for (k = 0; k < toDoList.length; k++) {
            if (!toDoList[k].bizGuid && toDoList[k].bizGuid == biz.biz_guid) {
                appendKbDiv(biz.biz_guid, toDoList[k].kbName);
            }
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
                getKb();
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
                toDoList = data.todo_list;
                processData();
            }
        }
    });

}


function login() {
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
                $("#content").css("display", "block");
                getBiz();
            } else {
                alert("登陆失败");
            }

        },
        error: function (data) {
            $("#submit").attr("disabled", "disabled");
        }
    });
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
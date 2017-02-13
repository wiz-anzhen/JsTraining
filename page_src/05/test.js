
var bizList;
var groupList;
var toDoList;

function createBizDiv(biz) {
    var bizGuid = biz.biz_guid;
    var bizName = biz.biz_name
    var content = document.getElementById("biz");
    var divBiz = document.createElement("div");
    divBiz.id = bizGuid;
    divBiz.style.margin = "20px";
    divBiz.style.padding = "10px"
    divBiz.appendChild(document.createTextNode("团队名称：" + bizName));
    divBiz.appendChild(document.createTextNode("团队创建时间：" + new Date(parseInt(biz.dt_created)).toLocaleString()));
    content.appendChild(divBiz);
}

function createGroupDiv(group) {
    var kbName = group.kbName;
    var kbGuid = group.kbGuid;
    var content = document.getElementById("group");
    var divKb = document.createElement("div");
    divKb.id = kbGuid;
    divKb.style.margin = "20px";
    divKb.style.padding = "10px"
    divKb.appendChild(document.createTextNode("群组名称：" + kbName));
    divKb.appendChild(document.createTextNode("群组创建时间：" + new Date(parseInt(group.dtCreated)).toLocaleString()));
    content.appendChild(divKb);
}


function appendKbDiv(groupKb) {
    var bizGuid = groupKb.bizGuid;
    var kbName = groupKb.kbName;
    var biz = document.getElementById(bizGuid);
    var divKb = document.createElement("div");
    divKb.appendChild(document.createTextNode("群组名称：" + kbName));
    divKb.appendChild(document.createTextNode("群组创建时间：" + new Date(parseInt(groupKb.dtCreated)).toLocaleString()));
    biz.appendChild(divKb);
}

function processData() {
    var bizArray = new Array();
    for (i = 0; i < bizList.length; i++) {
        var biz = bizList[i];
        var bizGuid = biz.biz_guid;
        createBizDiv(biz);
        bizArray[i] = bizGuid;
    }
    groupByBiz(bizArray, groupList);
    groupByBiz(bizArray, toDoList);
}

function groupByBiz(bizArray, groupList) {
    for (j = 0; j < groupList.length; j++) {
        if (groupList[j].bizGuid && bizArray.indexOf(groupList[j].bizGuid)) {
            appendKbDiv(groupList[j]);
        } else {
            createGroupDiv(groupList[j])
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
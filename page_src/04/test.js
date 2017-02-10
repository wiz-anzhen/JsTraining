window.onload = run();
function arrayTest() {
    var learnNode = ["I", "will", "learn", "a", "programm", "language"];
    var learnNodeLength = learnNode.length;
    for (var i = 0; i < learnNodeLength; i++) {
        var div = document.createElement("div");
        learnNode.pop();
        document.body.appendChild(div);
    }
}

function initDom1() {
    var div = document.createElement("div");
    var label = document.createElement("label");
    label.setAttribute("for", "username");
    var labelText = document.createTextNode("用户名:");
    label.appendChild(labelText);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "username");
    label.appendChild(input);
    div.appendChild(label);
    document.body.appendChild(div);

}

function initDom2() {
    var div = document.createElement("div");

    var label = document.createElement("label");
    label.setAttribute("for", "passwd");
    var labelText = document.createTextNode("密码:");
    label.appendChild(labelText);
    var input = document.createElement("input");
    input.setAttribute("type", "password");
    input.setAttribute("id", "passwd");
    label.appendChild(input);
    div.appendChild(label);
    document.body.appendChild(div);

}

function initDom3() {
    var button = document.createElement("button");
    button.setAttribute("id", "submit");
    var buttonText = document.createTextNode("提交:");
    button.appendChild(buttonText);
    document.body.appendChild(button);
    document.getElementById("submit").addEventListener("click", login);

}



function run() {
    arrayTest();
    initDom1();
    initDom2();
    initDom3();
    testInterval();
}


let id = "";
$(document).ready(function () {
    if(location.href.includes('login.php')){
        id = "m";
    }else{
        id = "s";
    }
});

$("#acc").blur(() => {
    $("#pw").val("");
});

$("form").submit((event) => {
    $("#accError").remove();
    $("#pwError").remove();
    event.preventDefault();
    // 序列化
    let data = {};
    $("form").serializeArray().forEach(e => {
        data[e.name] = e.value;
    });
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 100,
            acc: data["acc"],
            pw: data["pw"],
            id: id
        },
        success: (response) => {
            let state = JSON.parse(response).stateCode
            let res = JSON.parse(response).result;
            if (res && state == 100) {
                alert("登入成功！");
                location.href = "/";
            }else if(state == 98){
                $("#acc")
                    .addClass("is-invalid")
                    .after(
                        $("<div></div>")
                            .addClass("invalid-feedback")
                            .attr("id", "accError")
                            .text("查無此帳號！"));
            }else if(state == 99){
                $("#pw")
                    .addClass("is-invalid")
                    .after(
                        $("<div></div>")
                            .addClass("invalid-feedback")
                            .attr("id", "pwError")
                            .text("密碼錯誤！"));
            }
        }
    });
});

// Google
/*
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}    "3977863932299669"
*/
// facebook
$("#facebook").click(() => {
    FB.login(function(response) {
        if (response.status === 'connected') {
            let res = response.authResponse;
            let acc = "FB" + res.userID;
            let name = "";
            FB.api(
                res.userID,
                function (response) {
                    if (response && !response.error) {
                        name = response.name;
                        $.ajax({
                            type: "POST",
                            url: "../../api/command.php",
                            data: {
                                key: 100,
                                acc: acc,
                                pw: "f",
                                id: 'm'
                            },
                            success: (response) => {
                                let state = JSON.parse(response).stateCode
                                let res = JSON.parse(response).result;
                                if (res && state == 100) {
                                    alert("登入成功！");
                                    location.href = "/";
                                }else if(state == 98){
                                    if(confirm("此帳號尚未註冊過本系統，是否進行註冊？")){
                                        let data = {};
                                        data['account'] = acc;
                                        data['password'] = 'f';
                                        data['name'] = name;
                                        data['birth'] = '2001-01-01';
                                        data['sex'] = 'm';
                                        data['phone'] = '0900123456';
                                        $.ajax({
                                            type: "POST",
                                            url: "../../api/command.php",
                                            data: {
                                                key: 200,
                                                id: 'm',
                                                data: JSON.stringify(data)
                                            },
                                            success: (response) => {
                                                let state = JSON.parse(response).stateCode;
                                                if (state == 100) {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "../../api/command.php",
                                                        data: {
                                                            key: 100,
                                                            acc: acc,
                                                            pw: "f",
                                                            id: 'm'
                                                        },
                                                        success: (response) => {
                                                            let state = JSON.parse(response).stateCode
                                                            let res = JSON.parse(response).result;
                                                            if (res && state == 100) {
                                                                alert("登入成功！");
                                                                location.href = "accEdit.php";
                                                            }else{
                                                                alert(state + " Error! - 100");
                                                                location.reload();
                                                            }
                                                        }
                                                    });
                                                }else{
                                                    alert(state + " Error! - 200");
                                                    location.reload();
                                                }
                                            }
                                        });
                                    }else {
                                        location.reload();
                                    }
                                }else{
                                    alert(state + " Error! - 100");
                                    location.reload();
                                }
                            }
                        });
                    }
                }
            );
            
        } else {
            alert("Facebook Error!");
        }
    });
});
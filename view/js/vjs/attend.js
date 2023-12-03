// 取得GET值
let eID = new URL(location.href).searchParams.get('eID');
// 是否登入
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 110
    },
    success: (response) => {
        let res = JSON.parse(response);
        if(res.stateCode == 100) {
            $("#register").hide();
            $("#login").hide();
            $("#account").text(res.result[0]);
            // 展覽資訊
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 302,
                    eID: eID
                },
                success: (response) => {
                    let exh = JSON.parse(response).result;
                    if (exh.sAccount != res.result[0]) {
                        location.href = "/";
                    }
                    let start = exh.start;
                    let end = exh.end;
                    $("#exh")
                        .text(exh.eName + "　［" + start + "～" + end + "］")
                        .attr("href", "exhAdmin.php?eID=" + eID);
                    // today
                    let today = new Date();
                    let d = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
                    if (start > d || d > end){
                        $("#f").hide();
                    }
                }
            });
            // 入場紀錄
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 402,
                    eID: eID
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    let state = json.stateCode;
                    let res = json.result;
                    if(state == 98){
                        $("#att_list").append(
                            $("<h5></h5>")
                                .addClass("m-3 text-center")
                                .text(res[0])
                        );
                    }else if(state == 100){
                        res.forEach(element => {
                            let acc = element.account;
                            let time = element.aTime;
                            let name = element.name;
                            let name_arr = name.split("");
                            name_arr[name.length - 2] = "○";
                            name = name_arr.toString().replace(/,/g, "");
                            let sex = element.sex == 'm' ? '男' : '女';
                            let phone = element.phone;
                            $("#att_list").append(
                                $("<tr></tr>")
                                    .append(
                                        $("<td></td>").text(time),
                                        $("<td></td>").text(acc),
                                        $("<td></td>").text(name),
                                        $("<td></td>").text(sex),
                                        $("<td></td>").text(phone)
                                    )
                            );
                        });
                    }
                }
            });
        }else{
            $("#acc").hide();
            $("#logout").hide();
        }
    }
});
// 登出
$("#logout").click(()=>{
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 120
        },
        success: (response) => {
            console.log(response);
            account = "";
            alert("帳號已登出！");
            location.href = "/";
        }
    })
});
// 入場
$("form").submit((event) => {
    event.preventDefault();
    // 序列化
    let acc = $("form").serializeArray()[0].value;
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 400,
            acc: acc,
            eID: eID
        },
        success: (response) => {
            let state = JSON.parse(response).stateCode
            console.log(state);
            res = JSON.parse(response).result;
            if (res && state == 100) {
                $("#acc_input")
                    .removeClass("is-invalid")
                    .addClass("is-valid");
                location.reload();
            }else{
                $("#acc_input")
                    .addClass("is-invalid");
            }
        }
    });
});
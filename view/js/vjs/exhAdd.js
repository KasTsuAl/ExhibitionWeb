let setInput = (text, name, type, maxlen, col_sm, req, def) => {
    let div = $("<div></div>")
        .addClass("col-12" + (col_sm != 12 ? " col-sm-" + col_sm : ""));
    let label = $("<label></label>")
        .addClass("form-label")
        .attr("for", name)
        .text(text);
    let input = $("<input></input>")
        .addClass("form-control")
        .attr("type", type)
        .attr("name", name)
        .attr("id", name)
        .prop("required", req);
    maxlen == 0 ? null : input.attr("maxlength", maxlen);
    def == null ? null : input.val(def);
    div.append(label, input);
    return div;
}
let account = "";
// 是否登入
$.ajax({
    type: "POST",
    url: "../../api/command.php",
    data: {
        key: 110
    },
    success: (response) => {
        let res = JSON.parse(response);
        if(res.stateCode == 100){
            $("#register").hide();
            $("#login").hide();
            $("#account").text(res.result[0]);
            account = res.result[0];
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
let context = $("<div></div>")
    .addClass("p-4 mx-auto")
    .css("max-width", "500px");
// 標題
let fHead = $("<div></div>")
    .append(
        $("<h5></h5>")
            .text("新增展覽")
    );
// 表單
let form = $("<form></form>")
    .addClass("row g-3 my-3")
    .attr("method", "POST")
    .attr("enctype", "multipart/form-data")
    .attr("action", "../../api/exh_upload.php");
// setInput
let eName = setInput('展覽名稱', 'eName', 'text', 35, 12, true);
let place = setInput('地　　點', 'ePlace', 'text', 20, 12, true);
let start = setInput('起始日期', 'start', 'date', 0, 6, true);
let end = setInput('結束日期', 'end', 'date', 0, 6, true);
let title = setInput('簡介標題', 'title', 'text', 35, 12, true);
let descript = $("<div></div>")
    .addClass("col-12")
    .append(
        $("<label></label>")
            .attr("for", "textarea")
            .addClass("form-label")
            .text("簡介內容"),
        $("<textarea></textarea>")
            .addClass("form-control")
            .attr("id", "textarea")
            .attr("name", "descript")
            .attr("rows", "10")
);
let yt = setInput("Youtube Code", "YTcode", "text", 0, 12, false);
let img = $("<div></div>")
    .addClass("col-12")
    .append(
        $("<label></label>")
            .attr("for", "img")
            .addClass("form-label")
            .text("作品圖片 (支援多張) (*.jpg)"),
        $("<input></input>")
            .addClass("form-control")
            .attr("id", "img")
            .attr("name", "img[]")
            .attr("type", "file")
            .attr("accept", ".jpg")
            .prop("multiple", true)
            .prop("required", true)
);
let submit = $("<div></div>")
    .addClass("col-12 mt-5")
    .append(
        $("<button></button>")
            .addClass("btn btn-primary w-100")
            .attr("id", "submit")
            .attr("type", "submit")
            .prop("disabled", true)
            .text("送　出")
);
// 加入表單
form.append(eName, place, start, end, title, descript, yt, img, submit);
$(".container").append(
    context.append(fHead, form)
);

$("form").submit(function(event) {
    event.preventDefault();
    // 序列化
    let data = {};
    $("form").serializeArray().forEach(e => {
        data[e.name] = e.value;
    });
    data.sAccount = account;
    let img = new FormData(this);
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 300,
            data: JSON.stringify(data)
        },
        success: (response) => {
            let state = JSON.parse(response).stateCode;
            let res = JSON.parse(response).result;
            if (res && state == 100) {
                $.ajax({
                    type: "POST",
                    url: "../../api/exh_upload.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: img,
                    success: (up_response) => {
                        let up_state = JSON.parse(up_response).stateCode;
                        let eID = JSON.parse(up_response).result[0];
                        if(up_state == 100){
                            alert("新增成功！");
                            location = 'exhAdmin.php?eID=' + eID;
                        }else{
                            alert(up_state + " Error.");
                        }
                    }
                });
            }else{
                alert(state + " Error.");
                location = 'sAcc.php';
            }
        }
    });
});
$(document).ready(() => {
    // 日期檢測
    $("#start").blur(() => {
        $("#dError").remove();
        if ($("#end").val() != "") {
            if ($("#start").val() > $("#end").val()){
                $("#start")
                    .addClass("is-invalid")
                    .after(
                        $("<div></div>")
                            .addClass("invalid-feedback")
                            .attr("id", "dError")
                            .text("請確認 起始/結束 日期！")
                    );
                $("#end").addClass("is-invalid");
                $("#submit").prop("disabled", true);
            }else{
                $("#start").removeClass("is-invalid");
                $("#end").removeClass("is-invalid");
                $("#submit").prop("disabled", false);
            }
        }
    });
    $("#end").blur(() => {
        $("#dError").remove();
        if ($("#start").val() != "") {
            if ($("#start").val() > $("#end").val()){
                $("#start")
                    .addClass("is-invalid")
                    .after(
                        $("<div></div>")
                            .addClass("invalid-feedback")
                            .attr("id", "dError")
                            .text("請確認 起始/結束 日期！")
                    );
                $("#end").addClass("is-invalid");
                $("#submit").prop("disabled", true);
            }else{
                $("#start").removeClass("is-invalid");
                $("#end").removeClass("is-invalid");
                $("#submit").prop("disabled", false);
            }
        }
    });
});
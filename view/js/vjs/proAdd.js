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

// 取得GET值
let eID = new URL(location.href).searchParams.get('eID');
let eName = "";
let sAcc = "";
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
            $.ajax({
                type: "POST",
                url: "../../api/command.php",
                data: {
                    key: 302,
                    eID: eID
                },
                success: (response) => {
                    let exh = JSON.parse(response).result;
                    $("#exh")
                        .text(exh.eName)
                        .attr("href", "exhAdmin.php?eID=" + exh.eID);
                    sAcc = exh.sAccount;
                    if(sAcc != account){
                        alert("系統錯誤！");
                        location.href = "/";
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
let context = $("<div></div>")
    .addClass("p-4 mx-auto")
    .css("max-width", "500px");
// 標題
let fHead = $("<div></div>")
    .addClass("d-flex flex-column")
    .append(
        $("<div></div>").append(
            $("<a></a>")
                .addClass("btn btn-secondary rounded-pill py-0 mb-2")
                .attr("id", "exh")
        ),
        $("<h5></h5>")
            .addClass("mt-3")
            .text("新增作品")
    );
// 表單
let form = $("<form></form>")
    .addClass("row g-3 my-3")
    .attr("method", "POST")
    .attr("enctype", "multipart/form-data");
// setInput
let pName = setInput('作品名稱', 'pName', 'text', 35, 12, true);
let author = setInput('作　　者', 'author', 'text', 35, 12, true);
// today
let today = new Date();
let d = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
let date = setInput('創作日期', 'date', 'date', 0, 5, true, d);
let yt = setInput("Youtube Code", "YTcode", "text", 0, 7, false);
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
            .text("送　出")
);
// 加入表單
form.append(pName, author, date, yt, descript, img, submit);
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
    data.eID = eID;
    let img = new FormData(this);
    $.ajax({
        type: "POST",
        url: "../../api/command.php",
        data: {
            key: 500,
            data: JSON.stringify(data)
        },
        success: (response) => {
            let state = JSON.parse(response).stateCode;
            let res = JSON.parse(response).result;
            if (res && state == 100) {
                $.ajax({
                    type: "POST",
                    url: "../../api/pro_upload.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: img,
                    success: (up_response) => {
                        let up_state = JSON.parse(up_response).stateCode;
                        if(up_state == 100){
                            if(confirm("新增成功！\n是否繼續新增")){
                                location.reload();
                            }else{
                                location = 'exhAdmin.php?eID=' + eID;
                            }
                        }else{
                            alert(up_state + " Error.");
                        }
                    }
                });
            }else{
                alert(state + " Error.");
                location = 'exhAdmin.php?eID=' + eID;
            }
        }
    });
});
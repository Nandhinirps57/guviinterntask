var data = {
};
async function login() {

    let valid = false;
    let password = $("#password").val();
    let email = $('#email').val();

    if (password && email) {
        await $.ajax({
            type: "GET",
            url: `http://localhost:3000/users/?id=${email}&?password=${password}`,
            dataType: 'json',
            success: function (res) {
                if (res.length > 0) {
                    if (email === res[0].id && password === res[0].password) {
                        valid = true;
                        console.log(res, res[0]);
                        $.ajax({
                            url: "./php/login.php",
                            method: "get",
                            dataType: "json",
                            data: res[0],
                            success: function (res) {
                                if (res !== "Error")
                                    var data = {} = res;
                                console.log(data);
                                localStorage.setItem("user-info", JSON.stringify(res));
                                $('#error').text("")
                                window.location.href = "./profile.html";
                            },
                            error: function (e) {
                                console.log(e + "error from sql");
                            }
                        })
                    }
                }
            }
        });

    } console.log(valid);
    if (!valid) {
        console.log("error");
        $('#error').text("Invalid Email or Password!");
    }
}

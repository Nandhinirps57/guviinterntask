

var dob = '';

function validate(e, submit) {
    var userData = {
        id: '',
        userName: "",
        email: '',
        password: '',
        gender: '',
        dob: '',
        location: ''
    }
    var de = false;
    var p1 = false;
    var p2 = false;
    var p3 = false;
    var p4 = false;
    var g = false;
    var E = false;
    var Final = false;
    var InvalidPass = [0];
    var N = false;

    let items = e.target;
    if (items.id === "name" || submit) {

        let item = document.getElementById("name").value;
        if (item.length < 3 || (item.length < 3 && submit)) {
            N = false
            $("#name1").text("Name should be greaterthan 3 chars");
        } else {
            N = true
            userData.userName = item;
            $("#name1").text("");
        }
    }

    if (items.id === "email" || submit) {
        let item = document.getElementById("email").value;
        var input = item;
        var emails = /^([a-z0-9])+@gmail.com$/g;
        var check1 = emails.test(input);
        if (check1 != true) {
            this.Invalid = "Email is Invalid!";
            $("#email1").text("Email is Invalid!")
        } else {
            this.Invalid = "";
            $("#email1").text("");
            E = true;
            userData.id = item;
            userData.email = item;
        }

    }


    if (items.id === "password" || submit) {
        let item = document.getElementById("password").value;
        //=================================Password valdation!=========================================
        var input1 = item;
        var pass = /^((?=.*[0-9])(?=.*[!@#$%*&]).{1,})+$/;
        var check2 = pass.test(input1);

        var len1 = input1;
        var vali = /^.[A-Z]/g;
        var vali1 = vali.test(input1);
        if (input1 == "") {
            InvalidPass[0] = "please set the password ";
        } else {
            InvalidPass[0] = "Password Will be:-";

            if (vali1 != true) {
                InvalidPass[1] = "*please use caps with first 2 letters";
            } else {
                (InvalidPass[1] = ""), (p1 = true);
            }
            //-------------------------------------------------
            var checkalbSmall = /(?=.*[a-z])/;
            var checkalbSmall1 = checkalbSmall.test(input1);
            if (checkalbSmall1 != true) {
                InvalidPass[2] = "*please use small letters";
            } else {
                (InvalidPass[2] = ""), (p2 = true);
            }
            //==================================================================================
            if (len1.length < 5) {
                InvalidPass[3] = "*length should be above 5";
            } else {
                InvalidPass[3] = "";
                p3 = true;
            }
            //============================LENGTH======================================
            if (check2 != true) {
                InvalidPass[4] = "*please use 0-9 and !@#$%*&";
            } else {
                InvalidPass[4] = "";
                p4 = true;
            }
        }
        if (p1 && p2 && p3 && p4 == true) {
            InvalidPass[0] = ""
            userData.password = item;
        }

        $("#check").remove()
        jQuery('<div>', {
            id: 'check',
            class: 'text-start small'
        }).appendTo('#see');
        for (let i = 0; i < InvalidPass.length; i++) {
            let p = document.createElement("p");
            p.innerHTML = InvalidPass[i];
            $("#check").append(p);

        }
    }

    if (items.id === "Date" || submit) {

        let item = document.getElementById("Date").value;
        const now = new Date();
        var curr = now.getFullYear();
        if (item == "") {
            document.getElementById('date').innerHTML = "please mention your DOB";
        }
        else {
            if (item.substring(0, 4) < curr - 13) {
                document.getElementById('date').innerHTML = "";
                de = true;
                dob = new Date(item).toLocaleDateString("IN").toString();
            }
            else { document.getElementById('date').innerHTML = "&ensp;Sorry your age should have above 13"; }
        }

    }

    //==================Gender===================================================
    if (items.name === "gender" || submit) {
        let gender = document.getElementsByName('gender');
        let txt = "";
        let i;
        for (i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                txt = txt + gender[i].value + "";
            }
        } if (txt === "female" || txt === "male") {
            document.getElementById('gender').innerHTML = ""; g = true;
            userData.gender = txt
        }
        else { document.getElementById('gender').innerHTML = "hey can i know your gender--><br>else i cant submit"; }
    }

    if (p1 && p2 && p3 && p4 && E && N && g && de) {

        userData.dob = dob;
        Final = true;
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            dataType: 'json',
            error: (e) => {
                Final = false;
                if (e.statusText === "error") {
                    alert("Internal Error");
                } else {
                    alert("The emailID is already Exits please use differnt");
                }
            },
            data: userData,
            success: function (res) {
                window.location.href = './login.html';
                console.log(res);
                document.getElementById('form').reset();
                $.ajax({
                    url: "./php/register.php",
                    method: "post",
                    data: userData,
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
            }
        }).done(console.log("done"));
    }

    return Final;
}


$(document).ready(function () {
    $("form").submit(function (e) {

        validate(e.target, true);
        e.preventDefault();
    });
});


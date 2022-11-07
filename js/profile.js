
let user = {};
var data = {};

var userData = {
  uid: 0,
  userName: "",
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  mobile: '',
  postalCode: '',
  aboutMe: ''
}

async function onloads() {
  let users = JSON.parse(localStorage.getItem("user-info"));

  await $.ajax({
    url: "./php/profile.php",
    type: 'get',
    method: "get",
    dataType: 'json',
    data: users,
    success: function (res) {
      data = res;
      $("#head").text(`Hello ${data.userName}`);
      $("#head3").text(`${data.userName}` + " ,27");
      $("#userName").val(data.userName);
      $("#email").val(data.email);
      $("#firstName").val(data.firstName);
      $("#lastName").val(data.lastName);
      $("#address").val(data.address);
      $("#city").val(data.city);
      $("#mobile").val(data.mobile);
      $("#postalCode").val(data.postalCode);
      $("#aboutMe").val(data.aboutMe);
      console.log("Success" + data.firstName);
    },
    error: function (e) {
      console.log(e);
      $("#head").text(`Hello ${user.userName}`);
      $("#userName").val(user.userName);
      $("#email").val(user.email);
      alert("Welcome New User please update you details");

    }
  });

}

$(document).ready(function () {
  user = JSON.parse(localStorage.getItem("user-info"));
  if (!user) {
    alert("Please Login First");
    window.location.href = "./login.html";
  }

  onloads();
});



function logout() {
  localStorage.clear();
  window.location.href = "./login.html";
  location.reload();
}

function inputs(data) {
  const ni = data.target;
  if (ni.id === "userName") {
    userData.userName = ni.value;
  }
  if (ni.id === "email") {
    userData.email = ni.value;
  }
  if (ni.id === "firstName") {
    userData.firstName = ni.value;
  }
  if (ni.id === "lastName") {
    userData.lastName = ni.value;
  }
  if (ni.id === "address") {
    userData.address = ni.value;
  }
  if (ni.id === "city") {
    userData.city = ni.value;
  }
  if (ni.id === "mobile") {
    userData.mobile = ni.value;
  }
  if (ni.id === "postalCode") {
    userData.postalCode = ni.value;
  }
  if (ni.id === "aboutMe") {
    userData.aboutMe = ni.value;
  }
}

function submit(check) {
  if (check) {
    console.log(check);
    var keys = Object.keys(userData);
    keys.forEach(function (key) {
      if (userData[key] == '') {
        userData[key] = data[key]
      }
    });
  }

  if (userData.userName == undefined) {
    userData.userName = user.userName;
    userData.email = user.email;
  }
  userData.uid = user.uid;

  $.ajax({
    url: "./php/profile.php",
    method: "post",
    dataType: "json",
    data: userData,
    success: function (result) {
      console.log(result, "lets see");
    },
    error: (e) => {
      console.log(e);
    }
  })
}
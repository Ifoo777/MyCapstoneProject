function item(name, image) {
  this.name = name;
  this.image = image;
}

//function to save the specified item sfor later by adding them to an array which is stored in sessionstorage
function saveforlater(row) {
  savedForLater = [];
  let tr = document.getElementById(row);
  let name = tr.firstChild.children[1].firstChild.textContent;
  console.log(name);

  let image = tr.firstChild.children[0].firstChild.src;
  console.log(image);
  let newitem = new item(name, image);
  savedForLater.push(newitem);
  sessionStorage.setItem("saved", JSON.stringify(savedForLater));
  alert("There are now " + savedForLater.length + " items in your list");
}
//every time the page loads the 'saved items' table is created form the stored array
function CreateList() {
  saveditems = JSON.parse(sessionStorage.getItem("saved"));
  for (i = 0; i < saveditems.length; i++) {
    table = document.getElementById("savetable");
    tr = table.insertRow();
    tr.id = "tr" + i;
    tr.insertCell().textContent = saveditems[i].name;
    tr.insertCell().innerHTML = saveditems[i].image;
  }
}

//if an item is liked it is also stored in an array so that the like can be indicated to the user
function like(event, item) {
  if (JSON.parse(sessionStorage.getItem("liked") == null)) {
    liked = [];
  } else {
    liked = [];
    liked = JSON.parse(sessionStorage.getItem("liked"));
  }
  liked.push(item);
  sessionStorage.setItem("liked", JSON.stringify(liked));
  checkliked(event);
}
//this function runs to check if any of the items have been liked an then the text is changed to say 'you liked this item'
function checkliked(event) {
  event.target.innerHTML = "You liked this item";
  // if (JSON.parse(sessionStorage.getItem("liked") == null)) {
  //   liked = [];
  // } else {
  //   liked = [];
  //   liked = JSON.parse(sessionStorage.getItem("liked"));
  // }

  // i = 0;
  // while (i < liked.length) {
  //   document.getElementById(liked[i]).childNodes[7].textContent =
  //     "You liked this item";

  //   document.getElementById(liked[i]).childNodes[7].classList.add("a3");
  //   i = i + 1;
  // }
}

//this adds the functionality to the dropdown on the contact me page
$("#l1").click(function () {
  $("#Reason").val("Question");
});
$("#l2").click(function () {
  $("#Reason").val("Suggestion");
});
$("#l3").click(function () {
  $("#Reason").val("Complaint");
});

//this is an animation in a callback that rotates the top 3 images 1 at a time
//got the structure for the callbacks form "https://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate"
function rot1(angle) {
  $({ degrees: angle }).animate(
    { degrees: angle + 360 },
    {
      duration: 2000,
      step: function (now) {
        $("#sp1").css({
          transform: "rotate(" + now + "deg)",
          function() {
            rot2(0);
          },
        });
      },
    }
  );
}
function rot2(angle) {
  $({ degrees: angle }).animate(
    { degrees: angle + 360 },
    {
      duration: 2000,
      step: function (now) {
        $("#sp2").css({
          transform: "rotate(" + now + "deg)",
          function() {
            rot3(0);
          },
        });
      },
    }
  );
}
function rot3(angle) {
  $({ degrees: angle }).animate(
    { degrees: angle + 360 },
    {
      duration: 2000,
      step: function (now) {
        $("#sp3").css({ transform: "rotate(" + now + "deg)" });
      },
    }
  );
}

//call the above rotate functions when teh page loads
$(document).ready(function () {
  rot1(0, function () {});
});

function myLoad() {
  //event listner for input boxes enter key down
  document.getElementById("name").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      inputitem();
    }
  });
  document
    .getElementById("comment")
    .addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        inputitem();
      }
    });
}
function comment(name, comment) {
  this.name = name;
  this.comment = comment;
}

//function to add a new item
function inputitem() {
  if (JSON.parse(sessionStorage.getItem("comments") == null)) {
    comments = [];
  } else {
    comments = [];
    comments = JSON.parse(sessionStorage.getItem("comments"));
  }
  let newcomment = new comment(
    document.getElementById("name").value,
    document.getElementById("comment").value
  );
  comments.push(newcomment);
  sessionStorage.setItem("comments", JSON.stringify(comments));
  createlist();
  document.getElementById("name").value = null;
  document.getElementById("comment").value = null;
}

//function to delete an item
function deleteitem(n) {
  comments.splice(n, 1);
  sessionStorage.setItem("comments", JSON.stringify(comments));
  createlist();
}

//function to edit an item
function edititem(n) {
  comments = JSON.parse(sessionStorage.getItem("comments"));
  document.getElementById("tr" + n).innerHTML =
    "<td> <input type='text' id='editname'> </td><td> <input type='text' id='editcomment'> </td><td><img src='Images/save-xxl.png' alt='Save Icon' height='20' id='0' onclick='saveditem(" +
    n +
    ")' class='clickitem'></td><td><img src='Images/delete-xxl.png' alt='Delete Icon' height='20' id='0' onclick='deleteitem(" +
    n +
    ")' class='clickitem'></td>";
  document.getElementById("name").style.visibility = "hidden";
  document.getElementById("comment").style.visibility = "hidden";
  document.getElementById("savebutton").style.visibility = "hidden";
  document.getElementById("editname").value = comments[n].name;
  document.getElementById("editcomment").value = comments[n].comment;
}
//function to save the newly edited items
function saveditem(n) {
  comments[n].name = document.getElementById("editname").value;
  comments[n].comment = document.getElementById("editcomment").value;
  sessionStorage.setItem("comments", JSON.stringify(comments));
  createlist();
  document.getElementById("name").style.visibility = "visible";
  document.getElementById("comment").style.visibility = "visible";
  document.getElementById("savebutton").style.visibility = "visible";
}

//function on load of the page to check if there is any data in the sessionstorage
function Load() {
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    comments = [];
    sessionStorage.setItem("comments", JSON.stringify(comments));
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    createlist();
  }
}

//run array, for each item in the array add a list item in the ordered list
function createlist() {
  if (JSON.parse(sessionStorage.getItem("comments") == null)) {
    comments = [];
  } else {
    comments = [];
    comments = JSON.parse(sessionStorage.getItem("comments"));
    comments = JSON.parse(sessionStorage.getItem("comments"));
    let table = document.getElementById("tabledata");
    table.innerHTML = "";
    for (i = 0; i < comments.length; i++) {
      let tr = table.insertRow();
      tr.id = "tr" + i;
      tr.insertCell().textContent = comments[i].name;
      tr.insertCell().textContent = comments[i].comment;
      tr.insertCell().innerHTML =
        "<img src='Images/edit-xxl.png' alt='Delete Icon' height='20' id='" +
        i +
        "' onclick='edititem(" +
        i +
        ")' class='clickitem'>";
      tr.insertCell().innerHTML =
        "<img src='Images/delete-xxl.png' alt='Delete Icon' height='20' id='" +
        i +
        "' onclick='deleteitem(" +
        i +
        ")' class='clickitem'>";
    }
  }
}

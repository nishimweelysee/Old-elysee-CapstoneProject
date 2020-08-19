function myFunction() {
    var x = document.getElementById("navmenu");
    console.log(x)
    if (x.className === "nav_items") {
      x.className += " responsive";
    } else {
      x.className = "nav_items";
    }
  }
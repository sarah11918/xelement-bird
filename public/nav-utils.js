document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("nav").classList.add("open-nav");
  });
  
  document.getElementById("exit-btn").addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open-nav");
  });
  
  function displayWindowSize() {
    var w = window.innerWidth;
    if (w > 865) {
      document.getElementById("header-container").classList.add("large-screen");
    } else {
      document
        .getElementById("header-container")
        .classList.remove("large-screen");
    }
  }
  
  window.addEventListener("resize", displayWindowSize);
  // document.getElementById("header").classList.add('sidebar')
  
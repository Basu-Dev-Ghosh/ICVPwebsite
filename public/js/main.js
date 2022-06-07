const collapse_btn = document.getElementById("collapse-btn");
const fn = (e) => {
  const root_container = document.getElementById("root-container");
  console.log(root_container);
  const trade_header = document.getElementById("trade-header");
  if (root_container.classList.contains("hide")) {
    root_container.classList.remove("hide");
    trade_header.classList.remove("hide");
  } else {
    root_container.classList.add("hide");
    trade_header.classList.add("hide");
  }
};
collapse_btn.addEventListener("click", fn);

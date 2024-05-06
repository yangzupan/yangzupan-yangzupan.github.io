// 滑动主体
let goToMain = document.getElementById("go-to-main");
goToMain.addEventListener("click", function () {

  window.scrollTo({
    top: document.documentElement.clientHeight,
    behavior: "smooth",
  });
});

// 夜间模式切换
var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  themeToggleLightIcon.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark");
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});



// 生成二维码
var link = document.querySelectorAll(".qr-link");
var qrcodeImg = document.querySelectorAll(".qrcode-img");

for (let i = 0; i < link.length; i++) {
  new AwesomeQR.AwesomeQR({
    text: link[i].href, // 内容
    // size: 256, // 二维码大小
    margin: 12, // 二维码白边大小
  }).draw()
    .then((dataURL) => {
      qrcodeImg[i].setAttribute("src", dataURL)
    })
    .catch((err) => {
      console.error(err);
    });
}
// 下载名片
var download = document.querySelectorAll(".download");
var card = document.querySelectorAll(".card");

for (let i = 0; i < download.length; i++) {
  download[i].addEventListener('click', function () {
    html2canvas(card[i]).then(canvas => {
      canvas.toBlob(blob => {
        const href = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        const name = document.querySelectorAll(".name")[i].innerText;
        link.href = href
        link.download = name + '的名片.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 'image/png')
    });
  }, false)

}
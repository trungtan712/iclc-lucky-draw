var totalMember = 0;
var member = [];
var resultTest = [];
const config = {
  totalMember,
  memberNumber: member,
  nhat: 1,
  nhi: 2,
  ba: 3,
  khuyenkhich: 10,
  mayman: totalMember - 16,
};
reset();
function appearResult() {
  $(".palette, .color").each(function (i, e) {
    setTimeout(function () {
      $(e).addClass("in");
      spanValue = e.querySelector("span");
      const dataValue = parseInt($(e).attr('data-value'));
      animateValue(spanValue, 0, dataValue, dataValue * 40);
    }, i * 600);
  });
}

function createArrayByNumber(soLuong) {
  var mang = [];
  for (var i = 1; i <= soLuong; i++) {
    mang.push(i);
  }
  return mang;
}

function reset() {
  totalMember = 50;
  member = createArrayByNumber(totalMember);
  console.log(member.sort((a, b) => a - b));
  config.mayman = totalMember - 16;
  $(`#amount-nhat`).text(config.nhat);
  $(`#amount-nhi`).text(config.nhi);
  $(`#amount-ba`).text(config.ba);
  $(`#amount-khuyenkhich`).text(config.khuyenkhich);
  $(`#amount-mayman`).text(config.mayman);
}

function getRandomAndRemove(numberOfRandoms) {
  var result = [];

  for (var i = 0; i < numberOfRandoms; i++) {
    if (member.length === 0) {
      break;
    }
    var randomIndex = Math.floor(Math.random() * member.length);
    result.push(member[randomIndex]);
    member= member.filter((m) => m != member[randomIndex]);
  }
  resultTest.push(...result);
  // resultTest.push(result.sort((a, b) => a - b));
  return result;
  
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function renderResult(numberOfRandoms) {
  const results = getRandomAndRemove(numberOfRandoms);
  const paletteResult = $("#palette-result");
  paletteResult.empty();
  results.forEach((result) => {
    const colorDiv = $("<div>").addClass("color").attr("data-value", result);
    const spanNumber = $("<span>").text(result);
    colorDiv.append(spanNumber);
    paletteResult.append(colorDiv);
  });
  console.log(resultTest.sort((a, b) => a - b));
  appearResult();
}

function bookGift(element) {
  const typeGift = $(element).attr("data-tpe");
  let resultToRender = 0;
  let ribbonSrc = 1;
  console.log(typeGift);
  switch (typeGift) {
    case "nhat":
      resultToRender = Math.min(config.nhat, 1);;
      ribbonSrc = 1;
      break;
    case "nhi":
      resultToRender = Math.min(config.nhi, 2);;
      ribbonSrc = 2;
      break;
    case "ba":
      resultToRender = Math.min(config.ba, 3);;
      ribbonSrc = 3;
      break;
    case "khuyenkhich":
      resultToRender = Math.min(config.khuyenkhich, 10);;
      ribbonSrc = 4;
      break;
    case "mayman":
      resultToRender = Math.min(config.mayman, 10);
      ribbonSrc = 5;
      break;
  }
  config[typeGift] = config[typeGift] - resultToRender;
  $(`#amount-${typeGift}`).text(config[typeGift]);
  renderResult(resultToRender);
  setRibbon(ribbonSrc);
}

function setRibbon(number) {
  $("#ribbon-img").attr("src", `./assets/ribbon/ribbon${number}.png`);
}


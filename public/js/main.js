const $movie_url = document.querySelector("#movie_url"),
  reg =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
$movie_url.addEventListener("input", () => {
  const urlValue = $movie_url.value;
  document.querySelector(".movie_url_log").textContent = !reg.test(urlValue)
    ? "이미지 url를 입력해주세요."
    : "";
});
$movie_url.addEventListener("blur", () => {
  document.querySelector(".movie_url_log").textContent = "";
});
const $input_grade = document.querySelector("#input_grade");
reg2 = /^[0-5]+$/;
$input_grade.addEventListener("input", () => {
  const gradeValue = $input_grade.value;
  document.querySelector(".grade_log").textContent = !reg.test(gradeValue)
    ? "최대 5점입니다."
    : "";
});
$input_grade.addEventListener("blur", () => {
  document.querySelector(".grade_log").textContent = "";
});

document.querySelector("#input_comment").addEventListener("click", () => {
  document.querySelector(".comment_log").textContent = "최대 500글자";
});

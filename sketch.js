let radio;
let submitButton;
let resultText = "";
let resultColor = "#000000"; // 預設文字顏色為黑色
let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let isAnswered = false;

function preload() {
  // 使用 p5.Table 讀取 CSV 檔案
  questions = loadTable("questions.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#bbd0ff");

  // 建立選擇題
  radio = createRadio(); // 建立選項按鈕
  radio.style('width', '200px');  // 設定選項按鈕的寬度
  radio.style('font-size', '30px'); // 設定選項按鈕的字體大小

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 50, height / 2 + 40);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  displayQuestion();
}

function draw() {
  background("#bbd0ff");
  textAlign(CENTER);
  textSize(30);
  fill("#000000"); // 題目顏色保持黑色
  if (currentQuestionIndex < questions.getRowCount()) {
    text(questions.getString(currentQuestionIndex, 'question'), width / 2, height / 2 - 100);
  }
  fill(resultColor); // 設定答對或答錯文字的顏色
  text(resultText, width / 2, height / 2 + 150); // 向下移動顯示結果的文字
  fill("#000000"); // 左上角文字顏色保持黑色
  text('413730127許思騏', 150, 60);
}

function displayQuestion() {
  radio.option(questions.getString(currentQuestionIndex, 'option1'), '1');
  radio.option(questions.getString(currentQuestionIndex, 'option2'), '2');
  radio.option(questions.getString(currentQuestionIndex, 'option3'), '3');
  radio.option(questions.getString(currentQuestionIndex, 'option4'), '4');
  radio.position(width / 2 - 50, height / 2 - 20); // 設定選項按鈕的位置
  submitButton.html('送出'); // 重置按鈕文字
  radio.selected(null); // 重置選項按鈕的選擇
  isAnswered = false; // 重置回答狀態
}

function checkAnswer() {
  const answer = radio.value();
  console.log("選擇的答案是: " + answer); // 除錯訊息
  if (answer === questions.getString(currentQuestionIndex, 'answer')) {
    resultText = "答對了！";
    resultColor = "#00FF00"; // 綠色
    correctCount++;
  } else {
    resultText = "答錯了！";
    resultColor = "#FF0000"; // 紅色
    incorrectCount++;
  }
  isAnswered = true; // 標記為已回答

  // 顯示下一題
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.getRowCount()) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  resultText = `結束答題！答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`;
  resultColor = "#000000"; // 黑色
  submitButton.hide(); // 隱藏送出按鈕
  radio.hide(); // 隱藏選項按鈕
}
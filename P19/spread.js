const numbers = [10, 20, 30, 40, 50];
const [first, second, ...others] = numbers;
console.log("First:", first);       // 10
console.log("Second:", second);     // 20
console.log("Others:", others);     // [30, 40, 50]

console.log("Jack Ma maslahatlari");
const list = [
    "yaxshi talaba boling", // 0-20
    "to'g'ri boshliq tanlang va ko'proq xato qiling", // 20-30
    "o'zingizga ishlashni boshlang", // 30-40
    "siz kuchli bo'lgan narsalarni qiling", // 40-50
    "yoshlarga investitsiya qiling", // 50-60
    "dam oling, foydasi yo'q endi", // 60
];


// CALLBACK FUNCTIONS

function maslahatBering(a, callback) {
    if (typeof a !== "number") callback("insert a number", null);
    else if (a <= 20) callback(null, list[0]);
    else if (a > 20 && a <= 30) callback(null, list[1]);
    else if (a > 30 && a <= 40) callback(null, list[2]);
    else if (a > 40 && a <= 50) callback(null, list[3]);
    else if (a > 50 && a <= 60) callback(null, list[4]);
    else {
        setTimeout(function () {
            callback(null, list[5]);
        }, 5000);   //5soniyadan song javob keladi
    }
}
console.log('passed here 0');
maslahatBering(65, (err, data) => {
    if (err) console.log('ERROR: ', err);
    else {
        console.log('javob:', data);
    }
})
console.log('passed here 1');



// ASYNC function
async function maslahatBering(a) {
    if (typeof a !== "number") throw new Error("insert a number");
    else if (a <= 20) return list[0];
    else if (a > 20 && a <= 30) return list[1];
    else if (a > 30 && a <= 40) return list[2];
    else if (a > 40 && a <= 50) return list[3];
    else if (a > 50 && a <= 60) return list[4];
    else {
        return new Promise((resolve, reject) => {      //Promise - kelajakda keladigan natija
            setTimeout(() => {
                resolve(list[5]);
            }, 5000);
        });
    }
}

// call via then/catch
// console.log("passed here 0");
// maslahatBering(65)
//   .then((data) => {
//     console.log("javob:", data);
//   })
//   .catch((err) => {
//     console.log("ERROR:", err);
//   });
// console.log("passed here 1");

// // call via asyn/await
async function run() {
    let javob = await maslahatBering(55);
    console.log(javob);
    javob = await maslahatBering(70);
    console.log(javob);
    javob = await maslahatBering(33);
    console.log(javob);
}
run();






// A-TASK

function countLetter(letter, word) {
    let count = 0;

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            count++;
        }
    }
    return count;
}

console.log(countLetter("a", "KakaoTalk"));
console.log(countLetter("e", "Korea"));
console.log(countLetter("l", "alligator"));


// B-TASK

function countDigit(string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] >= "0" && string[i] <= "9") {
            count++;
        }
    }
    return count;
}


console.log(countDigit("1asd23fe4ht85")); // 6 
console.log(countDigit("4abc73def3w9")); // 5
console.log(countDigit("hello3")); // 1


// C-TASK

function checkContent(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    return str1.split("").sort().join("") === str2.split("").sort().join("");
}

console.log(checkContent("listen", "silent")); // true
console.log(checkContent("class", "school")); // false
console.log(checkContent("apple", "lppae")); // true


// D-TASK

class Shop {
    constructor(potatoes, carrots, onions) {
        this.potatoes = potatoes;
        this.carrots = carrots;
        this.onions = onions;
    }

    qoldiq() {
        let time = new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

        return `Hozir ${time}da ${this.potatoes}ta kartoshka, ${this.carrots}ta sabzi va ${this.onions}ta piyoz mavjud!`;
    }

    sotish(product, amount) {
        this[product] -= amount;

        let time = new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

        console.log(`Hozir ${time}da ${amount}ta ${product} sotildi.`);
    }

    qabul(product, amount) {
        this[product] += amount;

        let time = new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

        console.log(`Hozir ${time}da ${amount}ta ${product} qabul qilindi.`);
    }
}

const shop = new Shop(4, 5, 2);

console.log(shop.qoldiq());

shop.sotish("potatoes", 3);

shop.qabul("onions", 4);

console.log(shop.qoldiq());



/* E-TASK

Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni teskari qilib return qilsin.
 MASALAN: getReverse("hello") return qilsin "olleh".
*/

function getReverse(str) {
    let reverse = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reverse += str[i];
    }
    return reverse;
}

console.log(getReverse("Javascript")); // "tpircsavaJ"
console.log(getReverse("MIT9")); // "9TIM"
console.log(getReverse("Korea")); // "aeroK"



/* G-TASK

Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta 
qiymatiga tegishli birinchi indexni qaytarsin. MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.
*/

function getHighestIndex(arr) {
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }

    return maxIndex;
}

console.log(getHighestIndex([8, 15, 33, 9, 17, 26]));            //2



/* F-TASK

Shunday findDoublers function tuzing, unga faqat bitta string argument pass bolib, agar stringda bir hil harf 
qatnashgan bolsa true, qatnashmasa false qaytarishi kerak. MASALAN: getReverse("hello") return true return qiladi.
*/

function findDoublers(str) {
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (str[i] === str[j]) {
                return true;
            }
        }
    }
    return false;
}

console.log(findDoublers("cheers"));       //true
console.log(findDoublers("fridge"));       // false
console.log(findDoublers("football"));     //true





/* K-TASK

Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar 
sonini qaytarsin. MASALAN: countVowels("string") return 1. */

function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

console.log(countVowels("Apple"));                      // 2
console.log(countVowels("mashaqqat"));                  // 3
console.log(countVowels("Airconditioner"));             // 7
  



/* L-TASK

Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib va sozlar 
ketma-ketligini buzmasdan stringni qaytarsin. MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc".    
*/

function reverseSentence(str) {
  return str
    .split(" ")
    .map(word => word.split("").reverse().join(""))
    .join(" ");
}

console.log(reverseSentence("I like swimming"));           // I ekil gnimmiws
console.log(reverseSentence("Let's learn Coding"));        // s'teL nrael gnidoC
console.log(reverseSentence("Break a leg"));               // kaerB a gel

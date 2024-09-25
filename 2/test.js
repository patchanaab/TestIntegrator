//---Write a JavaScript function that accepts an array of numbers and returns an array sorted in ascending order.---//

const sortArray = (arr) => {
    return arr.sort((a,b) => a - b )
};

let a = [5,8,3,7,1];
console.log(sortArray(a));
var GLOB_WORD_LIST = null;

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function return_test() {
  return "Testing";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Numbers (n)
// Concatenates dpn dice throws, for n number of strings
function dice_roller(n) {
  var random_numbers = Array();
  for(var i = 0; i < n; ++i) {
    var x = "";
    for(var j = 0; j < 5; ++j) {
      var array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      x += array[0]%5 + 1;
    }
    random_numbers[i] = x;
  }
  return random_numbers;
}

function clean_diceware_input(data) {
  var dirty_word_list = data.split("\n");
  // dirty_word_list.pop();

  var word_list = Array();
  dirty_word_list.forEach(line => {
    var broken_line = line.split("\t");
    word_list[broken_line[0]] = broken_line[1];
  });
  // console.log(word_list);
  return word_list;
}

function generate_diceware_password(word_list, random_numbers, spaces, rand) {
  var pass = "";
  var delim = spaces ? " " : "";

  var rchars = "!@#$%&";
  var rlength = rchars.length;
  var plength = random_numbers.length;

  random_numbers.forEach(number => {
    pass += word_list[number] + delim;
    if(getRandomInt(plength) === 0 && rand) {
      pass = pass.insert(getRandomInt(pass.length), rchars[getRandomInt(rlength)]);
    }
  });

  return spaces ? pass.slice(0, -1) : pass;
}

// If given both data and word_list, the data is ignored!
function diceware_password(source, number_of_words, spaces, rand) {
  if (GLOB_WORD_LIST == null) {
    var data = document.getElementById(source).innerHTML;
    word_list = clean_diceware_input(data);
    GLOB_WORD_LIST = word_list;
  }

  let random_numbers = dice_roller(number_of_words);
  
  return generate_diceware_password(GLOB_WORD_LIST, random_numbers, spaces, rand);
}


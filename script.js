const bingo_options = [
    "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty",
    "Twenty one","Twenty two","Twenty three","Twenty four","Twenty five","Twenty six","Twenty seven","Twenty eight","Twenty nine","Thirty",
    "Thirty one","Thirty two","Thirty three","Thirty four","Thirty five","Thirty six","Thirty seven","Thirty eight","Thirty nine","Forty",
    "Forty one","Forty two","Forty three","Forty four","Forty five","Forty six","Forty seven","Forty eight","Forty nine","Fifty",
    "Fifty one","Fifty two","Fifty three","Fifty four","Fifty five","Fifty six","Fifty seven","Fifty eight","Fifty nine","Sixty",
    "Sixty one","Sixty two","Sixty three","Sixty four","Sixty five","Sixty six","Sixty seven","Sixty eight","Sixty nine","Seventy",
    "Seventy one","Seventy two","Seventy three","Seventy four","Seventy five","Seventy six","Seventy seven","Seventy eight","Seventy nine","Eighty",
    "Eighty one","Eighty two","Eighty three","Eighty four","Eighty five","Eighty six","Eighty seven","Eighty eight","Eighty nine","Ninety",
    "Ninety one","Ninety two","Ninety three","Ninety four","Ninety five","Ninety six","Ninety seven","Ninety eight","Ninety nine","One Hundred"
];
if (!localStorage['dv-bingo-hash']){
	localStorage.setItem('dv-bingo-hash',Math.random())
}
const identifier = localStorage['dv-bingo-hash']
const date = new Date().toISOString().split('T')[0];
let generate_seed = MurmurHash3(identifier + date);
let random_number = SimpleFastCounter32(generate_seed(), generate_seed());

var bingo_elements = document.getElementsByClassName('bingo-box');
var current_sheet = [];
for (let i = 0; i < bingo_elements.length; i++) {
	do {
		var prompt = Math.floor(bingo_options.length*random_number());
	} while (current_sheet.includes(prompt))
	current_sheet = current_sheet + prompt;
	bingo_elements[i].innerText = bingo_options[prompt];

    bingo_elements[i].addEventListener("click", function(e) {
        var background = bingo_elements[i].style.background
        if (background == '') { bingo_elements[i].style.background = '#fdd' }
        else { bingo_elements[i].style.background = '' }
    })

}

function MurmurHash3(string) {
    let i = 0;
    for (i, hash = 1779033703 ^ string.length; i < string.length; i++) {
        let bitwise_xor_from_character = hash ^ string.charCodeAt(i);
        hash = Math.imul(bitwise_xor_from_character, 3432918353);
        hash = hash << 13 | hash >>> 19;
    } return () => {
       // Return the hash that you can use as a seed
        hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
        hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
        return (hash ^= hash >>> 16) >>> 0;
    }
}

function SimpleFastCounter32(seed_1, seed_2, seed_3, seed_4) {
    return () => {
      seed_1 >>>= 0; seed_2 >>>= 0; seed_3 >>>= 0; seed_4 >>>= 0;
      let cast32 = (seed_1 + seed_2) | 0;
      seed_1 = seed_2 ^ seed_2 >>> 9;
      seed_2 = seed_3 + (seed_3 << 3) | 0;
      seed_3 = (seed_3 << 21 | seed_3 >>> 11);
      seed_4 = seed_4 + 1 | 0;
      cast32 = cast32 + seed_4 | 0;
      seed_3 = seed_3 + cast32 | 0;
      return (cast32 >>> 0) / 4294967296;
    }
}

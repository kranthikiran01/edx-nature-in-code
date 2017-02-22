var number_of_sequences = 100;
var sequence_length = 20;
var original_sequence = [];
var sequences = [];
var number_of_generations = 100;
var mutation_rate = 0.0001; // per base and generation

function generate_first_generation(){
	generate_first_sequence();
	for (var i = 0; i < number_of_sequences; i++) {
		sequences.push(original_sequence.slice());
	}
}

function generate_first_sequence(){
	for (var i = 0; i < sequence_length; i++) {
		original_sequence.push(getRandomBase(""));
	}
}

function getRandomBase(current_base){
	var new_base;
	var bases = ['A','G','C','T'];
	do{
		new_base = bases[Math.floor(Math.random()*4)];
	} while(current_base==new_base);
	
	return new_base;
}

function print_sequences(title){
	console.log(title);
	for (var i = 0; i < sequences.length; i++) {
		print_sequence(sequences[i]);
	}
	console.log("");
}
function print_sequence(sequence){
	var output_sequence = "";
	for (var i = 0; i < sequence.length; i++) {
		output_sequence+=sequence[i];
	}
	console.log(output_sequence);
}
//Change base pairs, introduce mutation into sequences
function run_generations(){
	for (var i = 0; i < number_of_generations; i++) {
		for (var j = 0; j < sequences.length; j++) {
			for (var k = 0; k < sequences[j].length; k++){
				if(Math.random() < mutation_rate)
					sequences[j][k] = getRandomBase(sequences[j][k]);
			}
		}
	}
}

generate_first_generation();
print_sequences("Generation 0");
run_generations();
print_sequences("After "+number_of_generations+" generations");

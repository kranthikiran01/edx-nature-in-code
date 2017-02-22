var refreshGenerations ;
function runSimulation(){
    var number_of_sequences = 100;
    var sequence_length = 20;
    var original_sequence = [];
    var sequences = [];
    var number_of_generations = 100;
var mutation_rate = 0.99; // per base and generation
var BASES = ['A','G','C','T'];
var BASES_IN_NUMERIC = [Math.random(),Math.random(),Math.random(),Math.random()];
function getBaseInNumeric(base){
    return BASES_IN_NUMERIC[BASES.indexOf(base)];
}
function cell_dim(total, cells) { return Math.floor(total/cells) }
var total_height = 300;
var total_width = 900;
  var rows = sequence_length; // total bases in one gene
  var cols = number_of_generations; //sequences.length(); // total number of sequences
  var row_height = cell_dim(total_height, rows);
  var col_width = cell_dim(total_width, cols)+2;
  var colLabel = [];
  for (var i = 0; i < cols; i++) {
    colLabel.push('t'+i);
}
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
drawWithD3('before');

run_generations();

print_sequences("After "+number_of_generations+" generations");
drawWithD3('after');

if(document.getElementById('playGenerations').checked===true){
    refreshGenerations = setInterval(function(){
        run_generations();
        drawWithD3('after');
    },1000);
}else{
 clearInterval(refreshGenerations);
 run_generations();
 drawWithD3('after');
}

function drawWithD3(id){
    var data = [];
    for (var i = 0; i < (rows*cols) ; i++) {
      for(var j = 0 ; j < sequences.length;j++){
          for (var k = 0; k < sequences[j].length; k++) {
              data[i] = getBaseInNumeric(sequences[j][k]);
              i++;
          }
      }
  }
  document.getElementById(id).innerHTML="";
  var color_chart = d3.select("#"+id)
  .append("svg")
  .attr("class", "chart")
  .attr("width", col_width * cols)
  .attr("height", row_height * rows);
  var color = d3.scaleLinear()
  .domain([d3.min(data), 1])
  .range(["#f6faaa", "#9E0142"]);
  color_chart.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d,i) { return Math.floor(i / rows) * col_width; })
  .attr("y", function(d,i) { return i % rows * row_height; })
  .attr("width", col_width)
  .attr("height", row_height)
  .attr("fill", color);
  if(id==="before"){
    document.getElementById('cols1').innerHTML="";
    drawColLabels('#cols1');
}else{
    document.getElementById('cols2').innerHTML="";
    drawColLabels('#cols2');
}          
}



function drawColLabels(id){
   d3.select(id).append("svg").attr("class","chart").attr("width",col_width*cols).attr("height",row_height*2)
   .selectAll(".colLabelg")
   .data(colLabel)
   .enter()
   .append("text")
   .text(function(d){ return d;})
   .attr("x",0)
   .attr("y", function (d, i) { return (i % cols) * col_width; })
   .style("text-anchor", "end")
   .attr("transform", "translate(" + col_width / 1.2 + ",0.5) rotate (-90)")
   .attr("class",  function (d,i) { return "colLabel mono c"+i;} );

}
}
window.onload = runSimulation;
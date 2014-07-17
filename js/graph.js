// Frucht graph
var nodes = [
    {"group":0},
    {"group":1},
    {"group":2},
    {"group":3},
    {"group":4},
    {"group":5},
    {"group":6},
    {"group":7},
    {"group":8},
    {"group":9},
    {"group":10},
    {"group":11}
]
var links = [
    {"source":0,"target":1,"value":1},
    {"source":0,"target":6,"value":1},
    {"source":0,"target":7,"value":1},
    {"source":1,"target":2,"value":1},
    {"source":1,"target":7,"value":1},
    {"source":2,"target":3,"value":1},
    {"source":2,"target":8,"value":1},
    {"source":3,"target":4,"value":1},
    {"source":3,"target":9,"value":1},
    {"source":4,"target":5,"value":1},
    {"source":4,"target":9,"value":1},
    {"source":5,"target":6,"value":1},
    {"source":5,"target":10,"value":1},
    {"source":6,"target":10,"value":1},
    {"source":7,"target":11,"value":1},
    {"source":8,"target":9,"value":1},
    {"source":8,"target":11,"value":1},
    {"source":10,"target":11,"value":1}
]
// Kite graph.
// var nodes = [
//     {"group":0},
//     {"group":1},
//     {"group":2},
//     {"group":3},
//     {"group":4},
//     {"group":5},
// ]

// var links = [
//     {"source":0,"target":1,"value":1},
//     {"source":0,"target":3,"value":1},
//     {"source":1,"target":2,"value":1},
//     {"source":2,"target":3,"value":1},
//     {"source":3,"target":4,"value":1},
//     {"source":4,"target":5,"value":1},

// ]
var width = 370,
    height = 100;


var color = d3.scale.category20();

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .charge(-50)
    .linkDistance(10)
    .on("tick", tick)
    .start();

var svg = d3.select("#header").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg");

var link = svg.selectAll(".link")
    .data(links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 6)
    .style("fill", function(d) { return color(d.group); })
    .call(force.drag);

node.append("title")
    .text(function(d) { return d.name; });

var dx = width/2.8;
var dy = height/9;

function tick() {
  link.attr("x1", function(d) { return d.source.x - dx; })
      .attr("y1", function(d) { return d.source.y + dy; })
      .attr("x2", function(d) { return d.target.x - dx; })
      .attr("y2", function(d) { return d.target.y + dy; });

  node.attr("cx", function(d) { return d.x - dx; })
      .attr("cy", function(d) { return d.y + dy; });
}
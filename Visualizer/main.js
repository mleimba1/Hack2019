var nodes = [
  { id: "mammal", group: 0, label: "Mammals", level: 1 },
  { id: "dog"   , group: 0, label: "Dogs"   , level: 2 },
  { id: "cat"   , group: 0, label: "Cats"   , level: 2 },
  { id: "fox"   , group: 0, label: "Foxes"  , level: 2 },
  { id: "elk"   , group: 0, label: "Elk"    , level: 2 },
  { id: "insect", group: 1, label: "Insects", level: 1 },
  { id: "ant"   , group: 1, label: "Ants"   , level: 2 },
  { id: "bee"   , group: 1, label: "Bees"   , level: 2 },
  { id: "fish"  , group: 2, label: "Fish"   , level: 1 },
  { id: "carp"  , group: 2, label: "Carp"   , level: 2 },
  { id: "pike"  , group: 2, label: "Pikes"  , level: 2 }
]
var links = [
  { target: "mammal", source: "dog" , strength: 0.7 },
  { target: "mammal", source: "cat" , strength: 0.7 },
  { target: "mammal", source: "fox" , strength: 0.7 },
  { target: "mammal", source: "elk" , strength: 0.7 },
  { target: "insect", source: "ant" , strength: 0.7 },
  { target: "insect", source: "bee" , strength: 0.7 },
  { target: "fish"  , source: "carp", strength: 0.7 },
  { target: "fish"  , source: "pike", strength: 0.7 },
  { target: "cat"   , source: "elk" , strength: 0.1 },
  { target: "carp"  , source: "ant" , strength: 0.1 },
  { target: "elk"   , source: "bee" , strength: 0.1 },
  { target: "dog"   , source: "cat" , strength: 0.1 },
  { target: "fox"   , source: "ant" , strength: 0.1 },
  { target: "pike"  , source: "cat" , strength: 0.1 }
]

function setText(node){

}

function getStrength(node){

}

function getNodeColor(node) {
  return node.level === 1 ? 'red' : 'gray'
}
var width = window.innerWidth
var height = window.innerHeight
var svg = d3.select('svg')

svg.attr('width', width).attr('height', height)
// simulation setup with all forces

var linkForce = d3
  .forceLink()
  .id(function (link) { return link.id })
  .strength(function (link) { return link.strength })

var simulation = d3
  .forceSimulation()
  .force('link', linkForce)
  .force('charge', d3.forceManyBody().strength(-120))
  .force('center', d3.forceCenter(width / 2, height / 2))

var linkElements = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter().append("line")
    .attr("stroke-width", 1)
    .attr("stroke", "rgba(50, 50, 50, 0.2)")

var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
    .attr("r", 10 )
    .attr("fill", getNodeColor)

var textElements = svg.append("g")
  .attr("class", "texts")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
    .text(function (node) { return  node.id })
    .attr("font-size", 15)
    .attr("dx", 15)
    .attr("dy", 4)


simulation.nodes(nodes).on('tick', () => {
  nodeElements
    .attr('cx', function (node) { return node.x })
    .attr('cy', function (node) { return node.y })
  textElements
    .attr('x', function (node) { return node.x })
    .attr('y', function (node) { return node.y })
  linkElements
    .attr('x1', function (link) { return link.source.x })
    .attr('y1', function (link) { return link.source.y })
    .attr('x2', function (link) { return link.target.x })
    .attr('y2', function (link) { return link.target.y })
})

simulation.force("link").links(links)
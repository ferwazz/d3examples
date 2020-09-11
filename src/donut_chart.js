const data = [{
    "name": "<5",
    "value": 19912018,
},
{
    "name": "5-9",
    "value": 20501982
},
{
    "name": "10-14",
    "value": 20679786
},
{
    "name": "15-19",
    "value": 21354481
},
{
    "name": "20-24",
    "value": 22604232
},
{
    "name": "25-29",
    "value": 21698010
},
{
    "name": "30-34",
    "value": 21183639
},
{
    "name": "35-39",
    "value": 19855782
},
{
    "name": "40-44",
    "value": 20796128
},
{
    "name": "45-49",
    "value": 21370368
},
{
    "name": "50-54",
    "value": 22525490
},
{
    "name": "55-59",
    "value": 21001947
},
{
    "name": "60-64",
    "value": 18415681
},
{
    "name": "65-69",
    "value": 14547446
},
{
    "name": "70-74",
    "value": 10587721
},
{
    "name": "75-79",
    "value": 7730129
},
{
    "name": "80-84",
    "value": 5811429
},
{
    "name": ">85",
    "value": 5938752
}
];

const rainbowColors = ['#8000ff',
'#622ffe',
'#445cfb',
'#2686f5',
'#08acee',
'#17cbe4',
'#34e4d9',
'#52f5cb',
'#70febc',
'#8efeac',
'#acf59a',
'#cbe486',
'#e8cb72',
'#ffac5c',
'#ff8646',
'#ff5c2f',
'#ff2f18',
'#ff0000'
]

const canvas = d3.select(".canva");

height = 500
width = 900

const svg = canvas.append("svg")
.attr("width", width * 1.2)
.attr("height", height * 1.2);

const margin = {
top: 20,
bottom: 70,
left: 70,
right: 70
};
const graphWidth = 1200 - margin.left - margin.right;
const graphHeight = 1200 - margin.top - margin.bottom;

var formatComma = d3.format(",");


const mainCanvas = svg.append("g")
.attr("width", graphWidth / 2)
.attr("height", graphHeight / 2)
.attr("transform", `translate(${margin.left + 380}, 
                        ${margin.top + 300})`);

// title text
mainCanvas.append("text")
.attr("class", "daca-text")
.attr("dy", "-7cm")
.style("opacity", 0)
.transition()
.duration(1500)
.style("opacity", (d, i) => 1)
.text("US Population per age in 2015")
.attr("text-anchor", "middle")
.attr("font-weight", "bold")
.style("font-family", "Oswald")
.attr("font-size", "35")

// text for the labels
mainCanvas.append("text")
.attr("class", "daca-text")
.attr("dy", "-6.5cm")
.attr("dx", "12.5cm")
.style("opacity", 1)
.text("Ages")
.attr("text-anchor", "middle")
.attr("font-weight", "bold")
.style("font-family", "Oswald")
.attr("font-size", "25")

var arcs = d3.pie().sort(null)(data.map(function(d, i) {
return d.value;
}));

const radius = height / 2;

const arcpath = d3.arc()
.innerRadius(radius * 0)
.outerRadius(radius - 10)

var innerArc = d3.arc()
.innerRadius(radius * 0.4)
.outerRadius(radius * 0.8)


const paths = mainCanvas.selectAll("path")
.data(arcs)


paths.enter()
.append("path")
.attr("class", "arc")
.attr("stroke", "white")
.attr("vector-effect", "non-scaling-stroke")
.style("stroke-width", "3px")
.style("opacity", 1)
.attr("fill", function(d, i) {
    return rainbowColors[i]
})
.attr("d", arcpath.cornerRadius(10))
.on("mouseover", function(d, i) {
    d3.select(this)
        .transition()
        .duration(100)
        .style("stroke-width", "10px")
        .attr("stroke", "white")
        .style("opacity", 0.6)

    var pos = innerArc.centroid(d);
    svg.append("text")
        .attr("id", "t" + i)
        .attr("x", 390 + pos[0] * (arcs[i].endAngle < Math.PI ? 2.5 : 1.6))
        .attr("y", 325 + pos[1] * 1.5)
        .text(formatComma(data[i].value))
        .style("font-size", "30px")
        .attr("font-family", "Oswald")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
})
.on("mouseout", function(d, i) {
    d3.select("#t" + i).remove()
    d3.select(this)
        .transition()
        .duration(500)
        .style("stroke-width", "3px")
        .attr("stroke", "white")
        .style("opacity", 1)
})

const labels = mainCanvas.selectAll("label")
.data(arcs)

const verticalgap_labels = 1
var label_size = 20
var gap_labels = 1.2

for (var i = 0; i < data.length; i++) {
console.log(i)
svg.append("rect")
    .attr("x", 900)
    .attr("y", 100 + i * label_size * gap_labels)
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", label_size)
    .attr("height", label_size)
    .style("fill", rainbowColors[i])
    .on("mouseover", function(d, i) {
        d3.select(arcs)
            .transition()
            .duration(100)
            .style("stroke-width", "10px")
            .attr("stroke", "white")
            .style("opacity", 0.6)
    })
svg.append("text")
    .attr("x", 930)
    .attr("y", 112 + i * label_size * gap_labels)
    .text(data[i].name)
    .style("font-size", "15px")
    .style("font-family", "Oswald")
    .attr("alignment-baseline", "middle")
    .attr("font-weight", "bold")

}
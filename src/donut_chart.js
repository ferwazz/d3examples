const data = [
    {"name": "<5","value": 19912018,"category":1},
    {"name": "5-9","value": 20501982,"category":1},
    {"name": "10-14","value": 20679786    },
    {"name": "15-19","value": 21354481    },
    {"name": "20-24","value": 22604232},
    {"name": "25-29","value": 21698010},
    {"name": "30-34","value": 21183639},
    {"name": "35-39","value": 19855782},
    {"name": "40-44","value": 20796128},
    {"name": "45-49","value": 21370368},
    {"name": "50-54","value": 22525490},
    {"name": "55-59","value": 21001947},
    {"name": "60-64","value": 18415681},
    {"name": "65-69","value": 14547446},
    {"name": "70-74","value": 10587721},
    {"name": "75-79","value": 7730129},
    {"name": "80-84","value": 5811429},
    {"name": "≥85","value": 5938752}];

const canvas  = d3.select(".canva");

height = 500
width = 1000

const svg = canvas.append("svg")
                .attr("width", width*1.2)
                .attr("height", height*1.2);

const margin = {top: 20, bottom: 70, left: 70, right: 70};
const graphWidth = 1200 - margin.left - margin.right;
const graphHeight = 1200 - margin.top - margin.bottom;

var formatComma = d3.format(",");

    
const mainCanvas = svg.append("g")
                        .attr("width", graphWidth / 2)
                        .attr("height", graphHeight / 2)
                        .attr("transform", `translate(${margin.left + 480}, 
                            ${margin.top + 300})`);

                            
mainCanvas.append("text")
          .attr("class", "daca-text")
          .attr("dy", "0.2cm")
          .transition()
                .duration(1000)
                .style("opacity", (d,i) => 0.7-i)
          .text("US Population per age")
          .attr("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("font-size", "25")


let n = 17
colorbyValue = {}
 
 for (let i = 0; i < n; ++i) {
   colorbyValue[data[i].name] = d3.rgb(d3.interpolateSpectral(i / (n - 1))).hex();
 }

 color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.88 + 0.1), data.length))




var arcs = d3.pie()(data.map(function(d) { return d.value; }));

const radius = height / 2;

const arcpath = d3.arc()
                .innerRadius(radius * 0.6)
                .outerRadius(radius - 10)

var outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 1.25)


const paths =  mainCanvas.selectAll("path")
                         .data(arcs)


paths.enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "white")
    .attr("vector-effect", "non-scaling-stroke")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    //.attr("fill", function(d, i){return colorbyValue[data[i].name]})
    .attr("fill", function(d,i) {return color(data[i].name)})
    .attr("d", arcpath)
 
const labels = mainCanvas.selectAll("label")
                            .data(arcs)

const verticalGap = 1

labels.enter()
            .append('text')
            .style("opacity", 1)
            .text( function(d,i) { console.log(data[i].name) ; return data[i].name })
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d)
                return 'translate(' + pos + ')';
            })
            .attr("font-weight", "bold")
            .attr("font-size", "15")
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")


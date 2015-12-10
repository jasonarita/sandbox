// D3 Selections

var chart_area = d3.select("#chart_area");
// append svg-element to chart_area obj
var frame  = chart_area.append("svg"); 

var canvas = frame.append("g"); //

var margin        = {top:19.5, right:19.5, bottom:19.5, left:39.5};
var frame_width   = 960;
var frame_height  = 350;
var canvas_width  = frame_width - margin.left - margin.right;
var canvas_height = frame_height - margin.top - margin.bottom;

// SVG's ATTR function: sets attributes
// frame.attr("width") // returns what the current width is
frame.attr("width", frame_width);
frame.attr("height", frame_height);

// SVG - ATTR - Transform attribute
// translate expects a string
canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Challenge Question: Create a Circle SVG element
/* var circle_obj = frame.append("circle");

circle_obj.attr("cx", 105)
  .attr("cy", 239)
  .attr("r", 39)
  .attr("fill", "green")
  .attr("stroke-width", 2)
  .attr("stroke", "white");
*/

// Scale
var xScale = d3.scale.log();
xScale.domain([250, 1e5]).range([0, canvas_width])

// Create an axis
var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
// Draw to screen
canvas.append("g")
  .attr("class", "x_axis")
  .attr("transform", "translate(0, " + canvas_height + ")")
	.call(xAxis); // draw to screen


// Challenge Problem: Create a Y-axis
// scale
// 10 - 85
// orient left
var yScale = d3.scale.linear();
yScale.domain([0, 85]).range([canvas_height, 0]);

var yAxis = d3.svg.axis().orient("left").scale(yScale);
canvas.append("g")
  .attr("class", "y_axis")
	.call(yAxis); // draw to screen



var accessor = function(row){
  return {
    country:    row.country,
    year:      +row.year,
    pop:       +row.pop,
    continent:  row.continent,
    lifeExp:   +row.lifeExp,
    gdpPercap: +row.gdpPercap
  };
}

d3.csv("http://emilydolson.github.io/D3-visualising-data/resources/nations.csv", 
       accessor,
       function(nations) {
  
  				// Create a canvas to draw all the data circles
  				var data_canvas = canvas.append("g")
           .attr("class", "data_canvas");
  				var year = parseInt(document.getElementById("year_slider").value);
  				var filtered_nations = nations.filter(function(d){return d.year == year});
          
          
          // Create new filter africa
          var filtered_africa = nations.filter(function(d){return d.continent == "Africa"});
          
          // Create new scale
          var popScale = d3.scale.sqrt();
  				popScale.domain([0, 5e8]).range([0, 40]);
  
  				// Bind data to circles via the DATA-function
				  var circles = data_canvas.selectAll("circle")
          	.data(filtered_africa, function(d){return d.country})
          	.enter()
          	.append("circle")
          	.attr("cx", function(d){return xScale(d.gdpPercap)})
          	.attr("cy", function(d){return yScale(d.lifeExp)})
          	.attr("r",  function(d){return popScale(d.pop)})
          	.attr("class", "prettycircle");
  
  				d3.select("#year_slider").on("input", function(){
            year = parseInt(this.value);
            filtered_nations = nations.filter(function(d){
              return d.year == year;
            });
            update();
          })
          	
       }
				  // bind data to circles
      
      );


// ON function: listen to some event and call some function


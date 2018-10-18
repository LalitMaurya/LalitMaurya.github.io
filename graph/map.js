var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 800 - margin.left - margin.right,
	height = 715 - margin.top - margin.bottom,
	formatPercent = d3.format(".1");

var svg = d3.select("#map").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.csv, "population.csv")
	.defer(d3.json, "india.json")
	.await(ready);

var legendText = ["NaN", "2", "4", "6", "8", "10", "12", "14"];
var legendColors = ["#333333", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];


function ready(error, data, india) {

	var counties = topojson.feature(india, india.objects.counties);

	data.forEach(function(d,i) {
		d.year = +d.year;
		d.fips = d.fips;
		d.rate = +d.rate;
	});

	 dataByCountyByYear = d3.nest()
		.key(function(d) { return d.fips; })
		.key(function(d) { return d.year; })
		.map(data);

		
	counties.features.forEach(function(county) {
		county.properties.years = dataByCountyByYear[county.properties.id];
	});

	var color = d3.scale.threshold()
		.domain([2, 4, 6, 8, 10, 12, 14])
		.range(["#333333", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

  var projection = d3.geo.albers()
  .rotate([-135, 0])
  .center([-50, -201])
  .parallels([198, 160.2])
  .scale(1350)
  .translate([width / 2, height / 2]);

  var path = d3.geo.path().projection(projection);

	var countyShapes = svg.selectAll(".county")
		.data(counties.features)
		.enter()
		.append("path")
			.attr("class", "county")
			.attr("d", path);

	countyShapes
		.on("mouseover", function(d,i) {
			tooltip.transition()
			.duration(1)
			.style("opacity", 1);
			tooltip.html(
			"<p><strong>" + d.properties.years[1961][0].county + ", " + d.properties.years[1961][0].state + "</strong></p>" +
			"<table><tbody><tr><td class='wide'>Population in 1961 (in percent):</td><td>" + formatPercent((d.properties.years[1961][0].rate)) + "</td></tr>" +
			"<tr><td>Population in 2011 (in percent):</td><td>" +"<strong>"+ formatPercent((d.properties.years[2011][0].rate)) + "</td></tr>" +
			"<tr><td><strong>Change:</strong></td><td>" + formatPercent((d.properties.years[2011][0].rate - d.properties.years[1961][0].rate)) + "</td></tr></tbody></table>"
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d,i) {
			tooltip.transition()
			.duration(1)
			.style("opacity", 0);
		});

	svg.append("path")
		.datum(topojson.feature(india, india.objects.counties, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("d", path);

	var legend = svg.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(8))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width - 415)
		.attr("y", 65)
		.attr("width", 30)
		.attr("height", 16)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors[i]; });

	legenditem.append("text")
		.attr("x", width - 405)
		.attr("y", 54)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText[i]; });

 function update(year){
     slider.property("value", year);
     d3.select(".year").text(year);
     countyShapes.style("fill", function(d, i) {
         return color(d.properties.years[year][0].rate)
     });
 }

	var slider = d3.select(".slider")
		.append("input")
			.attr("type", "range")
			.attr("min", 1961)
			.attr("max", 2011)
			.attr("step", 10)
			.attr("axis",true)
			
			.on("input", function() {
				var year = this.value;
				update(year);
			});

update(1961);

}

d3.select(self.frameElement).style("height", "800px");
/****/
//module 2-1 lesson 1,2
//execute script when window is loaded
window.onload = function(){
    /****prepare the canvas****/
    var w = 900, h = 500;
    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //always assign a class (as the block name) for sytling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!
    //console.log(container)
    
    //innerRect block
    var innerRect = container.append("rect") //put a new rect in the svg
        .datum(400)
        .attr("width", function(d){
            return d * 2; 
        }) //rectangle width
        .attr("height", function(d){
            return d;
        }) //rectangle height
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
    
    console.log(innerRect);
    
    /****prepare the data****/
    //var dataArray = [10, 20, 30, 40, 50];
    var cityPop = [
        {
            city: 'Raleigh',
            population: 403892
        },
        { 
            city: 'Charlotte',
            population: 731424
        },
        {
            city: 'Durham',
            population: 228330
        },
        {
            city: 'Chapel Hill',
            population: 57233
        }
    ];
    
    /**** scales ****/
    //create the scale above circles block
    var x = d3.scaleLinear() //the operand of x is a generator
        .range([90, 750]) //output min and max
        .domain([0, 3]);
    
    //find the min value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });
    //find the max value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    //scale for cirlces center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([0, 800000]);
    
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);
    
    /**** scales ****/
    //create y axis generator
    var yAxis = d3.axisLeft()
        .scale(y);
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50,0)")
        .call(yAxis);
    
    /**** text ****/
    //create a text element and add the title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Population");
    //create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
//        .attr("x", function(d, i){
//            //horizontal position to the right of each circle
//            return x(i) + Math.sqrt(d.population * 0.005 / Math.PI) + 5;
//        })
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population);
        })
//        .text(function(d){
//            return d.city + ", Pop. " + d.population;
//        });
    
    //fist line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d, i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.005 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });
    //second line of label
    var format = d3.format(",");
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d, i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.005 / Math.PI) + 5;
        })
        .attr("dy", "15")
        .text(function(d){
            return "Pop. " + format(d.population);
        });

    var circle = container.selectAll(".circles") //empty selection, .circles is a placeholder
        //.data(dataArray) //feed the data array
        .data(cityPop)
        .enter() //loop into each element of the data array
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles
        /*.attr("r", function(d, i){
            console.log("d", d, "i", i); // d is the data element, i is the index
            return d;
        })
        .attr("cx", function(d, i){
            return 70 + (i * 180);
        })
        .attr("cy", function(d){
            return 450 - (d * 5);
        });*/
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.005;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            //substract value from 450 to "grow" circles up from the bottom instead of down from the top of the svg
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a file based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
        

};


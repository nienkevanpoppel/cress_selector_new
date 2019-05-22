// onload function, so Lato loads before the program starts
onload = main;

var container;

function onWindowResize(event) {
    uniforms.iResolution.value.x = window.innerWidth;
    uniforms.iResolution.value.y = window.innerHeight;

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function PolygonResize(polygonWidth, polygonHeight) {
    renderer.setSize(polygonWidth, polygonHeight);
    animate();
}

function render() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    var currentTime = Date.now();
    uniforms.iGlobalTime.value = (currentTime - startTime) * 0.01;
    renderer.render(scene, camera2);

}


function setup() {
}

function main() {

    var cresses = [
        {
            naam: 'aclla',
            zoet: 0,
            umami: 10,
            zuur: 70,
            bitter: 40,
            zout: 0,
            match: 2,
            img: 'assets/atsina.png'
        },

        {
            naam: 'adji',
            zoet: 0,
            umami: 40,
            zuur: 80,
            bitter: 5,
            zout: 0,
            match: 10,
            img: 'assets/adji.png'
        },

        {
            naam: 'affilla',
            zoet: 60,
            umami: 0,
            zuur: 40,
            bitter: 0,
            zout: 0,
            match: 30,
            img: 'assets/affilla.png'
        },
        {
            naam: 'atsina',
            zoet: 80,
            umami: 40,
            zuur: 0,
            bitter: 5,
            zout: 0,
            match: 1,
            img: 'assets/atsina.png'
        },
        {
            naam: 'babyClover',
            zoet: 40,
            umami: 10,
            zuur: 70,
            bitter: 0,
            zout: 0,
            match: 15,
            img: 'assets/babyClover.png'
        },

        {
            naam: 'basil',
            zoet: 0,
            umami: 0,
            zuur: 30,
            bitter: 10,
            zout: 80,
            match: 90,
            img: 'assets/basil.png'
        },

        {
            naam: 'blinq',
            zoet: 0,
            umami: 0,
            zuur: 30,
            bitter: 30,
            zout: 70,
            match: 21,
            img: 'assets/blinq.png'
        },

        {
            naam: 'borage',
            zoet: 20,
            umami: 40,
            zuur: 20,
            bitter: 50,
            zout: 0,
            match: 43,
            img: 'assets/borage.png'
        },

        {
            naam: 'brocco',
            zoet: 0,
            umami: 0,
            zuur: 20,
            bitter: 20,
            zout: 70,
            match: 30,
            img: 'assets/brocco.png'
        },
    ]
   
    // Define taste object and statistics
    var taste = {};

    taste.zoet = 31;
    taste.umami = 45;
    taste.zuur = 33;
    taste.bitter = 69;
    taste.zout = 42;
    // Array that takes information from the taste object to get the order
    // in which stats are displayed onscreen. Change the order in which
    // the taste stats are defined to change order.
    var statOrder = [];

    for (var i in taste) statOrder.push(i);
    // Define colors. I used simple three-digit hex colors, in this case.
    var statColors = {};
    statColors.zoet = "#EB9486";
    statColors.umami = "#7E7F9A";
    statColors.zuur = "#6FD08C";
    statColors.bitter = "#CAE7B9";
    statColors.zout = "#F3DE8A";

    // Define pentagon (or other polygon) size and coordinates.
    var polygonX = innerWidth / 2;
    var polygonY = innerHeight / 3;
    var polygonSize = 200;
    // Define size of circles.
    var circleSize = 56;
    var circles = [];
    var circleIndexes = [];
    for (var i in statColors) circleIndexes.push({
        defaultColor: statColors[i],
        color: statColors[i],
        over: false
    });

    var innerPolygonColor = {
    color: statColors.zoet,
    gradient: null,
    x: 0,
    y: 0
    }

    var innerPolygonKnobs = [];
    for (var i in statColors) innerPolygonKnobs.push({
        over: false,
        dragging: false,
        color: statColors[i]
    });

    // Function for adding elements to screen. Code is reusable.
    function appendElement(type, properties, parent) {
        if (parent === undefined) parent = document.body;
        var element = document.createElement(type);
        for (var i in properties) {
            element.setAttribute(i, properties[i]);
        }
        parent.appendChild(element);
        return element;
    }
    var cressSelector = document.getElementsByClassName('cressSelector')[0];
    var cressOverview = document.getElementsByClassName('cressOverview__matches')[0];
    // var canvasWrapper = document.getElementsByClassName('canvasWrapper')[0];
    // console.log(canvasWrapper.style)
    // Place canvas object centered in the screen.
    var canvas = appendElement("canvas", {
        width: innerWidth,
        height: innerHeight*0.75,
        class: "pentagonCanvas",
    });
    // Get canvas context.
    
    var ctx = canvas.getContext("2d");
    var slider = [
        'zoet',
        'umami',
        'zuur',
        'bitter',
        'zout'
    ]
    var colorArray = Object.values(statColors);
  
    for (var i = 0; i < slider.length; i++) {
        slider[i] = createSlider(0, 100, 5);
        slider[i].style('width', '200px');
        slider[i].addClass('slider');
        slider[i].index = i;

        //changeColor function 
        slider[i].mouseReleased(function () {
            //this.index gives the corresponding color of the slider to the function
            dragKnob(true, colorArray[this.index]);
        });
    }

    slider[0].addClass('slider--zoet');
    slider[1].addClass('slider--umami');
    slider[2].addClass('slider--zuur');
    slider[3].addClass('slider--bitter');
    slider[4].addClass('slider--zout');


    //html structure

    
    var sliderContainer = createDiv().addClass('sliderWrapper');
    var wrapperName = createDiv('cress selector').addClass('sliderWrapper__name');
    var sliderName1 = createDiv('zoet').addClass('slider__name');
    var sliderName2 = createDiv('umami').addClass('slider__name');
    var sliderName3 = createDiv('zuur').addClass('slider__name');
    var sliderName4 = createDiv('bitter').addClass('slider__name');
    var sliderName5 = createDiv('zout').addClass('slider__name');

    var sliderSort1 = createDiv().addClass('slider__sort');
    var sliderSort2 = createDiv().addClass('slider__sort');
    var sliderSort3 = createDiv().addClass('slider__sort');
    var sliderSort4 = createDiv().addClass('slider__sort');
    var sliderSort5 = createDiv().addClass('slider__sort');

    sliderContainer.parent(cressSelector);
    cressSelector.appendChild(canvas);

    wrapperName.parent(sliderContainer);
    sliderSort1.child(sliderName1);
    sliderSort1.child(slider[0]);
    sliderSort1.parent(sliderContainer);

    sliderSort2.child(sliderName2);
    sliderSort2.child(slider[1]);
    sliderSort2.parent(sliderContainer);

    sliderSort3.child(sliderName3);
    sliderSort3.child(slider[2]);
    sliderSort3.parent(sliderContainer);

    sliderSort4.child(sliderName4);
    sliderSort4.child(slider[3]);
    sliderSort4.parent(sliderContainer);

    sliderSort5.child(sliderName5);
    sliderSort5.child(slider[4]);
    sliderSort5.parent(sliderContainer);
    
    var cressArray = [];

    function fillCressArray(){ 
        cressOverview.innerHTML = '';
        cresses.sort(function (a, b) {
            return b.match - a.match;
          });

        cressArray = Object.keys(cresses);

        for (var i = 0; i < cressArray.length; i++) {  
            var cressElement = appendElement("div", {
                class: `cressElement ${cresses[cressArray[i]].naam}` ,
            },cressOverview);
    
            var img = appendElement("img", {
                class: `cressElement__img`,
                src: cresses[cressArray[i]].img
            },cressElement);
    
            var cressTitle = createDiv(`${cresses[cressArray[i]].naam}`).addClass('cressElement__title');
            cressTitle.parent(cressElement);
    
            var cressPercentage = createDiv(`${cresses[cressArray[i]].match}%`).addClass('cressElement__percentage');
            cressPercentage.parent(cressElement);
        }
    }
    fillCressArray();
      
    // String.prototype.toRGB = function () {
    //     var obj;
    //     var triplet = this.slice(1, this.length);
    //     var colors = [];
    //     var index = 0;
    //     for (var i = 0; i < triplet.length; i += 2) {
    //         colors[index] = parseInt("0x" + triplet[i] + triplet[i + 1]);
    //         index++;
    //     }
    //     obj = {
    //         string: "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")",
    //         red: colors[0],
    //         green: colors[1],
    //         blue: colors[2],
    //     };
    //     return obj;
    // }

    //moving of inner polygon
    function MouseHandler() {
        var handler = this;
        this.x = 0;
        this.y = 0;
        this.down = false;
        this.clicked = false;
        this.move = function (e) {
            handler.x = e.clientX - canvas.getBoundingClientRect().left;
            handler.y = e.clientY - canvas.getBoundingClientRect().top;
        }
        this.click = function (e) {
            handler.down = true;
            handler.clicked = true;
        }
        this.release = function (e) {
            handler.down = false;
        }
        this.over = function (element) {
            var rect = element.getBoundingClientRect();
            return this.x < rect.right && this.x > rect.left && this.y < rect.bottom && this.y > rect.top;
        }
        document.onmousemove = this.move;
        document.onmousedown = this.click;
        document.onmouseup = this.release;
    }
    var vertices = [];

    function drawRegularPolygon(x, y, fill, stroke, strokeWidth, sides, radius) {
        // Draws a regular polygon onto the canvas.
        // Note that a circle can be made by setting sides to radius/2.

        // Variable declarations
        var arc;
        var x;
        var y;
        var point;
        var points = [];


        // Begin drawing with parameters
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        // Add round line joints
        ctx.lineJoin = 'round';
        // Using sides+1 because the sides should be linked properly.
        for (var i = 0; i <= sides + 1; i++) {
            // Create arc variable
            arc = i * 2 * Math.PI / sides;
            // Add coordinates to array for reuse
            point = {};
            point.x = x + radius * Math.sin(arc);
            point.y = y - radius * Math.cos(arc);
            if (i === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
            // Prevent point duplication
            if (i < sides + 1) points.push(point);
        }
        // Draw polygon
        ctx.fill();
        ctx.stroke();
        // Close path, just in case
        ctx.closePath();
        // Return points array for future use
        return points;
    }
   
    var circles = [];

    function redraw() {
        circles = [];
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        slider[0].value(taste.zoet);
        slider[1].value(taste.umami);
        slider[2].value(taste.zuur);
        slider[3].value(taste.bitter);
        slider[4].value(taste.zout);


        var polygon = drawRegularPolygon(polygonX, polygonY, "rgba(38, 12, 12, 0.1)", "white", 2, statOrder.length, polygonSize);
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.lineDashOffset = 10;
        ctx.strokeStyle = "white";
        for (var i = 0; i < polygon.length; i++) {
            ctx.moveTo(polygonX, polygonY);
            ctx.lineTo(polygon[i].x, polygon[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([0]);
        
      
        // Remove line dash for future use
 

        // Inner polygon
        var scaleBack;
        var canCen = {
            x: canvas.width/2,
            y: canvas.height/2
          };
        ctx.beginPath();
        var index;
        var stat;
        var text;
        var innerPolygonVertices = [];
        var distX;
        var distY;
        var distTotal;
        var x;
        var y;

        for (var i = 0; i < 1 + 1; i++)  {
            drawInnerPolygon();
        }

        function drawInnerPolygon(){ 
            for (var i = 0; i < statOrder.length + 1; i++) {
                index = i % statOrder.length;
                if (vertices[index] === undefined) vertices[index] = {};
                if (innerPolygonVertices[index] === undefined) innerPolygonVertices[index] = {};
                vertices[index].x = polygon[index].x;
                vertices[index].y = polygon[index].y;
                stat = taste[statOrder[index]];
                vertices[index].distX = distX = vertices[index].x - polygonX;
                vertices[index].distY = distY = vertices[index].y - polygonY;
                vertices[index].distTotal = Math.sqrt(distX * distX + distY * distY);
                vertices[index].radians = Math.atan2(distY, distX);
                x = polygonX + Math.cos(vertices[index].radians) * (vertices[index].distTotal * stat / 100);
                y = polygonY + Math.sin(vertices[index].radians) * (vertices[index].distTotal * stat / 100);
                innerPolygonVertices[index].x = x;
                innerPolygonVertices[index].y = y;
                ctx.lineTo(x, y);
            }
        
            ctx.stroke();
    
            // Set alpha of polygon
            ctx.globalAlpha = 0.75;
           
            if (innerPolygonColor.gradient !== null) {
                ctx.fillStyle = innerPolygonColor.gradient;
            }
            else {    
              
                ctx.fillStyle =  innerPolygonColor.color;
            }
           
            ctx.fill();
    
            ctx.globalAlpha = 1;
            if (innerPolygonColor.gradient !== null) {
                ctx.strokeStyle = innerPolygonColor.gradient;
            }
            else {
                ctx.strokeStyle = innerPolygonColor.color;
            }
            
            ctx.stroke();
    
        }
       
        //circles around handles
        for (var i = 0; i < innerPolygonVertices.length; i++) {
            x = innerPolygonVertices[i].x;
            y = innerPolygonVertices[i].y;

            innerPolygonKnobs[i].x = x;
            innerPolygonKnobs[i].y = y;
            if (innerPolygonKnobs[i].over || innerPolygonKnobs[i].dragging) {
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
                ctx.strokeStyle = statColors[statOrder[i]];
                ctx.stroke();
                ctx.closePath();
            }
        }

        // Draw circles;
        for (var i = 0; i < statOrder.length; i++) {
            index = i;
            x = vertices[index].x + Math.cos(vertices[index].radians) * (circleSize + 8);
            y = vertices[index].y + Math.sin(vertices[index].radians) * (circleSize + 8);
            ctx.beginPath();
            ctx.arc(x, y, circleSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            // ctx.arc(x, y, circleSize - 4, 0, 2 * Math.PI, false);
            // ctx.fillStyle = "#fff";
            if (circleIndexes[index].over) ctx.fillStyle = statColors[statOrder[index]];
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(x, y, circleSize - 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = statColors[statOrder[index]];
            if (circleIndexes[index].over) ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
            circles.push({
                x: x,
                y: y,
                size: circleSize - 6,
                radius: (circleSize - 6) / 2,
                stat: statOrder[index],
                color: statColors[statOrder[index]]
            });
            ctx.fillStyle = "#fff";
            if (circleIndexes[index].over) ctx.fillStyle = statColors[statOrder[index]];
            ctx.font = "16px Montserrat";
            text = statOrder[index].toUpperCase();
            stat = taste[statOrder[index]] + "%";
            ctx.fillText(text, x - ctx.measureText(text).width / 2, y);
            ctx.fillText(stat, x - ctx.measureText(stat).width / 2, y + 16);
        }
    }
    redraw();

    function getClosestPointOnLine(line, x, y) {
        lerp = function (a, b, x) {
            return (a + x * (b - a));
        };
        var dx = line.x1 - line.x0;
        var dy = line.y1 - line.y0;
        var t = ((x - line.x0) * dx + (y - line.y0) * dy) / (dx * dx + dy * dy);
        t = Math.min(1, Math.max(0, t));
        var lineX = lerp(line.x0, line.x1, t);
        var lineY = lerp(line.y0, line.y1, t);
        return ({
            x: lineX,
            y: lineY
        });
    };

    function pythagorean(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }
    var fps = 60;
    var circle;
    var mouse = new MouseHandler();
    var oldColor;
    var newColor;
    var newX2, newY2;
    var transitioning = false;
    var grd;
    var transitionIndex = 0;
    var transitionSteps = 10;
    var red, green, blue, redDiff, greenDiff, blueDiff, redSpeed, greenSpeed, blueSpeed;
    var change;


    function calculatePercentages() { 
        for (var i = 0; i < cressArray.length; i++) {  
            cresses[cressArray[i]].match = Math.floor(Math.random() * 101);  
            
        }
          cressArray = [];
          fillCressArray();  
    }

    function changeColor(selectedColor,newX,newY) {
        oldColor = innerPolygonColor.color;
        oldX = innerPolygonColor.x;
        oldY = innerPolygonColor.y;
        //define new color
        newColor = selectedColor;
        transitioning = true;
        transitionIndex = 0;
 
        newX2= newX;
        newY2 = newY;
       
        grd = ctx.createLinearGradient(oldX, oldY, newX, newY);
        grd.addColorStop(0, `${oldColor}`);
        grd.addColorStop(1,  `${newColor}`);
      
    }

    function dragKnob(movedSlider, knobColor) {
       
        for (var i = 0; i < innerPolygonKnobs.length; i++) {
            var knob = innerPolygonKnobs[i];

            var previousPercentage = taste[statOrder[i]];
            distX = knob.x - mouse.x;
            distY = knob.y - mouse.y;
            distTotal = pythagorean(distX, distY);
            if (distTotal < 8) {
                if (!knob.over) change = true;
                knob.over = true;
            } else {
                if (knob.over) change = true;
                knob.over = false;
            }


            if (!mouse.down) knob.dragging = false;
            if (mouse.down && knob.over || knob.dragging || movedSlider) {
                for (var j = 0; j < innerPolygonKnobs.length; j++) innerPolygonKnobs[j].dragging = false;
                knob.dragging = true;

                var line = {
                    x0: polygonX,
                    y0: polygonY,
                    x1: vertices[i].x,
                    y1: vertices[i].y
                };

                var point = getClosestPointOnLine(line, mouse.x, mouse.y);
                var distStart = pythagorean(point.x - polygonX, point.y - polygonY);
                var distStartEnd = pythagorean(vertices[i].x - polygonX, vertices[i].y - polygonY);


                var percent = distStart / distStartEnd;
                taste[statOrder[i]] = Math.round(percent * 100);
              
                if (previousPercentage < taste[statOrder[i]]) {
                    if (innerPolygonKnobs[i].dragging) {
                        if (innerPolygonKnobs[i].color !== innerPolygonColor.color) { 
                            calculatePercentages();
                            if (knobColor) {
                                changeColor(knobColor,innerPolygonKnobs[i].x,innerPolygonKnobs[i].y );
                            } else {
                                changeColor(knob.color,innerPolygonKnobs[i].x,innerPolygonKnobs[i].y);
                            }
                            change = true;
                        }
                    }
                }     
            }
        }
    }

    function loop() {
        change = false;
        taste.zoet = slider[0].value();
        taste.umami = slider[1].value();
        taste.zuur = slider[2].value();
        taste.bitter = slider[3].value();
        taste.zout = slider[4].value();

        redraw();

        // create new polygon shape by pulling on innerPolygonKnobs
        dragKnob();
        if (transitioning) {
                innerPolygonColor.gradient = grd;
                innerPolygonColor.color = newColor;
     
                innerPolygonColor.x = newX2;
                innerPolygonColor.y = newY2;
      
            change = true;
        }
        if (change) redraw();
        setTimeout(loop, 1000 / fps);
    }
    setTimeout(loop, 1000 / fps);


}

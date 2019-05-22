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



function setup() {
}

function main() {
   var cresses=cresses2;
    // var cresses = [
    //     {
    //         naam: 'aclla',
    //         zoet: 0,
    //         umami: 10,
    //         zuur: 70,
    //         bitter: 40,
    //         zout: 0,
    //         match: 2,
    //         img: 'assets/svg/aclla.svg'
    //     },

    //     {
    //         naam: 'adji',
    //         zoet: 0,
    //         umami: 40,
    //         zuur: 80,
    //         bitter: 5,
    //         zout: 0,
    //         match: 10,
    //         img: 'assets/svg/adji.svg'
    //     },

    //     {
    //         naam: 'affilla',
    //         zoet: 60,
    //         umami: 0,
    //         zuur: 40,
    //         bitter: 0,
    //         zout: 0,
    //         match: 30,
    //         img: 'assets/svg/affilla.svg'
    //     },
    //     {
    //         naam: 'atsina',
    //         zoet: 80,
    //         umami: 40,
    //         zuur: 0,
    //         bitter: 5,
    //         zout: 0,
    //         match: 1,
    //         img: 'assets/svg/atsina.svg'
    //     },
    //     {
    //         naam: 'babyClover',
    //         zoet: 40,
    //         umami: 10,
    //         zuur: 70,
    //         bitter: 0,
    //         zout: 0,
    //         match: 15,
    //         img: 'assets/svg/babyClover.svg'
    //     },

    //     {
    //         naam: 'basil',
    //         zoet: 0,
    //         umami: 0,
    //         zuur: 30,
    //         bitter: 10,
    //         zout: 80,
    //         match: 90,
    //         img: 'assets/svg/basil.svg'
    //     },

    //     {
    //         naam: 'blinq',
    //         zoet: 0,
    //         umami: 0,
    //         zuur: 30,
    //         bitter: 30,
    //         zout: 70,
    //         match: 21,
    //         img: 'assets/svg/blinq.svg'
    //     },

    //     {
    //         naam: 'borage',
    //         zoet: 20,
    //         umami: 40,
    //         zuur: 20,
    //         bitter: 50,
    //         zout: 0,
    //         match: 43,
    //         img: 'assets/svg/borage.svg'
    //     },

    //     {
    //         naam: 'brocco',
    //         zoet: 0,
    //         umami: 0,
    //         zuur: 20,
    //         bitter: 20,
    //         zout: 70,
    //         match: 30,
    //         img: 'assets/svg/brocco.svg'
    //     },
    // ]
   
    // Define taste object and statistics
    var taste = {};

    taste.zoet =40;
    taste.zout = 70;
    taste.zuur = 20;
    taste.bitter = 60;
   
    taste.umami =50;
    // Array that takes information from the taste object to get the order
    // in which stats are displayed onscreen. Change the order in which
    // the taste stats are defined to change order.
    var statOrder = [];

    for (var i in taste) statOrder.push(i);
    // Define colors. I used simple three-digit hex colors, in this case.
    var statColors = {};
    statColors.zoet = "#ff0080";
    statColors.zout = "#00cfff"; 
    statColors.zuur = "#47ef1a";
    statColors.bitter = "#fff600";
    statColors.umami = "#ff5b00";

    
    // Define pentagon (or other polygon) size and coordinates.
    var polygonX = 300;
    var polygonY = 325;
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
    var actualSelector = document.getElementsByClassName('actualSelector')[0];
 
    // Place canvas object centered in the screen.
    var canvas = appendElement("canvas", {
        width: 600,
        height: 750,
        class: "pentagonCanvas",
    });

   
   
    // Get canvas context.
    var ctx = canvas.getContext("2d");
    cressSelector.appendChild(canvas);
    actualSelector.appendChild(canvas)
    function fillCressArray(){ 
        cressOverview.innerHTML = '';
        cresses.sort(function (a, b) {
            return b.match - a.match;
          });

        for (var i = 0; i < cresses.length; i++) {  
           
            var cressElement = appendElement("div", {
                class: `cressElement ${cresses[i].naam}` ,
            },cressOverview);
    
            var cressImg = appendElement("img", {
                class: `cressElement__img`,
                src: `assets/svg/adji.svg`
            },cressElement);
    
            var cressTitle = createDiv(`${cresses[i].naam.toUpperCase()}`).addClass('cressElement__title');
            cressTitle.parent(cressElement);
           
            var ingredients= [];
            const keys = Object.keys(cresses[i])
            
            //loop through object/array for ingredients
            for (const key of keys) {
                if (cresses[i][key] !=0 && key != 'naam'&& key != 'match'){
                    ingredients.push(key);
                }
            }
            var ingredientList = ingredients.join(' | ');
           
            var cressIngredients = createDiv(`${ingredientList}`).addClass('cressElement__ingredients');
            cressIngredients.parent(cressElement);

             
            var cressButton = appendElement("div", {
                class: `cressElement__btn` ,
            },cressElement);
            var a = document.createElement('a');
            var linkText = document.createTextNode('meer info');
            var urlName = cresses[i].naam.split(' ').join('_').toLowerCase();

            a.appendChild(linkText);
            a.title = "meer info";
            a.href= `https://benelux.koppertcress.com/sites/default/files/${urlName}_nl_0.pdf`;
            cressButton.appendChild(a)

            var cressArrow = appendElement("img", {
                src: `assets/cressArrow.png` ,
            },cressButton);
            
           
            console.log(cressElement, cressButton)
           
        }

        var page = 1;
          $(".cressElement").slice(0, 6).addClass('page1');
          $(".cressElement").slice(6, 12).addClass('page2').hide();
          $(".cressElement").slice(12,18).addClass('page3').hide();
          $(".cressElement").slice(18,24).addClass('page4').hide();
          $(".cressElement").slice(24,30).addClass('page5').hide();
          $(".cressElement").slice(30,36).addClass('page6').hide();
          var maxPage = 6;
          var pageIndicator = document.getElementsByClassName('cressOverview__pageIndicator')[0];
          pageIndicator.innerHTML = page + ' / ' + maxPage;
      
          //logic to navigate through results
          $('.cressOverview__next').on('click', function() {
            if (page < maxPage) {    
              $(".cressOverview__matches > div:visible").hide();
              $('.page' + ++page).show();
              pageIndicator.innerHTML = page + ' / ' + maxPage;
            }
          })
          $('.cressOverview__prev').on('click', function() {
            if (page > 1) {
              $(".cressOverview__matches > div:visible").hide();
              $('.page' + --page).show();
              pageIndicator.innerHTML = page + ' / ' + maxPage;
            }
          })
    }

    
    fillCressArray();
      
    String.prototype.toTransparent = function () {
        var obj;
        var triplet = this.slice(1, this.length);
        var colors = [];
        var index = 0;
        for (var i = 0; i < triplet.length; i += 2) {
            colors[index] = parseInt("0x" + triplet[i] + triplet[i + 1]);
            index++;
        }
        obj = {
            string: "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ", 0)",
            red: colors[0],
            green: colors[1],
            blue: colors[2],
            alpha: 0
        };
        return obj.string;
    }


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
    var innerPolygonVertices = [];
    var polygon;

    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles = [];
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "transparent";
        ctx.fill();

        // slider[0].value(taste.zoet);
        // slider[1].value(taste.umami);
        // slider[2].value(taste.zuur);
        // slider[3].value(taste.bitter);
        // slider[4].value(taste.zout);

        polygon = drawRegularPolygon(polygonX, polygonY, "rgba(230, 230, 230, 0.6)", "white", 2, statOrder.length, polygonSize);
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.lineDashOffset = 10;
        for (var i = 0; i < polygon.length; i++) {
            ctx.moveTo(polygonX, polygonY);
            ctx.lineTo(polygon[i].x, polygon[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([0]);

        // Inner polygon
        ctx.beginPath();
        var index;
        var stat;
        var text;
        var x;
        var y;
        
        
        for (var i = 0; i < 5; i++)  {

            if (taste[statOrder[i]]> 15 )
                drawInnerPolygon(i);    
           
            
        }

        // Draw circles;
        for (var i = 0; i < statOrder.length; i++) {
            index = i;
            x = vertices[index].x + Math.cos(vertices[index].radians) * (circleSize + 8);
            y = vertices[index].y + Math.sin(vertices[index].radians) * (circleSize + 8);
            ctx.beginPath();
            ctx.arc(x, y, circleSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'transparent';
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(x, y, circleSize - 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = "transparent";
            if (circleIndexes[index].over) ctx.fillStyle = statColors[statOrder[index]];
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(x, y, circleSize - 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = "transparent";
            if (circleIndexes[index].over) ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
            circles.push({
                x: x,
                y: y,
                size: circleSize - 6,
                radius: (circleSize - 6) / 2,
                stat: statOrder[index],
                color: 'yellow'
            });
            // ctx.fillStyle = statColors[statOrder[index]];
            ctx.fillStyle = 'black';
            if (circleIndexes[index].over) ctx.fillStyle = 'transparent';
            ctx.font = "2em Arkipelago";
            text = statOrder[index];
            stat = taste[statOrder[index]] + "%";
            ctx.fillText(text, x - ctx.measureText(text).width / 2, y);
            ctx.fillText(stat, x - ctx.measureText(stat).width / 2, y + 36);
        }


        drawHandles();
    }


    function drawInnerPolygon(verticeNr){ 
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

        // calculate middle of polygon

            newX = innerPolygonVertices[verticeNr].x;
            newY = innerPolygonVertices[verticeNr].y;
            //define new color
            verticeColor = innerPolygonKnobs[verticeNr].color;
            transparent = verticeColor.toTransparent();

            grd = ctx.createLinearGradient(polygonX, polygonY, newX, newY);
            grd.addColorStop(0, `${transparent}`); 
            grd.addColorStop(1, `${verticeColor}`);

            ctx.fillStyle = grd;  
             ctx.fill();

            //  if (verticeNr == 2) {
            // console.log(vertices[0].y, vertices[3].y);
            
            // }
    }
   
    function drawHandles() {
        //circles around handles
        for (var i = 0; i < innerPolygonVertices.length; i++) {
            x = innerPolygonVertices[i].x;
            y = innerPolygonVertices[i].y;

            innerPolygonKnobs[i].x = x;
            innerPolygonKnobs[i].y = y;
            // if (innerPolygonKnobs[i].over || innerPolygonKnobs[i].dragging) {
                ctx.beginPath();
                ctx.arc(x, y, 12, 0, 2 * Math.PI, false);
                // ctx.strokeStyle = statColors[statOrder[i]];
                ctx.strokeStyle = '#747471';
                ctx.stroke();
                ctx.closePath();
            // }
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
    var mouse = new MouseHandler(); 
    var newColor;
    var newX2, newY2;
    var transitioning = false;
    var grd;
 
    function calculatePercentages() { 
        for (var i = 0; i < cresses.length; i++) {  
            cresses[i].match = Math.floor(Math.random() * 101);  
            
        }
          fillCressArray();  
    }

    var released = false;
    function dragKnob() {
       
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


            if (!mouse.down) {
                if (knob.dragging) {
                    released = true;

                    // 
                    calculatePercentages();
                    released = false;
                }

                knob.dragging = false;
            }
            
            if (mouse.down && knob.over || knob.dragging ) {
                for (var j = 0; j < innerPolygonKnobs.length; j++) innerPolygonKnobs[j].dragging = false;
                knob.dragging = true;
                released = false;
                console.log(' dragging'); 

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
            }
        }
    }

    function loop() {
        change = false;
        // taste.zoet = slider[0].value();
        // taste.umami = slider[1].value();
        // taste.zuur = slider[2].value();
        // taste.bitter = slider[3].value();
        // taste.zout = slider[4].value();

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
        redraw();
        setTimeout(loop, 1000 / fps);
    }
    setTimeout(loop, 1000 / fps);


}

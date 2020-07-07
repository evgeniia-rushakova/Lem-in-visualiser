const container = document.querySelector('.lemin-container');
const startButton = document.querySelector('#start-button');
const roomSize = 40;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
container.style.width = screenWidth;
container.style.height = screenHeight ;
const widthOfGhost = Math.floor(roomSize/1.5);
function drawRooms(info) {
    let roomContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    roomContainer.setAttribute('width', screenWidth);
    roomContainer.setAttribute('height', screenHeight);
    roomContainer.setAttribute("version", "1.1");
    roomContainer.style.position = "absolute";
    roomContainer.id = 'rooms';
    roomContainer.style.zIndex = '10';
    for (var i = 0; i< info['rooms'].length;i++) {
        let curr = info['rooms'][i];
        let room =document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        room.id = curr['name'];
        room.classList.add('room');
        room.setAttributeNS(null, 'x', curr['x'] * roomSize + 'px');
        room.setAttributeNS(null, 'y', curr['y'] * roomSize + 'px');
        room.setAttributeNS(null, 'ry',  '10px');
        room.setAttributeNS(null, 'rx', '10px');
        room.setAttributeNS(null, 'width', roomSize +'px');
        room.setAttributeNS(null, 'height', roomSize +'px');
        room.setAttributeNS(null, 'fill', '#b6155b');
        let name = curr['type'] !== null ? curr['type'] : curr['name'];
        //let name = curr['name'];
        var txt =document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.innerHTML = name;
        txt.setAttributeNS(null, 'fill', '#fff');
        txt.setAttributeNS(null, 'font-family', 'Arial');
        txt.setAttributeNS(null, 'x', (curr['x'] * roomSize +10) + 'px');
        txt.setAttributeNS(null, 'y', (curr['y'] * roomSize +20) + 'px');
        txt.setAttributeNS(null, 'font-size', '15px');
        roomContainer.appendChild(room);
       roomContainer.appendChild(txt);
        container.appendChild(roomContainer);
    }
}

function drawConnections(info) {
    let lineContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lineContainer.setAttribute('width', screenWidth);
    lineContainer.setAttribute('height', screenHeight);
    lineContainer.setAttribute("version", "1.1");
    lineContainer.style.position = "absolute";
    lineContainer.style.zIndex = '5';
    for (var i = 0; i< info['rooms'].length;i++)
    {
        let curr = info['rooms'][i];
        let currInDoc = document.getElementById(curr['name']);
        curr['connections'].forEach(function (conn) {
            let line =document.createElementNS('http://www.w3.org/2000/svg', 'line');
            let stroke = "#"+((1<<24)*Math.random()|0).toString(16);
            let x1 = parseInt(currInDoc.getAttribute( 'x')) + roomSize/2 + 'px';
            let y1 = parseInt(currInDoc.getAttribute( 'y')) + roomSize/2 + 'px';
            let x2 = parseInt(document.getElementById(conn).getAttribute( 'x'))  + roomSize/2 + 'px';
            let y2 = parseInt(document.getElementById(conn).getAttribute( 'y')) + roomSize/2 + 'px';
            line.setAttributeNS(null,'x1', x1);
            line.setAttributeNS(null,'x2', x2);
            line.setAttributeNS(null,'y1', y1);
            line.setAttributeNS(null,'y2', y2);
            line.setAttributeNS(null,'stroke', stroke);
            line.id = 'path ' + curr['name'] + '-' + conn;
            line.style.zIndex = '5';
            lineContainer.id = "paths";
            lineContainer.appendChild(line);
        })

    }
    container.appendChild(lineContainer);
}

function createGhost(number, info) {
    let ghost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let startRoom = info.rooms.filter(function (room) {
        return room['type'] === 'start';
    })[0];

    let x = Math.floor(startRoom['x'] * roomSize - widthOfGhost/2 +roomSize/2) + 'px';
    let y = Math.floor(startRoom['y'] * roomSize - widthOfGhost/2 + roomSize/2) + 'px';

    ghost.setAttribute('id', 'L' + number);
    ghost.classList.add('L' + number);
    ghost.setAttribute('version', '1.1');
    ghost.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    ghost.setAttribute('viewBox',"0, 0,400,400");

    ghost.setAttribute('width', widthOfGhost);
    ghost.setAttribute('height', widthOfGhost);


    ghost.style.position ='absolute';
    ghost.style.top = y;
    ghost.style.left = x;

    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', 'svgg' + number);

    let path1 = document.createElementNS('http://www.w3.org/2000/svg', "path");
    let path2 = document.createElementNS('http://www.w3.org/2000/svg', "path");
    let path3 = document.createElementNS('http://www.w3.org/2000/svg', "path");

    path1.setAttribute('id', 'path0');
    path2.setAttribute('id', 'path1');
    path3.setAttribute('id', 'path2');

    path1.setAttribute('d',"M156.250 37.500 L 156.250 50.000 131.250 50.000 L 106.250 50.000 106.250 62.500 L 106.250 75.000 93.750 75.000 L 81.250 75.000 81.250 87.500 L 81.250 100.000 68.750 100.000 L 56.250 100.000 56.250 137.500 L 56.250 175.000 43.750 175.000 L 31.250 175.000 31.250 268.750 L 31.250 362.500 43.750 362.500 L 56.250 362.500 56.250 350.000 L 56.250 337.500 68.750 337.500 L 81.250 337.500 81.250 325.000 L 81.250 312.500 93.750 312.500 L 106.250 312.500 106.250 325.000 L 106.250 337.500 118.750 337.500 L 131.250 337.500 131.250 350.000 L 131.250 362.500 156.250 362.500 L 181.250 362.500 181.250 337.500 L 181.250 312.500 206.250 312.500 L 231.250 312.500 231.250 337.500 L 231.250 362.500 250.000 362.500 L 268.750 362.500 268.750 350.000 L 268.750 337.500 281.250 337.500 L 293.750 337.500 293.750 325.000 L 293.750 312.500 306.250 312.500 L 318.750 312.500 318.750 325.000 L 318.750 337.500 331.250 337.500 L 343.750 337.500 343.750 350.000 L 343.750 362.500 356.250 362.500 L 368.750 362.500 368.750 268.750 L 368.750 175.000 356.250 175.000 L 343.750 175.000 343.750 187.500 L 343.750 200.000 331.250 200.000 L 318.750 200.000 318.750 212.500 L 318.750 225.000 293.750 225.000 L 268.750 225.000 268.750 212.500 L 268.750 200.000 256.250 200.000 L 243.750 200.000 243.750 162.500 L 243.750 125.000 256.250 125.000 L 268.750 125.000 268.750 112.500 L 268.750 100.000 293.750 100.000 L 318.750 100.000 318.750 112.500 L 318.750 125.000 331.250 125.000 L 343.750 125.000 343.750 112.500 L 343.750 100.000 331.250 100.000 L 318.750 100.000 318.750 87.500 L 318.750 75.000 306.250 75.000 L 293.750 75.000 293.750 62.500 L 293.750 50.000 275.000 50.000 L 256.250 50.000 256.250 37.500 L 256.250 25.000 206.250 25.000 L 156.250 25.000 156.250 37.500 M181.250 112.500 L 181.250 125.000 193.750 125.000 L 206.250 125.000 206.250 162.500 L 206.250 200.000 193.750 200.000 L 181.250 200.000 181.250 212.500 L 181.250 225.000 156.250 225.000 L 131.250 225.000 131.250 212.500 L 131.250 200.000 118.750 200.000 L 106.250 200.000 106.250 162.500 L 106.250 125.000 118.750 125.000 L 131.250 125.000 131.250 112.500 L 131.250 100.000 156.250 100.000 L 181.250 100.000 181.250 112.500");
    path2.setAttribute('d',"M131.250 112.500 L 131.250 125.000 118.750 125.000 L 106.250 125.000 106.250 162.500 L 106.250 200.000 118.750 200.000 L 131.250 200.000 131.250 212.500 L 131.250 225.000 156.250 225.000 L 181.250 225.000 181.250 212.500 L 181.250 200.000 168.750 200.000 L 156.250 200.000 156.250 175.000 L 156.250 150.000 181.250 150.000 L 206.250 150.000 206.250 137.500 L 206.250 125.000 193.750 125.000 L 181.250 125.000 181.250 112.500 L 181.250 100.000 156.250 100.000 L 131.250 100.000 131.250 112.500 M268.750 112.500 L 268.750 125.000 256.250 125.000 L 243.750 125.000 243.750 162.500 L 243.750 200.000 256.250 200.000 L 268.750 200.000 268.750 212.500 L 268.750 225.000 293.750 225.000 L 318.750 225.000 318.750 212.500 L 318.750 200.000 306.250 200.000 L 293.750 200.000 293.750 175.000 L 293.750 150.000 318.750 150.000 L 343.750 150.000 343.750 137.500 L 343.750 125.000 331.250 125.000 L 318.750 125.000 318.750 112.500 L 318.750 100.000 293.750 100.000 L 268.750 100.000 268.750 112.500 M6.896 390.820 C 7.608 392.909,7.955 393.015,8.482 391.309 C 8.869 390.057,8.941 390.098,9.521 391.895 C 9.883 393.017,10.393 392.678,10.903 390.978 C 11.368 389.424,11.194 388.207,10.719 389.690 C 9.992 391.955,9.896 392.028,9.613 390.522 C 9.265 388.667,8.787 388.668,8.160 390.527 L 7.666 391.992 7.310 390.527 C 7.114 389.722,6.806 389.063,6.626 389.063 C 6.445 389.063,6.567 389.854,6.896 390.820 M11.940 389.941 C 12.880 392.958,13.419 393.348,13.830 391.309 C 14.101 389.963,14.825 390.407,14.838 391.927 C 14.848 393.189,15.787 392.378,16.278 390.684 C 16.539 389.782,16.600 389.138,16.414 389.253 C 16.228 389.368,15.948 390.031,15.793 390.727 L 15.510 391.992 15.044 390.625 C 14.484 388.980,13.992 389.010,13.505 390.721 L 13.143 391.992 12.753 390.527 C 12.538 389.722,12.206 389.063,12.014 389.063 C 11.823 389.063,11.789 389.458,11.940 389.941 M26.636 389.478 C 26.730 389.760,27.037 390.067,27.319 390.161 C 27.612 390.259,27.759 390.112,27.661 389.819 C 27.567 389.537,27.260 389.230,26.978 389.136 C 26.685 389.038,26.538 389.185,26.636 389.478 M117.220 389.203 C 117.680 389.600,119.573 389.837,119.346 389.469 C 119.208 389.245,118.636 389.063,118.076 389.063 C 117.516 389.063,117.131 389.126,117.220 389.203 M120.964 389.323 C 120.445 389.841,120.718 390.318,121.270 389.859 C 121.594 389.591,122.202 389.504,122.686 389.658 C 123.260 389.840,123.449 389.787,123.268 389.495 C 122.977 389.023,121.382 388.904,120.964 389.323 M124.468 389.648 C 124.344 389.971,124.414 390.234,124.622 390.234 C 124.830 390.234,125.000 390.038,125.000 389.798 C 125.000 389.544,125.407 389.440,125.977 389.549 C 126.514 389.651,126.953 389.584,126.953 389.399 C 126.953 388.807,124.704 389.033,124.468 389.648 M138.281 389.544 C 138.281 389.717,138.765 389.743,139.355 389.601 C 140.899 389.231,140.977 389.023,139.530 389.134 C 138.843 389.186,138.281 389.370,138.281 389.544");
    path3.setAttribute('d',"M156.250 175.000 L 156.250 200.000 181.250 200.000 L 206.250 200.000 206.250 175.000 L 206.250 150.000 181.250 150.000 L 156.250 150.000 156.250 175.000 M293.750 175.000 L 293.750 200.000 318.750 200.000 L 343.750 200.000 343.750 175.000 L 343.750 150.000 318.750 150.000 L 293.750 150.000 293.750 175.000");

    path1.setAttribute('stroke', "none");
    path2.setAttribute('stroke', "none");
    path3.setAttribute('stroke', "none");

    path1.setAttribute('fill', "#"+((1<<24)*Math.random()|0).toString(16));
    path2.setAttribute('fill', "#fcfcfc");
    path3.setAttribute('fill', "#"+((1<<24)*Math.random()|0).toString(16));

    path1.setAttribute('fill-rule',  "evenodd");
    path2.setAttribute('fill-rule',  "evenodd");
    path3.setAttribute('fill-rule',  "evenodd");

    g.appendChild(path1);
    g.appendChild(path2);
    g.appendChild(path3);
    ghost.appendChild(g);
    return ghost;
}

function putAntsInStartRoom(info) {
    let antsContainer = document.createElement('div');
    antsContainer.style.width = screenWidth;
    antsContainer.style.height = screenHeight;
    antsContainer.style.position = "absolute";
    antsContainer.id = 'ants';
    antsContainer.style.zIndex = '15';


   info['ants'].forEach(function (ant, index) {

           let ghost = createGhost(index + 1, info);
           antsContainer.appendChild(ghost);
           container.appendChild(antsContainer);


    })
}

function animateAnts(info) {

    info['ants'].forEach(function (antt, index) {
        let ant = document.getElementById('L' + info['ants'][index]['number']);

        let path = info['ants'][index]['path'];
        let x1 = ant.style.left;
        let y1 =ant.style.top;
        let x2;
        let y2;

        var animation = anime.timeline({
            targets: ant,
            easing: 'easeInOutSine',
            duration: 500,
            complete: function(anim){
                console.log('comleteall');
            }
        })
        for(var i = 0; i< path.length; i++)
        {
            if(path[i])
            {
                let room = path[i];
                let r = document.getElementById(room);
                x2 = parseInt(r.getAttribute('x') )- widthOfGhost/2 +roomSize/2;
                y2 = parseInt(r.getAttribute('y')) - widthOfGhost/2 +roomSize/2;
                let deltaX = parseInt(x2) - parseInt(x1);
                let deltaY = parseInt(y2) - parseInt(y1);
                console.log(path[i], x1,x2,y1,y2);
                animation.add({
                    translateX:deltaX,
                    translateY:deltaY,
                })
                console.log(x1, y1);
            }
            else
            {
                animation.add({
                    delay:500
                })
            }

        }
    })


}

function draw(info) {
    console.log(info);
    drawRooms(info);
    drawConnections(info);
    putAntsInStartRoom(info);

    startButton.addEventListener('click',function () {
        animateAnts(info);
    });
}
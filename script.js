var clock = [];

function updateClock(hour, minute, second){
    clock = [];

    var h = +0;
    if(hour < 10){
        h = "0" + hour;
    }
    else{
        h = "" + hour;
    }

    var m = +0;
    if(minute < 10){
        m = "0" + minute;
    }
    else{
        m = "" + minute;
    }

    var s = +0;
    if(second < 10){
        s = "0" + second;
    }
    else{
        s = "" + second;
    }

    clock.push(getPositions(h[0]));
    clock.push(getPositions(h[1]));

    clock.push(getPositions(m[0]));
    clock.push(getPositions(m[1]));

    clock.push(getPositions(s[0]));
    clock.push(getPositions(s[1]));

    makeTable(hour, minute, second);
}

function getPositions(number){
    var positions = {one: +0, two: +0, four: +0, eight: +0};

    if(number >= 8){
        number -= 8;
        positions.eight = +1;
    }
    if(number >= 4){
        number -= 4;
        positions.four = +1;
    }
    if(number >= 2){
        number -= 2;
        positions.two = +1;
    }
    if(number >= 1){
        number -= 1;
        positions.one = +1;
    }

    return positions;
}

function getDot(dots, row_id, col_id){
    var dot = +0;
    var go = true;
    for(var i = 0; i < dots.length && go; i++){
        for(var j = 0; j < dots[i].length && go; j++){
            if(i === row_id && j === col_id){
                dot = dots[i][j];
                go = false;
            }
        }
    }

    return dot;
}

function makeTable(hour, minute, second){
    $("#bcd_clock").html("");

    var dots = [];
    var tmp_row = [];
    for(var i = 0; i < 6; i++){
        tmp_row.push(clock[i].eight);
    }
    dots.push(tmp_row);

    tmp_row = [];
    for(var i = 0; i < 6; i++){
        tmp_row.push(clock[i].four);
    }
    dots.push(tmp_row);

    tmp_row = [];
    for(var i = 0; i < 6; i++){
        tmp_row.push(clock[i].two);
    }
    dots.push(tmp_row);

    tmp_row = [];
    for(var i = 0; i < 6; i++){
        tmp_row.push(clock[i].one);
    }
    dots.push(tmp_row);

    var row_id = +0;
    for(var i = 0; i < 4; i++){
        var sor = '<tr id=' + row_id + '>';
        var col_id = +0;
        for(var j = 0; j < 6; j++){
            if(getDot(dots,row_id,col_id) === +1){
                sor += '<td id=' + row_id + col_id + ' class="dot_on"></td>';
            }
            else{
                sor += '<td id=' + row_id + col_id + ' class="dot_off"></td>';
            }
            col_id++;
        }
        sor += '</tr>';
        row_id++;
        $("#bcd_clock").append(sor);
    }

    var h = +0;
    if(hour < 10){
        h = "0" + hour;
    }
    else{
        h = "" + hour;
    }

    var m = +0;
    if(minute < 10){
        m = "0" + minute;
    }
    else{
        m = "" + minute;
    }

    var s = +0;
    if(second < 10){
        s = "0" + second;
    }
    else{
        s = "" + second;
    }

    var sor = '<tr>';
    sor += '<td class="last_row">' + h[0] + '</td> <td class="last_row">' + h[1] + '</td>';
    sor += '<td class="last_row">' + m[0] + '</td> <td class="last_row">' + m[1] + '</td>';
    sor += '<td class="last_row">' + s[0] + '</td> <td class="last_row">' + s[1] + '</td>';
    sor += '</tr>';
    $("#bcd_clock").append(sor);
}

function update(){
    var date = new Date();

    updateClock(date.getHours(), date.getMinutes(), date.getSeconds());

    setTimeout(update, 1000);
}

update();

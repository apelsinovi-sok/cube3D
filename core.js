let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");

const focus_value = 250;//фокусное растояние 

const size_cube = 1.7;//множитель размера куба 

let point = [  //матрица с координатами  точек куба
//    X    Y    Z
    [-60, 60, -60],//перед
    [-60,-60, -60],
    [ 60, 60, -60],
    [ 60,-60, -60],

    [-60, 60,  60],//зад
    [-60,-60,  60],
    [ 60, 60,  60],
    [ 60,-60,  60],
];

let point_clone = [];//пустой массив для записи новых координат с учетом искажения перспективы 

const line = [ //матрица содержащая инструкцию как и в каком порядке соединять ребра куба 

    [0,1], //одно ребро равно одной ячейки массива. содержимое это ячейки равно двум точкам которые нужно соединить
    [2,3], //например эта линия состоит из координат точки point[2] и точки point[3]
    [0,2],
    [1,3],

    [4,5],
    [6,7],
    [4,6],
    [5,7],

    [0,4],
    [1,5],
    [2,6],
    [3,7]

];


ctx.translate(300,300);// сдвиг системы координат

                    //углы поворота по осям
function rotate(angleX = 0.3 , angleY = 0, angleZ = 0.1 ){

    const rotationX = [

        [(1),                             (0),                                   (0)],  //матрицы поворота 

        [(0),  Math.cos(angleX* Math.PI / 180), Math.sin(angleX* Math.PI / 180)*(-1)],

        [(0),  Math.sin(angleX* Math.PI / 180), Math.cos(angleX* Math.PI / 180)     ]

    ];

    const rotationY = [
        
        [  Math.cos(angleY* Math.PI / 180), (0), Math.sin(angleY* Math.PI / 180)*(-1)],

        [(0),                              (1),                                   (0)],

        [ Math.sin(angleY* Math.PI / 180), (0), Math.cos(angleY* Math.PI / 180)      ]

    ];

    const rotationZ = [

        [ Math.cos(angleZ* Math.PI / 180),      Math.sin(angleZ* Math.PI / 180), (0)],

        [ Math.sin(angleZ* Math.PI / 180)*(-1), Math.cos(angleZ* Math.PI / 180), (0)],

        [(0),                             (0),                                   (1)]

    ];



multiplay(rotationX);//поворот

multiplay(rotationY);//поворот

multiplay(rotationZ);//поворот

focus();//перспектива

clear();//отчистка экрана 

draw();//отрисовка куба

}


setInterval(rotate, 10);//обновление анимации

function focus(){//создание новой матрицы с учетом искажения перспективы 

    point.forEach((element, index ) => {

    let val = multiplay_focus(element);

    point_clone[index] = [];
    point_clone[index].push(val[0]);
    point_clone[index].push(val[1]);
    point_clone[index].push(val[2]);

    });




}

function multiplay_focus(point){//расчет перспективы

    let distance = point[2];//координата Z

    let tanget_x = point[0] / (focus_value + distance);//тангенс Х

    let tanget_y = point[1] / (focus_value + distance);//тангенс У

    let new_x = focus_value * tanget_x;//искаженная Х

    let new_y = focus_value * tanget_y;//искаженная У
    
    let arr = [];

    arr[0] = new_x;
    arr[1] = new_y;
    arr[2] = point[2];

    return arr;
}


function multiplay(axis){//умножение точек куба на матрицу поворота 

    point.forEach((element, index) => {

    let val = math.multiply(axis, element);

    point[index][0] = val[0];
    point[index][1] = val[1];
    point[index][2] = val[2];

    });


}


function draw(){//отрисовка 

    for (var i = 0; i < line.length; i++) {
      ctx.moveTo(point_clone[line[i][0]][0]*size_cube, point_clone[line[i][0]][1]*size_cube);
      ctx.lineTo(point_clone[line[i][1]][0]*size_cube, point_clone[line[i][1]][1]*size_cube);
  }
    ctx.stroke(); 
}

function clear(){//отчистка экрана 
  ctx.beginPath();
  ctx.clearRect(-300, -300, 600, 600);
}
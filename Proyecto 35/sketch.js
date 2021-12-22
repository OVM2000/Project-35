var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
//faklta variable hheight
var height;



function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotairballoon",balloonImage1);
  balloon.scale=0.5;

  //llamar height
  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);

  textSize(20); 
}



function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotairballoon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotairballoon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("hotairballoon",balloonImage2);
    balloon.scale=balloon.scale - 0.01
    //escribe el código para mover el globo aerostático en dirección ascendente
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotairballoon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function updateHeight(x,y){
  database.ref("balloon/height").set({
    "x": height.x + x,
    "y": height.y + y
  })
  }
  
  function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }

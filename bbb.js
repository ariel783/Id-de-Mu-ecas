// Configurar cámara
Webcam.set({
    width: 300,
    height: 200,
    image_format: "jpeg",
    jpeg_quality: 90
});

// Activar cámara
Webcam.attach("#Divlet");

// Tomar foto
function U(){
    Webcam.snap(function(id_i){
        document.getElementById("fold").innerHTML =
        "<img id='img_tomada' src='" + id_i + "'>";
    });
}

// Variable global del clasificador
let GC;

// Cuando el modelo esté listo
function modeloListo(){
    console.log("Modelo cargado correctamente");
}

// Cargar modelo de Teachable Machine
GC = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/7CTsRzafm/model.json",
    modeloListo
);

// Clasificar imagen
function b(){
    let li = document.getElementById("img_tomada");

    if(!li){
        console.log("Primero toma una foto");
        return;
    }

    if(!GC){
        console.log("El modelo aún no está listo");
        return;
    }

    GC.classify(li, function(error, results){
        if(error){
            console.error(error);
            return;
        }

        let II = results[0].label;
        document.getElementById("idi").innerHTML = II;
    });
}
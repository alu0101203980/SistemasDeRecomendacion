// Obtenemos el fichero
var fichero = document.getElementById('fichero')
//Creamos la variable matriz principal para almacenar la matriz leida por fichero
var matrizPrincipal = []

//Se lee el fichero y se va almacenando en la variable creada
fichero.addEventListener('change', function(e) {
  matrizPrincipal = []
  let reader = new FileReader();
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")
//Metemos los valores de la matriz en la matriz
    filas.forEach((fila) => {
      matrizPrincipal.push(fila.split(" "));
    })
  }
  reader.readAsText(fichero.files[0]);
}, false)

// Calculamos las medias y se almacenan en un vector
function calculo_medias(matriz, i) {
  //Creamos el vector de las medias
  let medias = []
  //Recorremos la matriz
  for (let i = 0; i < matriz.length; i++) {
    let contador = 0;
    let sumatorio = 0;
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] !== "-") {
        sumatorio = sumatorio + parseInt(matriz[i][j]);
        contador++;
      }
    }
    medias.push(sumatorio/contador);
  }
  return medias;
}

//Calculamos la predicción Simple
function simple(matriz, item, num_vecinos, similitudes) {
  if (num_vecinos < 3) {
    alert("ERROR: Debe elegir al menos 3 vecinos");
    throw new Error();
  } else { 
      let numerador = 0;
      let denominador = 0;    
      // Calculamos la formula
      for (let k = 0; k < num_vecinos; k++) {
          numerador = numerador + (similitudes[k][1]*parseInt(matriz[similitudes[k][0]][item]))
          denominador = denominador + Math.abs(similitudes[k][1])
      }
      let resultado = numerador/denominador;
      return resultado;
  }
}

//Calculamos la prediccion diferencia con la media"
function dif_media(matriz, medias, u, item, num_vecinos,  similitudes) {
  let numerador = 0;
  let denominador = 0;
  // Calculamos la formula
  for (let k = 0; k < num_vecinos; k++) {
    numerador = numerador + (similitudes[k][1] * (parseInt(matriz[similitudes[k][0]][item]) - medias[similitudes[k][0]]))
    denominador = denominador + Math.abs(similitudes[k][1])
  }
  let resultado = medias[u] + numerador/denominador
  return resultado;
}


//Calculo de Pearson entre dos vecinos
function correlacion_pearson(matriz, medias, vecino1, vecino2) {
  let vec_aux = []
  //Desarrollamos la formula de Pearson obteniendo las calificaciones de los items de la misma columna
  for (let i = 0; i < matriz[vecino1].length; i++) {
    if (matriz[vecino1][i] !== "-" && matriz[vecino2][i] !== "-") {
      //Metemos los valores en un vector auxiliar para usarlo posteriormente
      vec_aux.push(i)
    }
  }
//Reiniciamos las variables para que no afecten a las diferentes llamadas
  let numerador = 0
  let den1 = 0
  let den2 = 0
  // Calculamos la formula utilizando el vector creado anteriormente
  for (let i = 0; i < vec_aux.length; i++) {
    //Vamos incrementando el numerador para obtener el sumatorio
    numerador += ((parseInt(matriz[vecino1][vec_aux[i]])-medias[vecino1])*(parseInt(matriz[vecino2][vec_aux[i]])-medias[vecino2]))
    //Calculamos el sumatorio de las diferentes partes del denominador
    den1 += Math.pow(parseInt(matriz[vecino1][vec_aux[i]])-medias[vecino1],2)
    den2 += Math.pow(parseInt(matriz[vecino2][vec_aux[i]])-medias[vecino2],2)
  }
  //Calculamos la raiz cuadrada de cada una de las partes del denominador
  den1 = Math.sqrt(den1)
  den2 = Math.sqrt(den2)
  //Calculamos el denominador total
  let denominador = den1*den2
  //Si el resultado es una indeterminacion como puede producirse mostramos la siguiente alerta
  if (numerador === 0 && denominador === 0) {
    alert ("NaN = Indeterminacion => (0/0)")
  }
  //Obtenemos el resultado final
  let resultado = parseFloat((numerador/denominador).toFixed(2))
  return resultado
}


//Calculamos la distancia Coseno entre dos vecinos
function coseno(matriz, vecino1, vecino2) {
  let vec_aux = []
  //Desarrollamos la formula de Coseno obteniendo las calificaciones de los items de la misma columna
  for (let i = 0; i < matriz[vecino1].length; i++) {
    if (matriz[vecino1][i] != "-" && matriz[vecino2][i] != "-") {
      vec_aux.push(i)
    }
  }
//Reiniciamos las variables para que no afecten a las diferentes llamadas
  let numerador = 0
  let den1 = 0
  let den2 = 0
  // Calculamos la formula utilizando el vector creado anteriormente
  for (let i = 0; i < vec_aux.length; i++) {
    //Vamos incrementando el numerador para obtener el sumatorio
    numerador = numerador+(parseInt(matriz[vecino1][vec_aux[i]])*parseInt(matriz[vecino2][vec_aux[i]]))
    //Calculamos el sumatorio de las diferentes partes del denominador
    den1 = den1+Math.pow(parseInt(matriz[vecino1][vec_aux[i]]), 2)
    den2 = den2+Math.pow(parseInt(matriz[vecino2][vec_aux[i]]), 2)
  }
  //Calculamos la raiz cuadrada de cada una de las partes del denominador
  den1 = Math.sqrt(den1)
  den2 = Math.sqrt(den2)
  //Calculamos el denominador total
  let denominador = den1*den2
  //Si el resultado es una indeterminacion como puede producirse mostramos la siguiente alerta
  if (numerador === 0 && denominador === 0) {
    alert ("NaN = Indeterminacion => (0/0)")
  }
  //Obtenemos el resultado final
  let resultado = parseFloat((numerador/denominador).toFixed(2))
  return resultado
}


// //Calculamos la distancia Euclidea entre dos vecinos
function euclidea(matriz, vecino1, vecino2) {
  let vec_aux = []
  //Desarrollamos la formula de Coseno obteniendo las calificaciones de los items de la misma columna
  for (let i = 0; i < matriz[vecino1].length; i++) {
    if (matriz[vecino1][i] !== "-" && matriz[vecino2][i] !== "-") {
      vec_aux.push(i)
    }
  }
  //Reiniciamos las variables para que no afecten a las diferentes llamadas
  let resultado = 0
  // Calculamos la formula utilizando el vector creado anteriormente
  for (let i = 0; i < vec_aux.length; i++) {
    resultado = resultado+Math.pow((parseInt(matriz[vecino1][vec_aux[i]])-parseInt(matriz[vecino2][vec_aux[i]])), 2)
  }
  resultado = parseFloat(Math.sqrt(resultado).toFixed(2))
  return resultado
}


// Función que llama a todas las demás funciones para realizar los calculos deseados;
function sistema_recomendacion(matriz, metrica, num_vecinos, tipo_prediccion) {
  let matriz_salida = JSON.parse(JSON.stringify(matriz)); // Creamos una copia de la matriz original
  let similiaridades = [];  // Similiaridades entre todos los pares de vecinos
  let vecinos_seleccionados = []; // Vector con los vecinos seleccionados en cada predicción.
  let calculo_predicciones = [];  // Vector con los resultados de cada predicción.
  let medias_usuarios = calculo_medias(matriz); // Vector con todas las medias de los usuarios

  //Según la métrica elegida calculamos las predicciones
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      if (i !== j) {
        let indice = 0;
        switch (metrica) {
          case "Correlación de Pearson":
            
            indice = similiaridades.findIndex((elemento) => {
              if (elemento[0] === i) {
                return true;
              }
            })

            //Comprobamos si ya se ha calculado la similitud
            if (indice === -1) {
              //La metemos en el vector si no se ha calculado todavía
              similiaridades.push([i, [[j, correlacion_pearson(matriz, medias_usuarios, i, j)]]]); 
            } else {
              //Metemos la que ya se ha hecho
              similiaridades[indice][1].push([j, correlacion_pearson(matriz, medias_usuarios, i, j)]) 
            }
            
            break
          case "Distancia coseno":
            indice = similiaridades.findIndex((elemento, indice) => {
              if (elemento[0] === i) {
                return true;
              }
            })

            if (indice === -1) {
              similiaridades.push([i, [[j, coseno(matriz, i, j)]]]);
            } else {
              similiaridades[indice][1].push([j, coseno(matriz, i, j)])
            }
            break
          case "Distancia Euclídea":
            indice = similiaridades.findIndex((elemento, indice) => {
              if (elemento[0] === i) {
                return true;
              }
            })

            if (indice === -1) {
              similiaridades.push([i, [[j, euclidea(matriz, i, j)]]]);
            } else {
              similiaridades[indice][1].push([j, euclidea(matriz, i, j)])
            }
            break
          case "default":
              alert("Ha habido un error en la elección de la métrica")
              throw new Error();
            break
        }
      }
    }
  }


  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] == "-") {
        let indice = similiaridades.findIndex((elemento) => {
          if (elemento[0] === i) {
            return true;
          }
        })
        // Vector que contendrá la similitud del usuario que tiene el item sin calificar con sus vecinos
        let simil_vecinos = JSON.parse(JSON.stringify(similiaridades[indice][1])); 

        // Orden de las similitudes según la métrica
        switch (metrica) {
          case "Correlación de Pearson":
            simil_vecinos.sort(function (a, b) {
              if (a[1] > b[1]) {
                return -1;
              } else {
                  if (a[1] < b[1]) {
                    return 1;
                  } else {
                      return 0;
                    }
                }
            });

            //Normalizamos las similitudes, es decir, tienen que estar ere 0 y 1
            for (let k = 0; k < simil_vecinos.length; k++) {
              simil_vecinos[k][1] = (simil_vecinos[k][1]-(-1))/(1-(-1))
            }
            break
          case "Distancia coseno":
            for (let k = 1; k < matriz.length; k++) {
              simil_vecinos.sort(function (a, b) {
                if (a[1] > b[1]) {
                  return -1;
                } else {
                    if (a[1] < b[1]) {
                      return 1;
                    } else {
                        return 0;
                      }
                  }
              })
            }
            break
          case "Distancia Euclídea":
            simil_vecinos.sort(function (a, b) {
              if (a[1] < b[1]) {
                return -1;
              } else {
                  if (a[1] > b[1]) {
                    return 1;
                  } else {
                      return 0;
                    }
                }
            });

            //Normalizamos las similitudes, es decir, tienen que estar ere 0 y 1
            for (let k = 0; k < simil_vecinos.length; k++) {
              simil_vecinos[k][1] = (simil_vecinos[k][1]-0)/(Math.sqrt(25*matriz[i].length-0))
            }
            break
          case "default":
            alert("Ha habido un error en la elección de la métrica")
            throw new Error();
            break
        }

        //Creamos un vector para almacenar los vecinos seleccionados en el calculo de la predicción
        let aux = [i, j, []] 
        let prediccion = 0
        switch (tipo_prediccion) {
          case "Predicción simple":
            for (let k = 0; k < num_vecinos; k++) {
              if (matriz[simil_vecinos[k][0]][j] == "-") {
                simil_vecinos.splice(k, 1);
                k--;
                continue;
              }
              aux[2].push(simil_vecinos[k][0]);
            }
            //Calculamos de predicción
            prediccion = simple(matriz, j, num_vecinos, simil_vecinos) 
            //Metemos en el vector el resultado
            calculo_predicciones.push([i, j, prediccion]) 
            matriz_salida[i][j] = Math.round(prediccion).toString(); 
  
            break

          case "Diferencia con la media":
            for (let k = 0; k < num_vecinos; k++) {
              if (matriz[simil_vecinos[k][0]][j] == "-") {
                simil_vecinos.splice(k, 1);
                k--;
                continue;
              }
              aux[2].push(simil_vecinos[k][0]);
            }

            prediccion = dif_media(matriz, medias_usuarios, i, j, num_vecinos, simil_vecinos)
            calculo_predicciones.push([i, j, prediccion])
            matriz_salida[i][j] = Math.round(prediccion).toString();
            break
          case "default":
            alert("Ha habido un error en la elección de la métrica")
            throw new Error();
            break
        }
        
        vecinos_seleccionados.push(aux); 
      }
    }
  }
  
  return [matriz_salida, similiaridades, vecinos_seleccionados, calculo_predicciones];
}



// Función a la que se llama desde el html, recoge los datos y muestra la salida
function tratar_datos() {
  //Comprobamos si la matriz se ha recogido del fichero correctamente
  if (matrizPrincipal.length == 0) { 
    alert("No ha sido posible procesar la matriz");
    throw new Error();
  } else { 
    numero_vecinos = document.getElementById("numero_vecinos").value

    let alerta = "Se está escogiendo un número de vecinos demasiado elevado"
    if (numero_vecinos > matrizPrincipal.length-1) {
      alert(alerta);
      throw new Error();
    } else {

      metrica = document.getElementById("metrica").value
      tipo_prediccion = document.getElementById("tipo_prediccion").value

      let salida = "<b>Matriz Resultante</b><br>"
      let salida_syr = sistema_recomendacion(matrizPrincipal, metrica, numero_vecinos, tipo_prediccion) // Realizamos la función del sistema de recomendación

      // Ajustamos la salida y la mostramos por pantalla
      for (let i = 0; i < salida_syr[0].length; i++) {
        for (let j = 0; j < salida_syr[0][i].length; j++) {
          if (j > 0) {
            if (matrizPrincipal[i][j] === "-") {
              salida = salida + " " + "<u>" + salida_syr[0][i][j] + "</u>"
            } else {
              salida = salida + " " + salida_syr[0][i][j]
            }
          } else {
            if (matrizPrincipal[i][j] === "-") {
              salida = salida + "<u>" + salida_syr[0][i][j] + "</u>"
            } else {
              salida = salida + salida_syr[0][i][j]
            }
          }
        }
        salida = salida + "<br>"
      }

      salida = salida + "<br><br><b>Similiaridad entre los vecinos '" + metrica + "'</b><br>"
      
      for (let i = 0; i < salida_syr[1].length; i++) {
        salida = salida + "<b>Vecino</b> " + (parseInt(salida_syr[1][i][0])+1) + ":"
        for (let j = 0; j < salida_syr[1][i][1].length; j++) {
          salida = salida + "<br>Vecino " + (parseInt(salida_syr[1][i][0])+1) + " - Vecino " + (parseInt(salida_syr[1][i][1][j][0])+1) + ": <b>" + salida_syr[1][i][1][j][1] + "</b>"
        }
        salida = salida + "<br>"
      }
      
      salida = salida + "<br><br><b>Vecinos seleccionados</b><br>"

      for (let i = 0; i < salida_syr[2].length; i++) {
        salida = salida + "· Predicción de la calificación del Vecino " + (parseInt(salida_syr[2][i][0])+1) + " al Item " + (parseInt(salida_syr[2][i][1])+1) + ":<br>Vecinos "
        for (let j = 0; j < salida_syr[2][i][2].length; j++) {
          if (j > 0) {
            if (j == salida_syr[2][i][2].length-1) {
              salida = salida + " y <b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
            } else {
              salida = salida + ", <b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
            }
          } else {
            salida = salida + "<b>" + (parseInt(salida_syr[2][i][2][j])+1) + "</b>"
          }
        }
        salida = salida + "<br>"
      }

      salida = salida + "<br><br><b>Cálculo de cada predicción de la matriz de utilidad en base a los vecinos seleccionados</b><br>"

      for (let i = 0; i < salida_syr[3].length; i++) {
        salida = salida + "· Predicción de la calificación Vecino " + (parseInt(salida_syr[3][i][0])+1) + " al " + (parseInt(salida_syr[3][i][1])+1) + ": <b>" + salida_syr[3][i][2] + "</b><br>"
      }

      salida = salida + "<br><br>"
      document.getElementById("salida").innerHTML = salida
    }
  }
}


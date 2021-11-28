# Gestión del Conocimiento en las Organizaciones
## Sistemas de Recomendación
#
### Diego Rodríguez Pérez
### alu0101203980@ull.edu.es
#

### Expliación del código

El código se ha explicado en el propio código mediante comentarios pero haremos un resumen:

1. Se obtienen las entradas que elige el usuario

2. Se tiene una función principal que según las entradas llama a una u otra función.

3. Esas funciones llamadas pueden ser el cálculo de Pearson, el cálculo de la distancia Coseno y la distancia Euclidea.

4. Una vez todos los cálculos son realizados se muestran las salidas deseadas.

#

## Ejemplo de uso

1. Elección del fichero.

    5 3 4 4 -  
    3 1 2 3 3  
    4 3 4 3 5  
    3 3 1 5 4  
    1 5 5 2 1  

2. Elección de la métrica. 

    Correlación de Pearson

3. Elección del número de vecinos.

    2

4. Elección de la predicción.

    Diferencia con la media


class Minas {
    constructor() { 
        this.matriz = []; 
        this.salida = [];
        this.columnas=[];
        this.nFilas = 0;
        this.nminas=0;
        this.nColumans = 0;
        this.mov = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    }

    carga(contenido) { //Funcion para cargar datos, recibe contenido desde la UI
        try {
        this.matriz = []; 
        this.salida = [];
        this.columnas=[];
        this.nFilas = 0;
        this.nminas=0;
        this.nColumans = 0; 
            const lineas = contenido.split('\n');
            
            lineas.forEach((linea, i) => {
                if (linea != "") {
                    console.log("Cargando datos");
                    const valor = linea.trim().split(/\s+/); 
                    if (i == 0) {
                        this.nFilas = parseInt(valor[0], 10);
                        this.nColumans = parseInt(valor[1], 10);
                        
                        for (let i = 0; i < this.nColumans; i++) {
                            this.columnas.push(i+1);    
                        }
                       // console.log(this.columnas); 
                    } else {
                        const fila = [];
                        const fSalida = [];
                        valor.forEach((num, j) => {
                            fila.push(parseInt(num, 10));
                            fSalida.push(' ');
                        });
                        this.matriz.push(fila);
                        this.salida.push(fSalida);
                    }
                    
                }
            });
            console.log(this.matriz);
        } catch (error) {
            console.error('Error al procesar el archivo');
        }
    }

    verificar(i, j) { // verifico si esta posición es una mina o no, retorno un True o False
        let suma = 0;
        let vecinos = 0;
        this.mov.forEach((mov, k) => {
            let ki = i + mov[0];
            let kj = j + mov[1];
            if (ki < this.nFilas && ki >= 0 && kj < this.nColumans && kj >= 0) {
                suma += this.matriz[ki][kj];
                vecinos++;
            }
        });
        let promedio = suma / vecinos; // Se tiene en cuenta el numero de vecionos al momento de promediar
        if ((promedio + this.matriz[i][j]) > 40) {
            
            this.nminas++;
            return true;
        }        
        return false;
    }

    buscarMinas(i=0, j=0) { // inicio la busqueda de minas, partiendo desde la posicion i=0 j=0
        let valido = this.verificar(i, j); 
        if (valido) {
            this.salida[i][j] = '*';
        }
        
        if (j + 1 < this.nColumans) { //Condiciones de la llamada recursiva
            this.buscarMinas(i, j + 1);
        } else if (i + 1 < this.nFilas) {
            this.buscarMinas(i + 1, 0);
        } else {
            return;
        }
    }

    resultado() { // Funcion para mostrar resultado en consola
        console.log(this.columnas);
        this.salida.forEach((linea, i) => {
            console.log(linea);
        
        });
        console.log(this.nminas)
    }
}

// (() => {
//     const mina = new Minas();
//     mina.carga("minas.in");
//     mina.buscarMinas();
//     mina.resultado();
    
// })();

export default Minas;
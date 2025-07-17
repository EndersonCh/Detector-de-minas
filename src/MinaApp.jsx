import React, { useRef, useState } from "react";
import Minas from "./utils/logica";
import './MinaApp.css';
import Card from "./components/Card";

function MinaApp() {
  const mina = useRef(new Minas());
  const [resultado, setResultado] = useState([]);
  const [numcolumnas, setColumnas] = useState([]);
  const [matriz, setMatriz] = useState([]);
  const [nminas, setnminas] = useState(0);
  const [procesar, setProcesar] = useState(false);
  const [estBotonTxt, setEstBotonTxt] =useState(false);
  const [nombreArch, setNombreArch] = useState("");
  const [archivoBlob, setArchivoBlob] = useState(null);
  

  let mins = 0;



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {

      return;

    }
    if (matriz == []) {
      setResultado([]);
      setColumnas([]);
      setMatriz([]);
      setnminas(0);
      setProcesar(false);
      mina.current(new (Minas()));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const entrada = event.target.result;

      mina.current.carga(entrada);

      setMatriz([...mina.current.matriz]);
      setProcesar(true)
    }
    reader.readAsText(file);
  };

  function handleClick() {
    if (procesar) {

      mina.current.buscarMinas();
      mina.current.resultado();
      const result=mina.current.salida;
      const columnas= mina.current.columnas;
      let estadoBoton=false;
      const contenidotxt = (()=>{
        let conteni = "Mapa Analizado\n  ";
        console.log(columnas)
        columnas.map((n,i) => {
          conteni+=`${n} `
        });
        conteni+=`\n`;
        result.forEach((fila,i) => {
          conteni+=`${i+1} `
          fila.forEach(campo=>{
            conteni+=`${campo} `
          })
          conteni+=`\n`
        });
        estadoBoton=true;
        return conteni
      })();

      const archBlob = new Blob([contenidotxt],{type: `text/plain`});
      const nombArch = `Analisis de minas`;
      setArchivoBlob(archBlob);
      setNombreArch(nombArch);
      setEstBotonTxt(estadoBoton)
      setResultado([...result]);
      setColumnas([...columnas]);
      setnminas(mina.current.nminas);
      setProcesar(false)
    } else {
      alert("Carga primero el archivo");
    }

  }



  return (

    <div>
      <div className="logo">
        <img src="logo.png" alt="logo" />
      </div>
      <div className="cabecera">
        <h1>Detector de Minas</h1>
      </div>

      <div className="main-container">
        <div className="left-container">
          <div className="container">
            <div className="fila_nColumnas">

              {numcolumnas.map((num, i) => (

                i == 0 ? (
                  <><Card ima="./numero.png" text={``} /><Card key={`col-${i}`} ima="./numero.png" text={`${i + 1}`} /></>
                ) : (

                  <Card key={`col-${i}`} ima="./numero.png" text={`${i + 1}`} />
                )
              ))}
            </div>
            {/* Creacion de la matriz de card */}
            {resultado.map((fila, i) => (
              <div className="fila_matriz" Key={`fila-${i}`}>
                <Card key={`fila-${i}`} ima="./numero.png" text={`${i + 1}`} />
                {fila.map((celda, j) => {
                  let imagen;
                  if (celda == " ") {
                    imagen = "./vacio.png"
                  } else {
                    imagen = "./mina.png"
                    mins++;
                  }
                  return <Card key={`celda-${i}-${j}`} text="" ima={imagen} />;
                  //dependiendo del valor resivido desde logica.js en resultado
                  //se pasa como parametro una imagen o la otra
                })}
              </div>
            ))}
            <div className="fila_nColumnas">

              {numcolumnas.map((num, i) => (
                i == 0 ? (
                  <><Card ima="./numero.png" text={``} /><Card key={`col-${i}`} ima="./numero.png" text={`${i + 1}`} /></>
                ) : (

                  <Card key={`col-${i}`} ima="./numero.png" text={`${i + 1}`} />
                )


              ))}
            </div>

          </div>
        </div>
        <div className="right-container">
          <div>

            <pre>
              {matriz.length == 0 ? (<div className="instrucciones">
                <h2>Sistema de Análisis <br />Geológico Octopus</h2>
                <hr />
                <p>Este programa analiza datos de <br /> densidad del suelo e
                  identifica <br />zonas de interés geológico  </p>
                <hr />
                <h3>Instrucciones:</h3>
                <ul>
                  <li><strong>Cree un archivo:</strong> <br />Tipo .in,
                    en la primera linea <br />incluir numero de filas y <br />columnas,
                    en la siguiente linea copiar <br />la matriz un fila por linea
                    <p>
                      Ejemplo de formato: <br />
                      4 3   <br />
                      10 12 15 <br />
                      11 14 30 <br />
                      33 40 28 <br />
                      10 33 25 <br />
                    </p></li>
                  <li><strong>Selecciona el archivo:</strong> <br />Haz clik en el boton <br /> "Selecionar archivo"</li>
                  <li><strong>Procesa:</strong><br />Verifica los datos y procesa <br />la matriz</li>
                </ul>
              </div>

              ) : (

                <>
                  <h2>Datos de archivo</h2>

                  {matriz.map((linea, i) => {

                    return i + 1 + " " + linea.join(" ") + "\n"
                  })
                  }
                </>
              )}
            </pre>
          </div>
          <input
            type="file"
            accept=".in,.txt"
            onChange={handleFileChange}
            disabled={procesar} />
          <button onClick={handleClick} disabled={!procesar}>

            Procesar

          </button>
          <div className="boton-generar-txt">
             <a     
                    download={nombreArch}
                    target='_blank'
                    rel="noreferrer"
                    href={archivoBlob ? URL.createObjectURL(archivoBlob) : '#'}
                    style={{ textDecoration: "none", color: "inherit", pointerEvents: estBotonTxt? 'auto' : 'none'}}
                >
                    <button
                        className='button-generar'
                        
                    >
                        Exportar 
                    </button>
                </a>
          </div>


        </div>
      </div>
      <div className="pie-info">
        <div>
          <h3>Cantidad de minas encontradas: {nminas}</h3>
        </div>
        <div>
          <h3>Muestras de terreno estudiadas: {numcolumnas.length * resultado.length}</h3>
        </div>
      </div>

    </div >
  );
}

export default MinaApp;
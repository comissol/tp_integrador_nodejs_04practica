import express from 'express'
import data from './cities.json' with {type: 'json'};

const server = express()

server.get('/', (req, res) => {
  res.status(200).json({status: 200, message: "Bienvenida/o al listado de ciudades de PBA"})
})

// Todas las ciudades + filtro por query (nombre)
server.get("/ciudades", (req, res) => {
  const { nombre } = req.query;
// si no hay query, devuelve todas
  if (!nombre) {
    return res.json({ data: data.localidades });
  }
// si hay query, filtra por nombre
  const resultado = data.localidades.filter((l) =>
    l.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
    if (resultado.length === 0) {
    return res.status(404).json({ Status: "404", error: "Ciudad no encontrada" });
  }
  res.json({ data: resultado });
});

//Por ID (ruta paramétrica)
server.get("/ciudades/:id", (req, res) => {
  const { id } = req.params;
  const localidad = data.localidades.find(
    (l) => String(l.id).replace(/^0+/, "") === id.replace(/^0+/, "")
  );
  if (!localidad) {
    return res.status(404).json({ status: "404", error: "Ciudad no encontrada" });
  }
  res.json({ data: localidad });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

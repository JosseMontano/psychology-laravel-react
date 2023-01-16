import React, { useEffect, useRef } from "react";

const AnswersReports = ({ setTableRef, respuestas }) => {
  
  const tableRef = useRef(null);

  useEffect(() => {
    setTableRef(tableRef);
  }, [])

  const ThStyle = {
    backgroundColor: "#ebf0fa",
    color: "#3E435D"
  }

  return (
    <table style={{display: "none"}} ref={tableRef}>
      <thead>
        <tr>
          <th style={ThStyle}>#</th>
          <th style={ThStyle}>Nombre</th>
          <th style={ThStyle}>Email</th>
          <th style={ThStyle}>Test</th>
          <th style={ThStyle}>Descripción</th>
          <th style={ThStyle}>Docente</th>
          <th style={ThStyle}>Email docente</th>
          <th style={ThStyle}>Estado</th>
          <th style={ThStyle}>Puntuación</th>
          <th style={ThStyle}>Máximo</th>
        </tr>
      </thead>
      <tbody>
        {respuestas.map((v, i) => (
          <tr key={i}>
            <th>{i + 1}</th>
            <td>
              <p>{v.nombre_user}</p>
            </td>
            <td>
              <p>{v.email_user}</p>
            </td>
            <td>
              <p>{v.nombre_test}</p>
            </td>
            <td>
              <p>{v.descripcion}</p>
            </td>
            <td>
              <p>{v.nombre_docente}</p>
            </td>
            <td>
              <p>{v.email_docente}</p>
            </td>
            <td>
              <p style={{
                backgroundColor: 
                  v.estado == 0 ? "#F4F4F4" :
                  v.estado == 1 ? "#F0F1FA" :
                  v.estado == 0 ? "#d4ffea" :
                  v.estado == 0 && "#fad9e3",
                color:
                  v.estado == 0 ? "#3E435D" :
                  v.estado == 1 ? "#4F5AED" :
                  v.estado == 0 ? "#179E5B" :
                  v.estado == 0 && "#D12953" 
              }}>
                {v.estado == 0
                ? "Pendiente"
                : v.estado == 1
                ? "Recibido"
                : v.estado == 2
                ? "Corregido"
                : v.estado == 3 && "Expiró"}
              </p>
            </td>
            <td>
              <p>{v.puntuacion}</p>
            </td>
            <td>
              <p>{v.total}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnswersReports;
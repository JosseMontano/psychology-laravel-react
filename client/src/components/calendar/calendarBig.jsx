import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { PurpleButton, WhiteIconButton } from "../../styles/formularios";
import { getTime } from "../../services/horario";
import { UserContext } from "../../context/userContext";

const DivCalendarBig = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DivControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarMonth = styled.h2`
  color: #000000;
  font-size: 36px;
  font-weight: 600;
`;

const TableCalendar = styled.table`
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  table-layout: fixed;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid #D9D9D9;
`;

const DaysTh = styled.th`
  height: 40px;
  font-size: 18px;
  color: #660BE1;
  border: 1px solid #D9D9D9;
`;

const TdDay = styled.td`
  opacity: ${props => props.month? 0.5 : 1};
  border: 1px solid #D9D9D9;
`;

const DivTd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;
  overflow-x: hidden;

  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;

  &:hover > div > button {
    display: block;
  }
`;

const DivDay = styled.div`
  width: 100%;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  & > button {
    display: none;
    transform: scale(0.8);
  }
`;

const PDay = styled.p`
  color: ${props => props.today && '#660BE1'};
`;

const DivTask = styled.div`
  width: calc(100% + 18px);
  background-color: #F0F1FA;
  color: #4F5AED;
  padding: 1px 10px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const CalendarBig = () => {
  const [mesActual, setMesActual] = useState(dayjs().month());
  const [yearActual, setYearActual] = useState(dayjs().year());

  const { user } = useContext(UserContext);
  const [horarios, setHorarios] = useState([]);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getMes = (mes) => { //OBTENER EL ARRAY DE DÍAS DEL MES ACTUAL
    const year = dayjs().year();
    const primerDiaDelMes = dayjs(new Date(year, mes, 1)).day();
    let diaActual = 0 - primerDiaDelMes;
    const dias = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        diaActual++;
        return dayjs(new Date(year, mes, diaActual));
      });
    });
    let cont = 0;
    dias[5].forEach((day) => {
      if (day.format("DD") <= 14) {
        cont++;
      }
    });
    if (cont == 7) dias.pop();

    return dias;
  };

  const comprobarDiaActual = (year, mes, dia) => { //COMPROBAR EL DÍA DE HOY
    if (
      year == dayjs().year() &&
      mes == dayjs().month() + 1 &&
      dia == dayjs().date()
    ) {
      return true;
    }
    return false;
  };

  const comprobarMesActual = (mes) => { //COMPROBAR EL MES EN EL QUE ESTAMOS
    if (mesActual % 12 < 0) {
      if (mes - 1 == (mesActual % 12) + 12) {
        return false;
      }
    } else if (mes - 1 == mesActual % 12) {
      return false;
    }
    return true;
  };

  const nextMonth = () => { //IR CAMBIANDO LA VARIABLE DE MES Y AÑO HACIA ADELANTE
    setMesActual(mesActual + 1);
    if ((mesActual + 1) % 12 == 0) {
      setYearActual(yearActual + 1);
    }
  };

  const lastMonth = () => { //IR CAMBIANDO LA VARIABLE DE MES Y AÑO HACIA ATRAS
    setMesActual(mesActual - 1);
    if (mesActual % 12 == 0) {
      setYearActual(yearActual - 1);
    }
  };

  const convertToDate = (day, time) => { //MOSTRAR LA HORA SIN LOS SEGUNDOS
    const hour = time.slice(0, time.search(":"));
    const minutes = time.slice(time.search(":") + 1, time.length).slice(0, time.search(":"));
    const hora = new Date(
      day.format("YYYY"),
      day.format("MM") - 1,
      day.format("DD"),
      hour,
      minutes
    )
    
    const mostrarCeros = (minutos) => {
      if(minutos == 0) {
        return "00";
      } else {
        return minutos;
      }
    }
    const mostrar = hora.getHours() + ":" + mostrarCeros(hora.getMinutes());

    return mostrar;
  }

  const getHorarios = async () => { //LLAMADA A LA API PARA OBTENER LOS HORARIOS
    const res = await getTime(user.id);
    console.log(res);
    setHorarios(res);
  }

  useEffect(() => {
    getHorarios();
  }, []);

  return(
    <DivCalendarBig>
      <DivControls>
        <PurpleButton width="180px" onClick={lastMonth}>
          <i className="fa-solid fa-arrow-left"></i> {meses.at((mesActual - 1) % 12)}
        </PurpleButton>
          <CalendarMonth>
            {meses.at(mesActual % 12)}, {yearActual}
          </CalendarMonth>
        <PurpleButton width="180px" onClick={nextMonth}>
          {meses.at((mesActual + 1) % 12)}<i className="fa-solid fa-arrow-right"></i>
        </PurpleButton>
      </DivControls>
      <TableCalendar>
        <thead>
          <tr>
            <DaysTh>Dom</DaysTh>
            <DaysTh>Lun</DaysTh>
            <DaysTh>Mar</DaysTh>
            <DaysTh>Mie</DaysTh>
            <DaysTh>Jue</DaysTh>
            <DaysTh>Vie</DaysTh>
            <DaysTh>Sab</DaysTh>
          </tr>
        </thead>
        <tbody>
          {getMes(mesActual).map((row, i) => (
            <tr key={i}>
              {row.map((day, j) => (
                <TdDay
                  today={comprobarDiaActual(
                    day.format("YYYY"),
                    day.format("MM"),
                    day.format("DD")
                  )}
                  month={comprobarMesActual(day.format("MM"))}
                  key={j}
                >
                  <DivTd>
                    <DivDay
                      today={comprobarDiaActual(
                        day.format("YYYY"),
                        day.format("MM"),
                        day.format("DD")
                      )}
                    >
                      <PDay>{day.format("DD")}</PDay>
                      <WhiteIconButton><i className="fa-solid fa-plus"></i></WhiteIconButton>
                    </DivDay>
                    {
                      horarios.filter(v => v.fecha == day.format("YYYY-MM-DD")).map((v, i) => {
                        const hora_inicio = convertToDate(day, v.hora_inicio);
                        const hora_final = convertToDate(day, v.hora_final);
                        return (
                          <DivTask key={i}>Libre {hora_inicio} a {hora_final}</DivTask>
                        )
                      })
                    }
                  </DivTd>
                </TdDay>
              ))}
            </tr>
          ))}
        </tbody>
      </TableCalendar>
    </DivCalendarBig>
  )
}

export default CalendarBig;
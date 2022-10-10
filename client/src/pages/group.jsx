import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import styled from 'styled-components';
import { addGrupo, getGruposDocente } from '../services/grupo';
import Modal from '../components/globals/modal';
import ModalGroup from '../components/group/modalGroup';
import GroupResponse from '../components/group/groupResponse';
import Cargando from '../components/globals/cargando';

const DivGroupsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonAdd = styled.button`
  width: 200px;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const DivGroups = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;

const Group = () => {
  const { user } = useContext(UserContext);
  const [ grupos, setGrupos ] = useState([]);
  const [ showForm, setShowForm ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const llenarGrupos = async () => {
    const res = await getGruposDocente(user.id);
    const resJson = await res?.json();
    setGrupos(resJson);
    setLoading(false);
  }

  useEffect(() => {
    //LLENAR GRUPOS
    llenarGrupos();
  }, []);

  return (
    <DivGroupsPage>
      <ButtonAdd onClick={() => setShowForm(true)}>Añadir grupo</ButtonAdd>

      {showForm && 
        <Modal cerrar={() => setShowForm(false)} titulo="Añadir grupo" >
          <ModalGroup 
            call={addGrupo}
            actualizar={() => {
              llenarGrupos();
              setShowForm(false);
            }}
            id_docente={user.id}
            funcion="añadir"
          />
        </Modal>
      }
      <DivGroups>
        { loading? (
          <Cargando />
        ) : (
          <GroupResponse grupos={grupos} llenarGrupos={llenarGrupos} />
        )}
      </DivGroups>
    </DivGroupsPage>
  )
}

export default Group;
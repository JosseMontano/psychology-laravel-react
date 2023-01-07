import React from "react";
import { FormContainer, PurpleButton } from "../../../styles/globals/formularios";
import FormInputsText from "../../globals/formInputsText";
import { initialForm, validationsForm } from "../../../validations/pregunta_reactivo";
import { UseForm } from "../../../hooks/useForm";

const ModalDimension = ({ dimension, call, actualizar, funcion, idTest }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    dimension ? {
      id_test: idTest,
      descripcion: dimension.descripcion
    } : initialForm, 
    validationsForm, 
    call, 
    actualizar, 
    dimension?.id, 
    idTest
  )
  
  const data = [
    {
      name: "descripcion",
      placeholder: "Descripción",
      error: errors.descripcion,
      value: form.descripcion,
      type: "text",
      disabled: false
    }
  ]

  return (
    <FormContainer>
      <FormInputsText 
        data={data}
        handleChange={handleChange}
      />
      <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalDimension;
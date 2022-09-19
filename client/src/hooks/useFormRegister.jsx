import { useState, useEffect } from "react";
import { signUp } from "../services/auth";

export const UseForm = ( initialForm, validateForm ) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSend = async (form) => {
    try {
      const res = await signUp(form);
      const resJson = await res?.json();
      if(resJson.message =="¡Registro correcto!"){
        setResponse(true);
        setForm(initialForm); //if want cleam the inputs
      }
      else console.log(resJson.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  const closeModal = () => {
    setResponse(false);
  }

  //CUANDO CAMBIEN LOS ERRORES
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    if(effects) {
      if (Object.keys(errors).length === 0) {
        handleSend(form);
      }
    }

    //DA PASO AL USE EFFECT
    setEffects(true);
  }, [errors]);


  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
    closeModal
  };
};
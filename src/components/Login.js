import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Card, CardContent, TextField } from "@mui/material";
import Center from "./Center";
import Typography from "@mui/material/Typography";
import useForm from "../Hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../API";
import useStateContext from "../Hooks/useStateContext";
import { useNavigate } from "react-router-dom";
   
const getFreshModelObject = () => ({
    name: '',
    email: ''
})

export default function Login() {

  const {context, setContext, resetContext} = useStateContext();
  const navigate = useNavigate();

  const { 
      values, 
      // setValues, 
      errors, 
      setErrors, 
      handleInputChange 
    } = useForm(getFreshModelObject);

    useEffect(() => {
      resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if(validate())
          createAPIEndpoint(ENDPOINTS.participant)
            .post(values)
            .then(res => {
              setContext({ participantId: res.data.participantId })
              navigate('/Quiz')
            })
            .catch(err => console.log(err)) 
    }

    const validate = () => {
        let temp ={}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.name = values.name!==""?"":"This field is required"
        setErrors(temp)
        return Object.values(temp).every(x=> x === "")
    }

  return (
    <Center>
      {/* {context.participantID} */}
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                START
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}

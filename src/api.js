import axios from 'axios';

export default {
    users :{
        create : user => axios.post(`/api/crear-usuarios`,{user}),
        login : credentials => axios.post(`/api/login`, {credentials}).then(res => res.data.token).catch(err=> err.response.data),
        recuperar : credentials => axios.post(`/api/recuperar-contrasena`,{credentials}).then(res => res.data.token).catch(err=> err.response.data),
        cambiar : Newpass => axios.post(`/api/newPass`,{Newpass}).then(res => res.data.token).catch(err=> err.response.data)
    },
    materias :{
        create : data => axios.post(`/api/crear-materia`,{data})
    }
};

import axios from 'axios';

export default {
    users :{
        create : user => axios.post(`/api/crear-usuarios`,{user}).then(res => res.data).catch(err=> err.response.data),
        login : credentials => axios.post(`/api/login`, {credentials}).then(res => res.data).catch(err=> err.response.data),
        recuperar : credentials => axios.post(`/api/recuperar-contrasena`,{credentials}).then(res => res.data).catch(err=> err.response.data),
        cambiar : data => axios.post(`/api/resetP`,{data}).then(res => res.data).catch(err=> err.response.data)
    },
    materias :{
        create : data => axios.post(`/api/crear-materia`,{data}).then(res => res.data).catch(err=> err.response.data),
        getMaterias : data => axios.post(`/api/materias`,{data}).then(res=>res.data).catch(err=> err.response.data),
        getMateria : data => axios.post(`/api/getMateria`,{data}).then(res=>res.data).catch(err=> err.response.data),
    },
    estudiantes : {
        create : data => axios.post(`/api/crear-estudiante`,{data}).then(res => res.data).catch(err=> err.response.data),
    }
};

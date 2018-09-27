import axios from 'axios';

export default {
    users :{
        create : user => axios.post(`/api/crear-usuarios`,{user}),
        login : credentials => axios.post('/api/login', {credentials}).then(res => res.data.token).catch(err=> console.log(err))
    }
};

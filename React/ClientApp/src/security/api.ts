import axios from 'axios'

export const login = (login: string, password: string) => {

    let data: FormData = new FormData();
    data.append('login', login);
    data.append('password', password);

    return axios.post('/api/login', data);
}
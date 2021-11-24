import axios from "axios";

const url = "http://localhost:4000/usuarios"

export const getUser = async () => {

    try {
        const res = await axios.get(url);
        return res.data;
    }
    catch (err) {
        return err;
    }
}

export const postUser = async (data) => {

    try {
        await axios.post(`${url}`, data);
        return ({message: "usuario creado."});
    }
    catch (err) {
        return err;
    }
}

export const putUser = async (id, data) => {

    try {
        await axios.put(`${url}/${id}`, data);
        return ({message: "usuario editado."});
    }
    catch (err) {
        return err;
    }
}

export const deleteUser = async (id) => {

    try {
        await axios.delete(`${url}/${id}`);
        return ({message: "usuario eliminado."});
    }
    catch (err) {
        return err;
    }
}
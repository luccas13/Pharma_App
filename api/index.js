import axios from "axios";

const url = "https://api.fgdev.ar/pharma/product"

export const getProduct = async () => {

    try {
        const res = await axios.get(url);
        return res.data;
    }
    catch (err) {
        return err;
    }
}

export const getProductById = async (id) => {

    try {
        const res = await axios.get(url + "/" + id,);
        return res.data
    }
    catch (err) {
        return err;
    }
}

export const deleteProduct = async (id, token) => {

    try {
        await axios.delete(url + "/" + id, {
            headers: { authorization: token },
        });
        return {message: "Producto borrado."};
    }
    catch (err) {
        return err;
    }
}

export const createProduct = async (data, token) => {

    try {
        await axios.post(url, data, {
            headers: { authorization: token },
        });
        return {message: "Producto creado."};
    }
    catch (err) {
        return err;
    }
}

export const uploadProduct = async (data, token) => {

    try {
        await axios.put(url + "/" + id, data, {
            headers: { authorization: token },
        });
        return {message: "Producto editado."};
    }
    catch (err) {
        return err;
    }
}
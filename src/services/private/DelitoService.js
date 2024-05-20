import { axiosConfig } from "../../config/axiosConfig";

export const eliminar = async (id = "") => {

    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.delete(
        process.env.REACT_APP_BASE_URL+`/delitos/${id}`,
    );
}

export const obtener = async () => {

    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.get(
        process.env.REACT_APP_BASE_URL+`/delitos/all`,
    );
}

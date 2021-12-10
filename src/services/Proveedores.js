import axios from 'axios'

const PROVEEDORES_REST_API_URL = 'http://localhost:8080/api/proveedores/';

class ProveedoresService {

    getProveedores(){
        return axios.get(PROVEEDORES_REST_API_URL).then(res => res.data);
    }

    save(proveedorest){
        return axios.post(PROVEEDORES_REST_API_URL, proveedorest).then(res => res.data);
    }

    update(proveedorest, id){
        return axios.put(PROVEEDORES_REST_API_URL+id, proveedorest).then(res => res.data);
    }

    delete(id){
        return axios.delete(PROVEEDORES_REST_API_URL+id).then(res => res.data);
    }
    
}

export default new ProveedoresService();
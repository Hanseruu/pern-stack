import {create} from 'zustand'
import axios from 'axios'

const BASE_URL = "http://localhost:3000/";

export const useProductStore = create((set, get) => ({
    products: [],
    loading:false,
    error:null,

    fetchProducts: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api`)
            // on controllers we get set it as data:, entonces aqui la primera data es axios y luego nuestra api
            set({products: response.data.data, error: null})
        } catch (err) {
            if (err.status == 420) set({error:"Rate limit exceeded"})
            else set({error: "Something went wrong", err })
        } finally {
        set({loading:false});
        } 
    }
}))
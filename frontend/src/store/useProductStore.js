import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast';
// Base url will be dynamic and it will adapt with the domain, depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : ""

export const useProductStore = create((set, get) => ({
    products: [],
    loading:false,
    error:null,
    currentProduct: null,

    // form State
    formData: {
        name:"",
        price:"",
        image:"",
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({formData: {name: "", price: "", image: ""}}),

    addProduct: async (e) => {
        e.preventDefault();
        //functionality
        set({loading: true})
        try {
           const { formData } = get() 
           await axios.post(`${BASE_URL}/api/products/create`, formData);
           await get().fetchProducts();
           get().resetForm();
           toast.success("Product Added successfully");
           document.getElementById("add_product_modal").close();

        } catch (err) {
            console.log("Error in addProduct function", err);
            toast.error("Somenthing went wrong");
        } finally {
            set({loading: false})
        }
    },

    fetchProducts: async () => {
        set({ loading:true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            // on controllers we get set it as data:, entonces aqui la primera data es axios y luego nuestra api
            set({products: response.data.data, error: null})
        } catch (err) {
            if (err.status == 429) set({ error:"Rate limit exceeded", products: []})
            else set({error: "Something went wrong", products: [] })
        } finally {
        set({ loading:false });
        } 
    },

    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/delete/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !== id)}))
            toast.success("Product deleted successfully");
        } catch (err) {
            console.log("Error in deleteProduct function", err);
            toast.error("Something went wrong");
        } finally {
            set({loading: false})
        }
    },

    fetchProduct: async (id) => {
        set({loading: true})
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data,
                error: null,
            });
            
        } catch (err) {
            console.log("Error in fetching product function", err);
            set({
                error: "Something went wrong", currentProduct: null
            });
        } finally {
            set({ loading: false});
        }
    },

    updateProduct: async (id) => {
        set({loading: true});
        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/api/products/update/${id}`, formData);
            set({ currentProduct: response.data.data });
            toast.success("Product successfully updated.")
        } catch (err) {
            console.log("Error in updateProduct function", err)
            toast.error("Something went wrong");
            
        } finally {
            set({loading: false});
        }
    },
}))
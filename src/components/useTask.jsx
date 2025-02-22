import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useTask = () => {
     const {user} = useContext(AuthContext)
      const {data: tasks = [], refetch} = useQuery({
            queryKey: ['tasks', user?.email],
            queryFn: async()=>{
                const res = await axios.get(`${import.meta.env.VITE_baseURL}/tasks/${user?.email}`)
                return res.data
            }
            
        })
    return [tasks, refetch]
};

export default useTask;
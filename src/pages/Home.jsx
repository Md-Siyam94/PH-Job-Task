import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ColumnCard from '../components/ColumnCard';
import { AuthContext } from '../context/AuthProvider';

const Home = () => {
    const {user} = useContext(AuthContext)
    const [columns, setColumns] = useState([])
    const [tasks, setTasks]= useState([]);
    useEffect(()=>{
        axios.get("/column.json")
        .then(res=>{
            // console.log(res.data);
            setColumns(res.data)
        })
        axios.get(`${import.meta.env.VITE_baseURL}/tasks/${user?.email}`)
                .then(res=>{
                    // console.log(res.data);
                    setTasks(res.data)
                })
    },[])
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 pt-16 gap-5 max-w-7xl mx-auto'>
                {
                    columns.map(column=> <ColumnCard key={column?.columnId} column={column} tasks={tasks.filter(task=> task?.status === column.columnTitle)}></ColumnCard>)
                }
            </div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Home;
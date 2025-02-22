import axios from 'axios';
import React, { act, useContext, useEffect, useState } from 'react';
import ColumnCard from '../components/ColumnCard';
import { AuthContext } from '../context/AuthProvider';
import useTask from '../components/useTask';
import { DndContext } from '@dnd-kit/core';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [columns, setColumns] = useState([])
    const [tasks, refetch] = useTask()
    console.log(tasks);
    useEffect(() => {
        axios.get("/column.json")
            .then(res => {

                setColumns(res.data)
            })

    }, [])

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over || !active) return;

        const sourceColumn = active.id;
        const targetColumn = over.id;
        console.log(sourceColumn, targetColumn);
        if (!sourceColumn || !targetColumn || sourceColumn == targetColumn) return

        if (targetColumn == 1) {
            axios.put(`${import.meta.env.VITE_baseURL}/tasks/${sourceColumn}`, { status: "To-Do" })
                .then(res => {
                    console.log(res.data);
                    if (res.data?.modifiedCount > 0) {
                        refetch()
                    }
                })
        }
        if (targetColumn == 2) {
            axios.put(`${import.meta.env.VITE_baseURL}/tasks/${sourceColumn}`, { status: "In Progress" })
                .then(res => {
                    console.log(res.data);
                    if (res.data?.modifiedCount > 0) {
                        refetch()
                    }
                })
        }
        if (targetColumn == 3) {
            axios.put(`${import.meta.env.VITE_baseURL}/tasks/${sourceColumn}`, { status: "Done" })
                .then(res => {
                    console.log(res.data);
                    if (res.data?.modifiedCount > 0) {
                        refetch()
                    }
                })
        }

    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='pt-10 px-8'>
                <div className='py-5 flex justify-between items-center'>
                    <Link to="/add-task"><button className='py-3 px-8 font-semibold flex gap-2 hover:bg-base-200 rounded-full bg-base-100 border' data-tooltip-id="uploadFile">Add Task<IoMdAdd className="text-2xl" /></button></Link>
                    <ReactTooltip id="uploadFile" place="right" content="Add task">

                    </ReactTooltip>


                    {/* <div className='flex gap-2'>
                        <Link  to={"/edit-task"}><button className='py-3 px-8 font-semibold flex gap-2 hover:bg-base-200 rounded-full bg-base-100 border'>Edit <CiEdit className='text-2xl ' /></button></Link>
                        <Link to="/delete-task"><button className='py-3 px-8 font-semibold flex gap-2 hover:bg-base-200 rounded-full bg-base-100 border'>Delete  <AiOutlineDelete className='text-2xl ' /></button></Link>
                    </div> */}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3  gap-5 max-w-7xl mx-auto'>
                    {
                        columns.map(column => <ColumnCard key={column?.id} column={column} refetch={refetch} tasks={tasks.filter(task => task?.status === column.columnTitle)}></ColumnCard>)
                    }
                </div>
            </div>
        </DndContext>
    );
};

export default Home;
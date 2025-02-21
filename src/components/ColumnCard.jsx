import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';



const ColumnCard = ({ column, tasks }) => {
    // console.log(column);
    const { columnTitle } = column || {}
    // const [tasks, setTasks]= useState([]);

    // useEffect(()=>{
    //     axios.get(`${import.meta.env.VITE_baseURL}/tasks`)
    //     .then(res=>{
    //         console.log(res.data);
    //         setTasks(res.data)
    //     })
    // },[])

    const handleDeleteTask = (id) => {


        axios.delete(`${import.meta.env.VITE_baseURL}/tasks/${id}`)
            .then(res => {
                if (res.data?.deleteCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <div className=" max-w-96 ">
            <div className="card border min-h-72">
                <div className="card-body">
                    <h2 className="card-title">{columnTitle}</h2>
                    <div>
                        {
                            tasks.map(task => <div key={task?._id} className="">

                                <div className="p-4 border  rounded-xl mb-2 flex justify-between gap-2 items-center">
                                    <div className="">
                                        <p>{task?.addingTime}</p>
                                        <h2 className="card-title">{task?.title}</h2>
                                        <p>{task?.description}</p>
                                    </div>
                                    <div className=' flex flex-col gap-6 justify-between '>
                                        <button onClick={() => handleEditTask(task?._id)} className='flex-1'>
                                            <CiEdit className='text-2xl text-success' />
                                        </button>
                                        <button onClick={() => handleDeleteTask(task?._id)} className='flex-1'>
                                            <AiOutlineDelete className='text-2xl text-error' />
                                        </button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColumnCard;
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, refetch }) => {
    
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task?._id,
        data: {column:task?.status}
    })

    const style = { 
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined 
    }

    // delete task
    const handleDeleteTask = (id) => {
console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_baseURL}/tasks/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your task has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });

    }
    return (


        <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="px-4 py-2 border  rounded-xl mb-2 flex justify-between gap-2 items-center">
            <div className="">
                <p className='text-sm opacity-50'>{task?.addingTime}</p>
                <h2 className="text-lg font-semibold">{task?.title}</h2>
                <p className='opacity-80'>{task?.description}</p>
            </div>
            <div className=' flex flex-col gap-4 justify-between '>
                <Link >
                    <button className='flex-1 hover:bg-base-200'>
                        <CiEdit className='text-2xl text-success' />
                    </button>
                </Link>
                <button onClick={() => handleDeleteTask(task?._id)} className='flex-1 hover:bg-base-200'>
                    <AiOutlineDelete className='text-2xl text-error' />
                </button>
            </div>
        </div>

    );
};

export default TaskCard;
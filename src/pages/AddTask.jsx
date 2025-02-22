import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { format } from 'date-fns';
const AddTask = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
        const date = new Date();
        const addingDate = format(date, 'dd/MM/yyyy');
        const task = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            title: data?.title,
            description: data.description,
            addingTime: addingDate,
            status: "To-Do"
        }


        axios.post(`${import.meta.env.VITE_baseURL}/tasks`, task)
            .then(res => {
                if(res.data?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task added",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    reset()
                    navigate("/")
                }
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        // console.log(task);
    };

    return (
        <div>
            <div className="mx-auto max-w-screen-2xl bg-base-200 min-h-screen pt-20">
                {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}


                <div className="card bg-base-100 w-full mx-auto max-w-lg shrink-0 shadow-2xl">
                    <h1 className="text-2xl font-semibold pl-8 mt-4">Write and add your task</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name="title" {...register("title", { required: true })} placeholder="Write title" className="input input-bordered " />
                            <div>
                                {errors.title?.type === 'required' && <p className="text-error" role="alert">Write a title!</p>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" {...register("description", { required: true })} name="description" placeholder="Write description" className="input input-bordered" />
                            <div>
                                {errors.description?.type === 'required' && <p className="text-error" role="alert">Write a description!</p>}
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default AddTask;
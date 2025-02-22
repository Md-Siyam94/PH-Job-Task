import React, { useEffect, useState } from 'react';
import useTask from '../components/useTask';
import ColumnCard from '../components/ColumnCard'

const DeleteTask = () => {
    const [columns, setColumns] = useState([])
    const [tasks, refetch] = useTask()
    // console.log(tasks);
    useEffect(() => {
        axios.get("/column.json")
            .then(res => {

                setColumns(res.data)
            })

    }, [])
    return (
        <div>
             <div className='grid grid-cols-1 lg:grid-cols-3  gap-5 max-w-7xl mx-auto'>
                    {
                        columns.map(column => <ColumnCard key={column?.id} column={column} refetch={refetch} tasks={tasks.filter(task => task?.status === column.columnTitle)}></ColumnCard>)
                    }
                </div>
        </div>
    );
};

export default DeleteTask;


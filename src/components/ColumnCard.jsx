
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';



const ColumnCard = ({ column, tasks, refetch }) => {

    const { columnTitle, id} = column || {}
    

    const {setNodeRef} = useDroppable({
            id:column.id
    })

 

    return (
        <div ref={setNodeRef} className=" lg:w-96 w-[95%]  mx-auto">
            <div className="card border min-h-72">
                <div className="card-body">
                    <h2 className="card-title">{columnTitle}</h2>
                    
                    <div>
                        {
                            tasks.map(task => <TaskCard key={task?._id} task={task} refetch={refetch}></TaskCard>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColumnCard;
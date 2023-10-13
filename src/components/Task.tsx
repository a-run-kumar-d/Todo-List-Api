import "../styles/task.css";
import TickIcon from "../assets/Tick-Icon.png"
import CrossIcon from "../assets/Cross-Icon.png"
import { useTaskData } from "../Data/taskDataContext";
type taskProps = {
  id: number,
  title: string,
  isCompleted: boolean,
  updated: string,
  created: string,
  host: number}
export default function task({id, title, isCompleted, updated, created, host }: taskProps) {
  
  const {deleteTask, updateStatus} = useTaskData();
  return (
    <>
      <div className="taskBar">
        {isCompleted === false ? (
          <button className="statusButton" id="ActivedButton" onClick={()=>{
            updateStatus(id)
          }}></button>
        ) : (
          <button className="statusButton" id="CompletedButton" onClick={()=>{
            updateStatus(id)
          }}><img src={TickIcon} id="tick-icon" ></img></button>
        )}

        <div className={`taskDetail ${isCompleted=== true ?'completedState' : ''}`}>{title}</div>
        <button className="deleteButton" onClick={()=>{deleteTask(id)}}><img src={CrossIcon} id="cross-icon"></img></button>
      </div>
    </>
  );
}

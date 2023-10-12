import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useTokenData } from "./dataContext";
import { useTrefreshData } from "./refreshContext";
type TaskDataProvidertype = {
    children: ReactNode;
}
type taskType = {
    id: number,
    title: string,
    isCompleted: boolean,
    updated: string,
    created: string,
    host: number
}
type TaskData = {
    getTasks: (value: string) => taskType[];
    createTask: (task: string) => void;
    deleteTask: (id: number) => void;
    readStatus: (id: number) => boolean|undefined ;
    updateStatus: (id: number) => void;
    deleteMultipleTasks: (ids : number[]) => void;
}
const taskDataContext = createContext({} as TaskData);

export function useTaskData(){
    return useContext(taskDataContext);
}

export function TaskDataProvider({children}: TaskDataProvidertype){
    const {gettrefresh} = useTrefreshData();
    const {gettoken} = useTokenData();
    const [atoken , setAtoken] = useState<string>("");
    const [tasks, setTasks] = useState<taskType[]>([]);
    useEffect((): void => {
         async ()=>{
            const refreshURL = "https://www.mulearn.org/api/v1/mulearn-task/token/refresh/"
            const refreshToken = {refresh : gettrefresh()}
            await axios.post(refreshURL,refreshToken,{
                headers:{
                    "Content-Type": "application/json"
                }
            }).then((res: any)=>{console.log(res)}).catch((err)=>{console.log(err)});
         }
         console.log(atoken);
        //  console.log(axios.get("https://www.mulearn.org/api/v1/mulearn-task/todo/",{
        //     headers: {
        //     "Content-Type": "application/json",
        //     "Authorization" : `Bearer ${atoken}`
        //     }
        // }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)}))
    },[]);
    function getTasks(value: string){
        if(value === "active"){
            return tasks.filter(task => task.isCompleted === true);
        }
        else if(value === "completed"){
            return tasks.filter(task => task.isCompleted === false);
        }
        else{
            return tasks;
        }
    }
    function createTask(task: string){
        const newTask = {title : task}
        console.log(axios.post("https://www.mulearn.org/api/v1/mulearn-task/todo/",newTask,{
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)}))}
    function deleteTask(id: number){
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }
    function readStatus(id: number){
        const task = tasks.find(task => task.id === id);
        return task?.isCompleted;
    }
    function updateStatus(id: number){
        const updatedTasks = tasks.map(task => {
            if(task.id === id){
                return { ...task, status: !task.isCompleted };
            }
            return task;
        })
        setTasks([...updatedTasks]);
    }
    function deleteMultipleTasks(ids: number[]){
        const newTasks = tasks.filter(task => !ids.includes(task.id));
        setTasks([...newTasks]);
    }
    return(
        <taskDataContext.Provider value={{getTasks, createTask , deleteTask, readStatus, updateStatus ,deleteMultipleTasks}}>
            {children}
        </taskDataContext.Provider>   
    )


}
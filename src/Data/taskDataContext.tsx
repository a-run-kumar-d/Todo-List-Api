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
    function getTasks(value: string){
        axios.get("https://www.mulearn.org/api/v1/mulearn-task/todo/",{
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{setTasks(res.data)}).catch((err)=>{console.log(err)})
        if(value === "active"){
            return tasks.filter(task => task.isCompleted === false);
        }
        else if(value === "completed"){
            return tasks.filter(task => task.isCompleted === true);
        }
        else{
            return tasks;
        }
    }
    function createTask(task: string){
        const newTask = {title : task}
        axios.post("https://www.mulearn.org/api/v1/mulearn-task/todo/",newTask,{
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
        getTasks("all");
    }
    function deleteTask(id: number){
        axios.delete(`https://www.mulearn.org/api/v1/mulearn-task/todo/${id}/`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
    }
    function readStatus(id: number){
        const task = tasks.find(task => task.id === id);
        return task?.isCompleted;
    }
    function updateStatus(id: number){
        axios.put(`https://www.mulearn.org/api/v1/mulearn-task/todo/${id}/`,null,{
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
        }
    function deleteMultipleTasks(ids: number[]){
        ids.map((id)=>{
            axios.delete(`https://www.mulearn.org/api/v1/mulearn-task/todo/${id}/`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${gettoken()}`
            }
        }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
        })
    }
    return(
        <taskDataContext.Provider value={{getTasks, createTask , deleteTask, readStatus, updateStatus ,deleteMultipleTasks}}>
            {children}
        </taskDataContext.Provider>   
    )


}
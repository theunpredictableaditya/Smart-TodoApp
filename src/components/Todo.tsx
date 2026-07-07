import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import type { priorityType, task } from "@/types";
import { setInLocalStorage, getFromLocalStorage } from "@/lib/functions";

const Todo = () => {
  const [taskValue, setTaskValue] = useState<string>("");
  const [priorityValue, setPriorityValue] = useState<"High" | "Medium" | "Low">("Medium");
  const [allTasks, setAllTasks] = useState<task[]>([]);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id: string = crypto.randomUUID();
    const newTask: task = {
        id: id,
        isCompleted: false,
        task: taskValue,
        priority: priorityValue
    }

    setAllTasks((prevTask): task[] => {
        const updatedTasks: task[] = [...prevTask, newTask];
        console.log(updatedTasks);
        setInLocalStorage<task[]>("todos", updatedTasks);

        return updatedTasks;
    })

    setTaskValue("");
    setPriorityValue("Medium");
  };

  useEffect(() => {
    const data = getFromLocalStorage<task[]>("todos");

    if(data){
        setAllTasks(data);
        console.log(data);
    } else {
        console.log("Error");
    }
  
  }, [])
  

  return (
    <div className="main-component flex flex-col justify-center items-center gap-2 h-full min-w-2xl">
      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Smart To-Do Application
        </h2>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Clear the Clutter, Get Things Done
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex gap-0.5">
        <Input
          placeholder="Enter Your Tasks Here"
          value={taskValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskValue(event.target.value)
          }
        />
        <Select onValueChange={(value) => setPriorityValue(value as priorityType)}>
            <SelectTrigger className="w-1/5">
                <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
        </Select>
        
        <Button type="submit">Add Task</Button>
      </form>

      <div className="tasks-container w-full border-2 h-128 rounded-lg">
        <div className="task-head w-full flex gap-0.5 mb-0.5">
          <div className="w-1/8 text-center">Completed</div>
          <div className="w-11/20 text-center">Task</div>
          <div className="w-1/8 text-center">Priority</div>
          <div className="w-1/5 text-center">Actions</div>
        </div>
        
        <div className="tasks flex flex-col gap-1 overflow-y-auto">
          <div className="task w-full flex gap-0.5 bg-yellow-100 h-16 ">
            <div className="w-1/8 text-center flex justify-center items-center">
              <Checkbox />
            </div>
            <div className="w-11/20 text-center flex items-center justify-center">Task</div>
            <div className="w-1/8 text-center flex items-center justify-center">
              <Badge className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
                Green
              </Badge>
            </div>
            <div className="w-1/5 text-center flex justify-center gap-8 items-center">
                <div id="edit"><BiSolidEditAlt className="hover"/></div>
                <div id="delete"><AiFillDelete className="hover"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

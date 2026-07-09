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
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import type { priorityType, task } from "@/types";
import {
  setInLocalStorage,
  getFromLocalStorage,
  sortTasks,
} from "@/lib/functions";

const Todo = () => {
  const [taskValue, setTaskValue] = useState<string>("");
  const [updatedTaskValue, setUpdatedTaskValue] = useState<string>("");
  const [currentTaskValue, setCurrentTaskValue] = useState<string>("");
  const [priorityValue, setPriorityValue] = useState<"High" | "Medium" | "Low">(
    "Medium",
  );
  const [updatedPriorityValue, setUpdatedPriorityValue] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [currentPriorityValue, setCurrentPriorityValue] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [allTasks, setAllTasks] = useState<task[]>([]);

  // Drag Item Feature
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id: string = crypto.randomUUID();
    const newTask: task = {
      id: id,
      isCompleted: false,
      task: taskValue,
      priority: priorityValue,
    };

    setAllTasks((prevTask): task[] => {
      const updatedTasks: task[] = [...prevTask, newTask];
      console.log(updatedTasks);
      setInLocalStorage<task[]>("todos", updatedTasks);

      return updatedTasks;
    });

    setTaskValue("");
    setPriorityValue("Medium");
  };

  const handleCheck = (id: string, checked: boolean) => {
    const updatedTask: task[] = allTasks.map((task: task): task => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: checked,
        };
      } else {
        return task;
      }
    });

    setAllTasks(updatedTask);
  };

  const handleDelete = (id: string) => {
    const updatedTask: task[] = allTasks.filter(
      (task: task): boolean => task.id !== id,
    );

    console.log(updatedTask);
    setAllTasks(updatedTask);
  };

  const handleModalOpens = (taskName: string, priority: priorityType) => {
    setCurrentTaskValue(taskName);
    setCurrentPriorityValue(priority);
  };

  const handleEditTask = (id: string) => {
    const updatedTasks = allTasks.map((task: task): task => {
      if (task.id === id) {
        return {
          ...task,
          task: updatedTaskValue || currentTaskValue,
          priority: updatedPriorityValue || currentPriorityValue,
        };
      } else {
        return task;
      }
    });

    setAllTasks(updatedTasks);
  };

  const handleDrop = (targetId: string) => {
    const draggedIndex: number = allTasks.findIndex(
      (task: task): boolean => task.id === draggedItem,
    );
    const targetIndex: number = allTasks.findIndex(
      (task: task): boolean => task.id === targetId,
    );

    const updatedTasks: task[] = [...allTasks];
    const [removed] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, removed);

    setAllTasks(updatedTasks);
  };

  // retrieve the data from localstorage whenever the page loads for first time
  useEffect(() => {
    const data = getFromLocalStorage<task[]>("todos");

    if (data) {
      const newData = sortTasks(data);
      setAllTasks(data);
      console.log(newData);
    } else {
      console.log("Error");
    }
  }, []);

  // change the value inside localstorage whenever the allTask and setAllTask is Manipulated
  useEffect(() => {
    setInLocalStorage("todos", allTasks);
  }, [allTasks, setAllTasks]);

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
        <Select
          onValueChange={(value) => setPriorityValue(value as priorityType)}
        >
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

      <div className="tasks-container w-full border-2 h-96 rounded-lg overflow-hidden flex flex-col">
        <div className="task-head w-full flex gap-0.5 shrink-0 items-center border-b px-2">
          <div className="flex-1 text-center">Completed</div>
          <div className="flex-2 text-center">Task</div>
          <div className="flex-1 text-center">Priority</div>
          <div className="flex-1 text-center">Actions</div>
        </div>

        <div className="tasks flex-1 flex flex-col gap-1 overflow-y-auto">
          {allTasks &&
            allTasks.map((task: task) => (
              <div
                draggable
                onDragStart={(e) => {
                  setDraggedItem(task.id);

                  const img = new Image();
                  img.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...";
                  e.dataTransfer.setDragImage(img, 0, 0);
                }}
                onDragOver={(e: React.DragEvent) => e.preventDefault()}
                onDrop={() => handleDrop(task.id)}
                style={{
                  padding: "10px",
                  margin: "5px 0px",
                  background: draggedItem === task.id ? "gray" : "lightgray",
                  cursor: "grab",
                }}
                className="task w-full flex gap-0.5 bg-yellow-100 h-16 shrink-0"
                key={task.id}
              >
                <div className="flex-1 text-center flex justify-center items-center">
                  <Checkbox
                    className={"border-orange-400"}
                    checked={task.isCompleted}
                    onCheckedChange={(checked) => handleCheck(task.id, checked)}
                  />
                </div>
                <div className="flex-[2] text-center flex items-center justify-center">
                  {task.task}
                </div>
                <div className="flex-1 text-center flex items-center justify-center">
                  <Badge className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex-1 text-center flex justify-center gap-8 items-center">
                  {/* <div id="edit"><BiSolidEditAlt className="hover"/></div> */}

                  <Dialog
                    onOpenChange={() =>
                      handleModalOpens(task.task, task.priority)
                    }
                  >
                    <DialogTrigger>
                      <BiSolidEditAlt className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                          Update task details below.
                        </DialogDescription>
                      </DialogHeader>

                      {/* Old task name (read-only) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Old Task Name
                        </label>
                        <Input value={task.task} disabled />
                      </div>

                      {/* New task name (editable) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          New Task Name
                        </label>
                        <Input
                          placeholder={currentTaskValue}
                          value={updatedTaskValue}
                          defaultValue={task.task}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => setUpdatedTaskValue(event.target.value)}
                        />
                      </div>

                      {/* Old priority (read-only) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Old Priority
                        </label>
                        <Select value={task.priority} disabled>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* New priority (editable) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          New Priority
                        </label>
                        <Select
                          defaultValue={currentPriorityValue}
                          onValueChange={(value) =>
                            setUpdatedPriorityValue(value as priorityType)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <DialogFooter>
                        <Button onClick={() => handleEditTask(task.id)}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div id="delete" className="bg-red">
                    <AiFillDelete
                      className="hover"
                      onClick={() => handleDelete(task.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;

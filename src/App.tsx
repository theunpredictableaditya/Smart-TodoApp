import React, { useState } from "react";
import { GravityStarsBackground } from "./components/animate-ui/components/backgrounds/gravity-stars";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const App = () => {

  const [taskValue, setTaskValue] = useState<string>('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Kya haal hai:", taskValue);
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <GravityStarsBackground />
      </div>
      <div className="main-component flex flex-col justify-center items-center h-full min-w-2xl">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Smart To-Do Application
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
            Clear the Clutter, Get Things Done
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex gap-0.5">
        <Input placeholder="Enter Your Tasks Here" value={taskValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskValue(event.target.value)}/>
        <Button type="submit">Add Task</Button>
        </form>
      </div>
    </div>
  );
};

export default App;

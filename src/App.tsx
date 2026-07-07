import { GravityStarsBackground } from "./components/animate-ui/components/backgrounds/gravity-stars";
import Todo from "./components/Todo";


const App = () => {

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <GravityStarsBackground />
      </div>
      <Todo/>
    </div>
  );
};

export default App;

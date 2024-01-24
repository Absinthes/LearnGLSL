import { Leva } from "leva";
import Index from "./views";

function App() {
  return (
    <>
      <Index />
      <Leva hidden={true || import.meta.env.MODE == "production"} />
    </>
  );
}

export default App;

import BottleReturnMachine from "./BottleReturnMachine";
import { PantProvider } from "./context/PantContext";

export default function App() {
  return (
    <PantProvider>
      <BottleReturnMachine />
    </PantProvider>
  );
}

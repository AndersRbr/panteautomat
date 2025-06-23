import PanteAutomat from "../src/PanteAutomat";
import { PantProvider } from "./context/PantContext";

export default function App() {
  return (
    <PantProvider>
      <PanteAutomat />;
    </PantProvider>
  );
}

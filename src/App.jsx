import { CartProvider } from "./contexts/CartContext";
import { ModeProvider } from "./contexts/ModeContext";
import AppContent from "./components/AppContent";

function App() {
  return (
    <ModeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ModeProvider>
  );
}

export default App;

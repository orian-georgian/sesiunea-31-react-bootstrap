import { CartProvider } from "./contexts/CartContext";
import { ModeProvider } from "./contexts/ModeContext";
import AppContent from "./components/AppContent";

import { Provider } from "react-redux";

import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ModeProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ModeProvider>
    </Provider>
  );
}

export default App;

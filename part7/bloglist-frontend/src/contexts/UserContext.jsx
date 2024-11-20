import { createContext, useReducer, useContext } from 'react';

// Crear el contexto
const UserContext = createContext();

// Reducer para manejar las acciones del usuario
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload; // Establece el usuario logueado
    case 'LOGOUT':
      return null; // Limpia el usuario
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

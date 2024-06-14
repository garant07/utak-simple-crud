import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './states/store';
import { SnackbarProvider } from 'notistack';
import SnackbarSuccessComponent from './components/custom/snackbar-component.tsx';
import Notifier from './components/custom/notifier.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        hideIconVariant={false}
        maxSnack={3}
        autoHideDuration={5000}
        Components={{
          success: SnackbarSuccessComponent
        }}
      >
        <Notifier />
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
)

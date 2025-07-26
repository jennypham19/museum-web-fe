import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './index.css';

//@ts-ignore
import { ClickToComponent } from 'click-to-react-component';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClickToComponent editor='cursor' />
    <BrowserRouter>
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

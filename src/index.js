import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/global/App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

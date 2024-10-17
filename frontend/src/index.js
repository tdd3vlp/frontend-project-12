import { createRoot } from 'react-dom/client';
import init from './init';

const root = createRoot(document.getElementById('root'));
root.render(await init());

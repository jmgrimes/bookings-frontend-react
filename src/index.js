import {
    render
} from 'react-dom';
import {
    BrowserRouter
} from "react-router-dom";
import {
    QueryClient, 
    QueryClientProvider
} from "react-query";

import App from './components/App';

const queryClient = new QueryClient();
const application = (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
);

render(
    application,
    document.getElementById('root')
);
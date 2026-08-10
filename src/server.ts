import {app, PORT} from './app';

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
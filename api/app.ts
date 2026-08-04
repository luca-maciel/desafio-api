
const express:any = require('express');
const app:any = express();
const PORT:number = 8080;

app.use("/", (req:any, res:any)=>{
    res.send("ta funfano");
})


app.listen(PORT, ()=>{
    console.log("Servidor rodando em http://localhost:8081");
});


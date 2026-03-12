import express from "express"; 
const app = express ();

app.get("/", (req, res) => {
res.send({message:"Servidor em Execução", success: true});

});
app.get("/equipe", (req,res) => {
    res.send([
{nome:"Yasmin", curso:"TI"},
{nome:"Emanuelly", curso:"TI"},
{nome:"Marilia", curso:"TI"},
    ]);
});

app.listen(3000, () => {
    console.log("Server running on localhost:3000");
});
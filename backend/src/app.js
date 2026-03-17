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

app.listen(process.env.PORT || 3000, () => {
console.log("Server running on localhost:3000");
});


app.get('/yasmin-emanuelly-marilia/marilia', (req, res) => {
  res.json({
    nome: "Marília",
    matricula: "20251131000302",
    info: "Amo o Corinthians"
  });
});


app.get('/yasmin-emanuelly-marilia/emanuelly', (req, res) => {
  res.json({
    nome: "Emanuelly",
    matricula: "20251131000256",
    info: "Amo o Ceará Sport Club"
  });
});
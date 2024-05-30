const express = require("express");
const router = express.Router();
const dbPacientes = require("../data/pacientes");
const dbMedicos = require("../data/medicos");
const dbConsultas = require("../data/consultas");
const dbConsultasHist = require("../data/consultasHistorico");
const dbCadastro = require("../data/cadastro");

const {register, retorno} = require("../controllers/register");

const {login} = require("../controllers/login");

// router Pacientes
router.get("/pacientes", async (req, res) => {
  const pacientes = await dbPacientes.selectPacientes();
  res.json(pacientes);
});

router.get("/pacientes/:id", async (req, res) => {
  const pacientes = await dbPacientes.selectByIdPacientes(req.params.id);
  res.json(pacientes);
});

router.post("/pacientes", async (req, res) => {
  await dbPacientes.insertPacientes(req.body);
  res.sendStatus(201);
});

router.patch("/pacientes/:id", async (req, res) => {
  await dbPacientes.updatePacientes(req.params.id, req.body);
  res.sendStatus(200);
});

router.delete("/pacientes/:id", async (req, res) => {
  await dbPacientes.deletePacientes(req.params.id);
  res.sendStatus(204);
});

// Router Medicos
router.get("/medicos", async (req, res) => {
  const medico = await dbMedicos.selectMedicos();
  res.json(medico);
});

router.get("/medicos/:id", async (req, res) => {
  const medicos = await dbMedicos.selectByIdMedicos(req.params.id);
  res.json(medicos);
});

router.post("/medicos", async (req, res) => {
  await dbMedicos.insertMedicos(req.body);
  res.sendStatus(201);
});

router.patch("/medicos/:id", async (req, res) => {
  await dbMedicos.updateMedicos(req.params.id, req.body);
  res.sendStatus(200);
});

router.delete("/medicos/:id", async (req, res) => {
  await dbMedicos.deleteMedicos(req.params.id);
  res.sendStatus(204);
});

// router consultas
router.get("/consultas", async (req, res) => {
  const consultas = await dbConsultas.selectAllConsultas();
  res.json(consultas);
});

router.get("/consultas/futuras", async (req, res) => {
  const consultas = await dbConsultas.selectConsultasFuturas();
  res.json(consultas);
});

router.get("/consultas/medico/:id", async (req, res) => {
  const consultas = await dbConsultas.selectConsultasPorMedico(req.params.id);
  res.json(consultas);
});

router.get("/consultas/paciente/:id", async (req, res) => {
  const consultas = await dbConsultas.selectConsultasPorPaciente(req.params.id);
  res.json(consultas);
});

router.get(
  "/consultas/medicoepaciente/:idmedico&:idpaciente",
  async (req, res) => {
    const consultas = await dbConsultas.selectConsultasPorPacienteEMedico(
      req.params.idmedico,
      req.params.idpaciente
    );
    res.json(consultas);
  }
);

router.post("/consultas", async (req, res) => {
  await dbConsultas.insertConsultas(req.body);
  res.sendStatus(201);
});

router.patch("/consultas/:id", async (req, res) => {
  await dbConsultas.updateConsultas(req.params.id, req.body);
  res.sendStatus(200);
});

router.delete("/consultas/:id", async (req, res) => {
  await dbConsultas.deleteConsultas(req.params.id);
  res.sendStatus(204);
});

// router historico
router.get("/historico", async (req, res) => {
  const historico = await dbConsultasHist.selectConsultaHistorica();
  res.json(historico);
});

router.get("/historico/:id", async (req, res) => {
  const historico = await dbConsultasHist.selectByIdConsultaHistorica(
    req.params.id
  );
  res.json(historico);
});

router.post("/historico", async (req, res) => {
  await dbConsultasHist.insertConsultaHistorica(req.body);
  res.sendStatus(201);
});

router.patch("/historico/:id", async (req, res) => {
  await dbConsultasHist.updateConsultaHistorica(req.params.id, req.body);
  res.sendStatus(200);
});

router.delete("/historico/:id", async (req, res) => {
  await dbConsultasHist.deleteconsultaHistorica(req.params.id);
  res.sendStatus(204);
});

// router usuario
router.get("/cadastro", async (req, res) => {
  const usuario = await dbCadastro.selectCadastro();
  res.json(usuario);
});

router.get("/usuario/:id", async (req, res) => {
  const usuario = await dbCadastro.selectByIdUsuario(req.params.id);
  res.json(usuario);
});


router.patch("/usuario/:id", async (req, res) => {
  await dbCadastro.updateUsuario(req.params.id, req.body);
  res.sendStatus(200);
});

router.delete("/usuario/:id", async (req, res) => {
  await dbCadastro.deleteUsuario(req.params.id);
  res.sendStatus(204);
});

router.post('/cadastro' , register); //POST request to register the user

router.post('/login' , login); // POST request to login the user

module.exports = router;

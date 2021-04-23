const { Router } = require('express');
const router = Router();
const transaccion = require("../controllers/preTransaccion.controller");

router.get("/pre_transacciones/inicializar",(req,res)=>{
    res.json({"mensaje":"get no permitido"})
})

router.post("/pre_transacciones/inicializar/:codigoEmpresa/:tipoPreTransaccion",transaccion.inicializar);


module.exports = router;

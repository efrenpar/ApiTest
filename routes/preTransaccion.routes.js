const { Router } = require('express');
const router = Router();
const preTrans = require("../controllers/preTransaccion.controller");

router.get("/pre_transacciones/inicializar",(req,res)=>{
    res.json({"mensaje":"get no permitido"})
})

router.post("/pre_transacciones/inicializar/:codigoEmpresa/:tipoPreTransaccion",preTrans.crear);


module.exports = router;

const nemo = {
	CAJA: 1 ,
	KIOSKO: 2,
}
var response={
    code: 401,
    success: false,
    message: "Las cedenciales de autenticación no son válidas.",
    Data: []
}

const data={
    secuencia:"",
    codigoE:"",
    codigoU:"",
    activo:'',
    usuarioI: '',
    codigoPre:'',
    nemo:'',
    tipo:'FACTURA',
    codse: null,
    codca:null,
    numPE:null,
}

exports.nemo = nemo;
exports.response = response;
exports.data = data;
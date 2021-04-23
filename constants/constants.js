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

const tipo=["COTIZACION","FACTURA"]

setResponse = (code,succes,message,data)=>{

    var response = {
        code:code,
        succes:succes,
        message:message,
        data:data
    }

    return response;
}

exports.nemo = nemo;
exports.response = response;
exports.data = data;
exports.setResponse = setResponse;
exports.tipo = tipo;
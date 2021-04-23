const nemonicoCanalFacturacion = {
	CAJA: 1 ,
	KIOSKO: 2,
}
var mensaje={
    code: 401,
    success: false,
    message: "",
    data: []
}

const model={
    secuenciaUsuario:"",
    codigoEmpresa:"",
    codigoUsuario:"",
    activo:'',
    usuarioIngreso: '',
    codigoPreTrans:'',
    nemonicoCanalFacturacion:'',
    tipo:'',
}

const tipo=["COTIZACION","FACTURA"]

setResponse = (code,succes,message,data)=>{

    var mensaje = {
        code:code,
        succes:succes,
        message:message,
        data:data
    }

    return mensaje;
}

const idorganizacion = "365509c8-9596-4506-a5b3-487782d5876e";

const application = "UEhBTlRPTVhfV0VC";

exports.nemonicoCanalFacturacion = nemonicoCanalFacturacion;
exports.mensaje = mensaje;
exports.model = model;
exports.setResponse = setResponse;
exports.tipo = tipo;
exports.application = application;
exports.idorganizacion = idorganizacion;
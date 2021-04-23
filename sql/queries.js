
getUsuario = (secuencia)=>{
   return  `select * from latino_owner.Dafx_Usuarios_Sistema 
    where SECUENCIA_USUARIO =${secuencia}`;
}


getEmpresas = (codigo)=>{
    return `select CODIGO_EMPRESA from latino_owner.Daf_Empresas 
    where CODIGO_EMPRESA =${codigo}`;
}

getSecuenciaTransaccion = ()=>{
    
    return `select latino_owner.FAC_SEQ_PRE_TRANSACCIONES.Nextval 
    from dual`;
}

insertTransaccionSinCaja = ()=>{
    return `INSERT into latino_owner.Fac_Pre_Transacciones(CODIGO_PRE_TRANSACCION,
    CODIGO_EMPRESA,SECUENCIA_USUARIO,CODIGO_USUARIO,TIPO_PRE_TRANSACCION,
    CODIGO_CANAL_FACTURACION,ES_ACTIVO,SECUENCIA_USUARIO_INGRESO,USUARIO_INGRESO,
    FECHA_INGRESO) values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)`;
}

insertTransaccionConCaja = ()=>{
    return `INSERT into latino_owner.Fac_Pre_Transacciones(CODIGO_PRE_TRANSACCION,
    CODIGO_EMPRESA,CODIGO_SUCURSAL,CODIGO_CAJA,NUMERO_PUNTO_EMISION,SECUENCIA_USUARIO,
    CODIGO_USUARIO,TIPO_PRE_TRANSACCION,CODIGO_CANAL_FACTURACION,ES_ACTIVO,SECUENCIA_USUARIO_INGRESO,
    USUARIO_INGRESO,FECHA_INGRESO) values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12)`
}


exports.getUsuario = getUsuario;
exports.getEmpresas = getEmpresas;
exports.getSecuenciaTransaccion = getSecuenciaTransaccion;
exports.insertTransaccionSinCaja = insertTransaccionSinCaja;
exports.insertTransaccionConCaja = insertTransaccionConCaja;
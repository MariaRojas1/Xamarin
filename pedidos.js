const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/listar', async (req, res)=>{
    
    const sql = `SELECT produc.codigo, produc.nombre, usua.nombre, usua.cedula, pe.cantidad, pe.valor
                FROM pedidos pe, usuarios usua, productos produc
                WHERE usua.id = pe.id_usuario AND produc.id = pe.id_producto `; 
    const pedidos = await pool.query(sql);
    res.json(pedidos);
});


router.post('/crear', async (req, res)=>{
    const datos = {
        id_productos: req.body.id_productos,
        id_productos:  req.body.id_productos,
        id_usuarios:   req.body.id_usuarios,
        valor:  req.body.valor,
        cantidad:   req.body.cantidad
    }
    const sql = `INSERT INTO pedidos SET ? `; 
    const productos = await pool.query(sql, datos);
    res.json(productos);
});


router.post('/crear', async (req, res)=>{
    const datos = {
        id_pedido: req.body.id_pedido,
        id_productos: req.body.id_productos,
        id_usuarios:   req.body.id_usuarios,
        valor:  req.body.valor,
        cantidad:   req.body.cantidad
    }
    const sql = `UPDATE pedidos SET id_productos = ${id_productos} , 
    id_usuarios =  ${id_usuarios} , valor = ${valor} , cantidad = ${cantidad}
    WHERE id = ${id_pedido}  `; 
    const productos = await pool.query(sql);
    res.json(productos);
});


router.delete('/eliminar/:id', async (req, res)=>{

    // esta es otra forma de pasarle parametros a la consulta
    const sql = `DELETE FROM pedidos WHERE id  = ${req.params.id} `; 
    const productos = await pool.query(sql);
    res.sendStatus(200);
});




module.exports = router;
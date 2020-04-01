const express= require('express');
const router= express.Router();
const pool= require('../database');

router.get('/listar_productos',async(req,res)=>{
    const sql= 'select * from productos';
    const productos=await pool.query(sql)
    res.json(productos);
});

router.post('/crear',async(req,res)=>{
    console.log(req.body);
    const datos={
        nombre:req.body.nombre,
        valor:req.body.valor,
        codigo:req.body.codigo,
        url_img:req.body.url_img
    }
    const sql = 'INSERT INTO usuarios SET ?'
    await pool.query(sql, datos);
    res.sendStatus(200);
    
});

router.put('/editar', async(req,res)=>{
    const sql ='UPDATE usuario SET nombre = ?, valor=?, codigo=?, url_img =? WHERE id = ?';
    await pool.query(sql,[
        req.body.nombre,
        req.body.valor,
        req.body.codigo,
        req.body.url_img,
        req.body.id]);
    res.sendStatus(200);
});

router.delete('/eliminar/:id', async(req,res)=>{
    const sql ='DELETE FROM productos WHERE id = ?';
    await pool.query(sql, req.params.id);
    res.sendStatus(200);
});

router.get('/:id',async(req,res)=>{
    const {id} =req.params;
    const productosId = await pool.query('SELECT * FROM productos WHERE id = ?',[id]);
    res.status(200).json(productosId);
});

module.exports = router;
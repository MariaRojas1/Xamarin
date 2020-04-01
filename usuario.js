const express= require('express');
const router= express.Router();
const pool= require('../database');

router.get('/listar_usuario',async(req,res)=>{
    const sql= 'select * from usuario';
    const usuario=await pool.query(sql)
    res.json(usuario);
});

router.post('/crear_usuario',async(req,res)=>{
    console.log(req.body);
    const datos={
        nombre:req.body.nombre,
        user:req.body.user,
        pass:req.body.pass
    }
    const sql = 'INSERT INTO usuarios SET ?'
    await pool.query(sql, datos);
    res.sendStatus(200);
    
});

router.put('/editar', async(req,res)=>{
    const sql ='UPDATE usuario SET nombre = ?, edad=?, pass=?, correo =? WHERE id = ?';
    await pool.query(sql,[
        req.body.nombre,
        req.body.edad,
        req.body.pass,
        req.body.correo,
        req.body.id]);
    res.sendStatus(200);
});

router.delete('/eliminar/:id', async(req,res)=>{
    const sql ='DELETE FROM usuarios WHERE id = ?';
    await pool.query(sql, req.params.id);
    res.sendStatus(200);
});

router.get('/:id',async(req,res)=>{
    const {id} =req.params;
    const usuarioId = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id]);
    res.status(200).json(usuarioId);
});

module.exports = router;
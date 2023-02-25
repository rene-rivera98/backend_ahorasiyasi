const { Router } = require('express');
const {
    insumosGet,
    insumosPost,
    insumosPut,
    insumosDelete } = require('../controllers/insumos');
const { validarJWT } = require('../middlewares/validate-JWT');
const { isAdminRol } = require('../middlewares/validate-roles');
const { validarCampos } = require('../middlewares/validate-campos');
const { check } = require('express-validator');

const router = Router();


router.get('/', validarJWT, insumosGet)

router.post('/', [
    validarJWT,
    isAdminRol,
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('codigo_barras', 'El codigo de barras es obligario').notEmpty(),
    check('precio_compra', 'El precio de compra es obligario').notEmpty(),
    check('unidad_medida', 'La unidad de medida es obligario').notEmpty(),
    check('id_proveedor', 'El proveedor es obligario').notEmpty(),
    check('id_departamento', 'El departamento es obligario').notEmpty(),
    validarCampos
], insumosPost)

router.put('/', [
    validarJWT,
    isAdminRol,
    check('codigo_barras', 'Tienes que enviar el codigo de barras del insumo a actulizar').notEmpty(),
    validarCampos
], insumosPut)

router.delete('/', [
    validarJWT,
    isAdminRol,
    check('codigo_barras', 'Tienes que enviar el codigo de barras del insumo a eliminar').notEmpty(),
    validarCampos
], insumosDelete)

module.exports = router; 
const { response, request } = require('express')
const Product = require('../models/products')


const productsGet = async (req = request, res = response) => {

    const { codigo_barras, id_proveedor } = req.query

    try {

        if (codigo_barras) {

            const product = await Product.findOne({ where: { codigo_barras } })

            if (!product) {
                return res.status(404).json({
                    error: `No existe Producto con el codigo de barras ${codigo_barras}`,
                })
            }

            return res.status(200).json({
                msg: 'Consulta exitosa',
                product
            })
        }

        if (id_proveedor) {

            const products = await Product.findAll({ where: { id_proveedor, estado: true  } })

            if (products.length === 0) {
                return res.status(404).json({
                    error: `No existe producto con el proveedor ${id_proveedor}`,
                })
            }

            return res.status(200).json({
                msg: 'Consulta exitosa',
                products
            })
        }

        const products = await Product.findAll({
            where: {
                estado: true
            }
        })

        res.status(200).json({
            msg: 'Consulta exitosa',
            products
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }

}

const productsPost = async (req = request, res = response) => {


    const {
        nombre,
        precio_venta,
        precio_compra,
        tamanio,
        codigo_barras,
        id_proveedor,
        id_departamento,
    } = req.body

    try {

        const product = new Product({
            nombre,
            precio_venta,
            precio_compra,
            codigo_barras,
            tamanio,
            id_proveedor,
            id_departamento,
        })


        await product.save()

        res.status(200).json({
            msg: 'Producto guardado correctamente',
            product
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }
}


const productsPut = async (req = request, res = response) => {

    const { codigo_barras, estado, stock, ...resto } = req.body

    try {

         //Validar que el codigo de barras exista
        const producto = await Product.findOne({ where: { codigo_barras } })

        if (!producto) {
            return res.status(404).json({
                error: `No existe un producto con el codigo de barras ${codigo_barras}`
            })
        }

        //Validar que no este eliminado
        if (!producto.estatus) {
            return res.status(404).json({
                error: `No existe un producto con el codigo de barras ${codigo_barras} (eliminado)`
            })
        }

        if (stock) {
            return res.status(400).json('Aqui no se puede actulizar el stock')
        }

        if (estado) {
            return res.status(400).json('Aqui no se puede actulizar el estado')
        }

        //Validar que no venga vacio
        if (Object.keys(resto).length === 0) {
            return res.status(400).json({
                error: `No se recibieron parametros para actulizar`
            })
        }

        //Actualizar prodcucto
        await Product.update({
            ...resto  // los campos a actualizar que manden
        }, {
            where: {
                codigo_barras  // el id a buscar
            },
        })

        res.status(200).json({
            msg: `Campos actulizados correctamente`,
            //Que devuleva los campos actulizados
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }

}

const productsDelete = async (req = request, res = response) => {

    const { codigo_barras } = req.body;

    try {

        const product = await Product.findOne({ where: { codigo_barras } })

        //Validar que exista el producto a eliminar
        if (!product) {
            return res.status(400).json({
                error: 'El producto que desea eliminar no existe',
            })
        }

        //Validar que el producto no este eliminado
        if (!product.estado) {
            return res.status(400).json({
                error: 'El producto que desea eliminar ya habia sido eliminado',
            })
        }


        //Eliminacion logica del producto
        await Product.update({ estado: false }, {
            where: { codigo_barras }
        });


        res.status(200).json(`El producto ${product.nombre} ha sido elimnado`)

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }


}

module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsDelete
};
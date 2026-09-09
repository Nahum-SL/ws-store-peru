class ProductoDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.categoria = data.categoria;
        this.descripcion = data.descripcion;
        this.garantia = data.garantia;
        this.precio = data.precio;
        this.stock = data.stock;
    }

    validar() {
        if (!this.nombre || typeof this.nombre !== "string") {
            return "El nombre es obligatorio";
        }

        if (!this.categoria || typeof this.categoria !== "string") {
            return "La categoría es obligatoria";
        }

        if (!this.descripcion || typeof this.descripcion !== "string") {
            return "La descripción es obligatoria";
        }

        if (typeof this.garantia !== "number" || this.garantia < 0) {
            return "La garantia no es valida";
        }

        if (typeof this.precio !== "number" || this.precio < 0) {
            return "El precio no es valido";
        }

        if (typeof this.stock !== "number" || this.stock < 0) {
            return "El stock no es valido";
        }

        return null;
    }
}

module.exports = ProductoDTO;
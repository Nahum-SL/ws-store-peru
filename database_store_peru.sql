CREATE DATABASE store_peru;
USE store_peru;

CREATE TABLE Productos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(70) NOT NULL,
    categoria VARCHAR(70) NOT NULL,    
    descripcion VARCHAR(70) NOT NULL,
    garantia TINYINT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock TINYINT NOT NULL,
    create_at 	DATETIME 		NOT NULL DEFAULT NOW(),
    update_at	DATETIME		NULL    
) ENGINE = INNODB;

INSERT INTO Productos (nombre, categoria, descripcion, garantia, precio, stock) VALUES
('Laptop Gamer Asus TUF F15', 'Laptops', 'Intel Core i5, 16GB RAM, 512GB SSD, RTX 3050', 12, 3499.90, 15),
('Smartphone Samsung Galaxy S23', 'Celulares', '128GB almacenamiento, 8GB RAM, Pantalla Dynamic AMOLED', 12, 2899.00, 25),
('Monitor LG UltraGear 24"', 'Monitores', 'Full HD, 144Hz, 1ms respuesta, IPS', 24, 689.50, 30),
('Teclado Mecánico Redragon Kumara', 'Accesorios', 'Switches Red, Retroiluminación RGB, distribución español', 6, 179.90, 50),
('Mouse Logi MX Master 3S', 'Accesorios', 'Sensor 8K DPI, silencioso, conectividad Bluetooth', 12, 429.00, 20),
('Audífonos Sony WH-1000XM5', 'Audio', 'Cancelación de ruido activa, hasta 30h de batería', 12, 1299.00, 10),
('Disco Duro Externo WD Elements 2TB', 'Almacenamiento', 'USB 3.0, portatil, compatible con Windows y Mac', 12, 269.90, 40),
('Silla Gamer Antryx Xtreme', 'Muebles', 'Reclinable 180°, cojines lumbar y cervical, cuero PU', 6, 599.00, 8),
('Impresora Epson EcoTank L3250', 'Impresoras', 'Multifuncional Wi-Fi, sistema continuo de tinta', 12, 749.00, 18),
('Tablet Xiaomi Pad 6', 'Tablets', '11 pulgadas 144Hz, Snapdragon 870, 128GB', 12, 1199.90, 12);

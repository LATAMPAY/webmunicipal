-- Crear tabla de noticias
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL
);

-- Crear tabla de eventos
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Crear tabla de servicios
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    url TEXT NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO news (title, description, image_url, author, category)
VALUES 
    ('Nueva Plaza Saludable', 'Inauguramos un nuevo espacio para el deporte y la recreación en el barrio...', '/images/noticias/noticia1.svg', 'Municipalidad', 'Infraestructura'),
    ('Programa de Reciclaje', 'Nuevo sistema de recolección diferenciada de residuos...', '/images/noticias/noticia2.svg', 'Municipalidad', 'Medio Ambiente'),
    ('Festival Cultural', 'Gran evento artístico en la plaza central con artistas locales...', '/images/noticias/noticia3.svg', 'Municipalidad', 'Cultura');

INSERT INTO events (title, description, start_date, end_date, location, image_url)
VALUES 
    ('Feria Gastronómica', 'Gran feria de comidas típicas y artesanías...', NOW(), NOW() + INTERVAL '3 days', 'Plaza Central', '/images/eventos/feria.jpg'),
    ('Concierto al Aire Libre', 'Presentación de bandas locales...', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '4 hours', 'Anfiteatro Municipal', '/images/eventos/concierto.jpg');

INSERT INTO services (title, description, icon, category, url)
VALUES 
    ('Pago de Impuestos', 'Realiza el pago de tus impuestos municipales en línea', 'tax', 'Financiero', '/servicios/pagos'),
    ('Licencia de Conducir', 'Solicita o renueva tu licencia de conducir', 'car', 'Trámites', '/servicios/licencias'),
    ('Certificado de Residencia', 'Obtén tu certificado de residencia', 'home', 'Documentación', '/servicios/certificados'); 
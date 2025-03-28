import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { encrypt } from '../lib/auth/auth';

async function main() {
  try {
    // Verificar conexión a la base de datos
    console.log('Verificando conexión a la base de datos...');
    await sql`SELECT 1`;
    console.log('Conexión exitosa.');

    const db = drizzle(sql);

    // Verificar si las tablas ya existen
    console.log('Verificando estructura de la base de datos...');
    const tablesExist = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `;

    if (!tablesExist.rows[0].exists) {
      console.log('Iniciando migración de la base de datos...');
      await migrate(db, { migrationsFolder: './lib/db/migrations' });
      console.log('Migración completada.');
    } else {
      console.log('Las tablas ya existen, omitiendo migración.');
    }

    // Verificar si el usuario admin ya existe
    const adminExists = await sql`
      SELECT EXISTS (
        SELECT FROM users 
        WHERE email = 'admin@municipalidad.gob.ar'
      );
    `;

    if (!adminExists.rows[0].exists) {
      console.log('Creando usuario administrador...');
      const adminPassword = await encrypt('admin123456');
      await sql`
        INSERT INTO users (
          name, email, password, role, dni, is_active, notification_preferences
        ) VALUES (
          'Administrador',
          'admin@municipalidad.gob.ar',
          ${adminPassword},
          'admin',
          '00000000',
          true,
          '{"email":true,"sms":false,"whatsapp":false}'
        );
      `;
      console.log('Usuario administrador creado.');
    } else {
      console.log('El usuario administrador ya existe.');
    }

    console.log('Configuración de la base de datos completada.');
  } catch (error) {
    console.error('Error durante la configuración:', error);
    if (error.message?.includes('connection')) {
      console.error('Error de conexión a la base de datos. Verifica las variables de entorno.');
    }
    process.exit(1);
  }
}

main(); 
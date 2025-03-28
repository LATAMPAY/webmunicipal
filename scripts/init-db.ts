import { encrypt } from '../lib/auth/auth'
import db, { users } from '../lib/db/schema'

async function initializeDatabase() {
  try {
    // Crear usuario administrador
    const adminPassword = await encrypt('admin123456')
    await db.insert(users).values({
      name: 'Administrador',
      email: 'admin@municipalidad.gob.ar',
      password: adminPassword,
      role: 'admin',
      dni: '00000000',
      isActive: true,
      notificationPreferences: {
        email: true,
        sms: false,
        whatsapp: false
      }
    })

    console.log('Base de datos inicializada correctamente')
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error)
  }
}

initializeDatabase() 
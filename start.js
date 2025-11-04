#!/usr/bin/env node

/**
 * Script universal para ejecutar Frontend + Backend
 * Funciona desde cualquier directorio del proyecto
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Detectar si estamos en Windows
const isWindows = os.platform() === 'win32';

// Detectar directorio actual
let currentDir = process.cwd();
let projectRoot = currentDir;

// Si estamos en frontend o backend, subir al directorio padre
if (currentDir.endsWith('frontend') || currentDir.endsWith('backend')) {
    projectRoot = path.dirname(currentDir);
}

// Verificar que existen los directorios
const frontendDir = path.join(projectRoot, 'frontend');
const backendDir = path.join(projectRoot, 'backend');

if (!fs.existsSync(frontendDir)) {
    console.error('❌ No se encontró carpeta frontend');
    console.error(`Buscando en: ${frontendDir}`);
    process.exit(1);
}

if (!fs.existsSync(backendDir)) {
    console.error('❌ No se encontró carpeta backend');
    console.error(`Buscando en: ${backendDir}`);
    process.exit(1);
}

console.log('\n╔════════════════════════════════════════════════════════════════════╗');
console.log('║                                                                    ║');
console.log('║         🚀 INICIANDO FRONTEND + BACKEND                          ║');
console.log('║                                                                    ║');
console.log('╚════════════════════════════════════════════════════════════════════╝\n');

console.log('📁 Directorio raíz:', projectRoot);
console.log('🎨 Frontend:', frontendDir);
console.log('⚙️  Backend:', backendDir);
console.log('\n');

// Configurar procesos
let frontendProcess;
let backendProcess;

// Función para manejar salida de procesos
function createLogger(prefix, color) {
    return (data) => {
        const lines = data.toString().split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                console.log(`${color}${prefix}${line}\x1b[0m`);
            }
        });
    };
}

// Iniciar Frontend
console.log('▶️  Iniciando Frontend (Vite)...');
frontendProcess = spawn(isWindows ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    cwd: frontendDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: isWindows
});

frontendProcess.stdout.on('data', createLogger('[Frontend] ', '\x1b[36m'));
frontendProcess.stderr.on('data', createLogger('[Frontend] ', '\x1b[36m'));

// Esperar un poco antes de iniciar backend
setTimeout(() => {
    console.log('\n▶️  Iniciando Backend (Flask)...\n');
    
    // Iniciar Backend
    const pythonCmd = isWindows ? 'python' : 'python3';
    backendProcess = spawn(pythonCmd, ['app.py'], {
        cwd: backendDir,
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: isWindows
    });

    backendProcess.stdout.on('data', createLogger('[Backend]  ', '\x1b[33m'));
    backendProcess.stderr.on('data', createLogger('[Backend]  ', '\x1b[33m'));

    backendProcess.on('error', (err) => {
        console.error('\n❌ Error iniciando Backend:', err.message);
        console.error('Asegúrate de que Python 3.8+ está instalado');
        console.error('Intenta ejecutar: pip install flask flask-cors');
    });

}, 2000);

frontendProcess.on('error', (err) => {
    console.error('\n❌ Error iniciando Frontend:', err.message);
    console.error('Asegúrate de que npm install se ejecutó en la carpeta frontend');
});

// Mostrar URLs
setTimeout(() => {
    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                   ✅ SISTEMAS ACTIVOS                            ║');
    console.log('╠════════════════════════════════════════════════════════════════════╣');
    console.log('║                                                                    ║');
    console.log('║  🎨 Frontend:  http://localhost:3000                             ║');
    console.log('║  ⚙️  Backend:   http://localhost:5000                             ║');
    console.log('║  📚 Docs API:  http://localhost:5000/api/v1/docs                 ║');
    console.log('║  🏥 Health:    http://localhost:5000/api/v1/health               ║');
    console.log('║                                                                    ║');
    console.log('╠════════════════════════════════════════════════════════════════════╣');
    console.log('║  Para detener:  Presiona Ctrl+C                                   ║');
    console.log('║  Proyecto:      Portafolio Cristian Durán                         ║');
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');
}, 3000);

// Manejo de señales (Ctrl+C)
process.on('SIGINT', () => {
    console.log('\n\n🛑 Deteniendo servicios...\n');
    
    if (frontendProcess) {
        frontendProcess.kill();
    }
    if (backendProcess) {
        backendProcess.kill();
    }
    
    setTimeout(() => {
        console.log('✅ Servicios detenidos correctamente\n');
        process.exit(0);
    }, 500);
});

// Manejo de errores global
process.on('uncaughtException', (err) => {
    console.error('❌ Error no capturado:', err);
    
    if (frontendProcess) frontendProcess.kill();
    if (backendProcess) backendProcess.kill();
    
    process.exit(1);
});
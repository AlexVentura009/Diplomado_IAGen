// --- CONFIGURACIÓN DE CARGA MODULAR ---

async function loadSection(sectionId) {
    const contentArea = document.getElementById('dynamic-content');
    
    // Limpiamos el área y ponemos un loader sencillo
    contentArea.innerHTML = '<div style="text-align:center; padding:2rem;">Cargando sección...</div>';

    try {
        // Usamos los nombres exactos de tus archivos en español
        const response = await fetch(`secciones/${sectionId}.html`);
        
        if (!response.ok) {
            throw new Error(`No se encontró el archivo: ${sectionId}.html`);
        }

        const html = await response.text();
        contentArea.innerHTML = html;

        // --- RE-INICIALIZAR LOGICA SEGÚN LA SECCIÓN ---
        if (sectionId === 'instructores') {
            initInstructorModals();
        }
        if (sectionId === 'modulos') {
            initModulesNav();
        }
        if (sectionId === 'perfiles') {
            initAccordions();
        }

    } catch (error) {
        console.error("Error de carga:", error);
        contentArea.innerHTML = `
            <div style="color:red; text-align:center; padding:2rem;">
                <h3>¡Chin, Alexin! Algo salió mal.</h3>
                <p>Asegúrate de que el archivo <b>secciones/${sectionId}.html</b> exista en tu OneDrive.</p>
            </div>`;
    }
}

// --- NAVEGACIÓN PRINCIPAL (INDEX) ---

document.querySelectorAll('.nav-item-executive').forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar clase activa de todos
        document.querySelectorAll('.nav-item-executive').forEach(i => i.classList.remove('active'));
        // Poner clase activa al seleccionado
        btn.classList.add('active');
        // Cargar la sección correspondiente
        const section = btn.getAttribute('data-section');
        loadSection(section);
    });
});

// Cargar "descripcion" por defecto al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    loadSection('descripcion').then(() => {
        initCountdown();
    });
});

// --- FUNCIONES DE INTERACTIVIDAD (PIEZAS DEL ROMPECABEZAS) ---

// 1. Modales de Instructores
function initInstructorModals() {
    const instructorsData = {
        '1': { name: 'Lic. Alejandro Ventura Castellanos', module: 'Módulo 5: Protección de Datos, Evaluación y Analítica con IAGen', expertise: 'Especialista en IAGen y Learning Analytics', bio: 'Especialista con más de 10 años de experiencia en la implementación de sistemas de información...' },
        '2': { name: 'Mtro. Martín Sánchez Islas', module: 'Módulo 4: Agentes Educativos y Chatbots', expertise: 'Especialista en Agentes Educativos', bio: 'Pionero en el desarrollo de agentes educativos inteligentes...' },
        '3': { name: 'Mtra. Priscila Abigail Hernández Briceño', module: 'Módulo 3: Creación de Recursos Digitales Educativos', expertise: 'Especialista en Diseño de Recursos Digitales', bio: 'Licenciada en Tecnología Educativa y Maestra en Educación...' },
        '4': { name: 'Mtra. Kenia Viridiana Ocampo Bera', module: 'Módulo 1: Fundamentos y Ética de la IAGen', expertise: 'Especialista en Diseño de Recursos Digitales', bio: 'Licenciada en Ciencias de la Educación...' },
        '5': { name: 'Mtra. Selene Jiménez Penago', module: 'Módulo 2: Metodologías de Prompts', expertise: 'Especialista en Diseño de Recursos Digitales', bio: 'Licenciada en Ciencias de la Educación y Maestra en Educación...' },
        '6': { name: 'Mtro. Jonathan Contreras Cabrera', module: 'Módulo 6: Taller de Proyectos Inclusivos, Sostenibles y Éticos con IAGen', expertise: 'Especialista en Diseño de Recursos Educativos', bio: 'Maestro en Educación con énfasis en Tecnología Educativa...' }
    };

    const modal = document.getElementById('instructorModal');
    const closeBtn = document.getElementById('modalClose');

    document.querySelectorAll('.instructor-card-executive').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-instructor');
            const inst = instructorsData[id];
            
            document.getElementById('modalInstructorName').textContent = inst.name;
            document.getElementById('modalInstructorExpertise').textContent = inst.expertise;
            document.getElementById('modalInstructorModule').textContent = inst.module;
            document.getElementById('modalInstructorBio').innerHTML = `<p>${inst.bio}</p>`;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
}

// 2. Navegación de Módulos (Sub-menú)
function initModulesNav() {
    const modButtons = document.querySelectorAll('.module-nav-executive');
    const modContents = document.querySelectorAll('.module-content-executive');

    modButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modButtons.forEach(b => b.classList.remove('active'));
            modContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const modId = btn.getAttribute('data-module');
            document.getElementById(modId).classList.add('active');
        });
    });
}

// 3. Acordeones de Perfiles
function initAccordions() {
    document.querySelectorAll('.accordion-header-executive').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}
function initCountdown() {
    const targetDate = new Date("June 1, 2026 09:00:00").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            const container = document.querySelector('.countdown-container-executive');
            if(container) container.innerHTML = "<h3>¡El Diplomado ha iniciado!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        } else {
            // Si el usuario cambió de sección, detenemos este intervalo temporalmente
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Actualiza tu función loadSection para que arranque el contador cuando cargue 'descripcion'
// Busca la parte donde ya tienes los otros "if" y agrega este:
/*
    if (sectionId === 'descripcion') {
        initCountdown();
    }
*/
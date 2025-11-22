// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir o FAQ clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal de Teste
const testeModal = document.getElementById('testeModal');

function criarTeste() {
    testeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    testeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
testeModal.addEventListener('click', (e) => {
    if (e.target === testeModal) {
        fecharModal();
    }
});

// Enviar formulário de teste
function enviarTeste(e) {
    e.preventDefault();
    
    const config = carregarConfig();
    const whatsappNumero = config.whatsapp || '5511999999999';
    
    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    
    // Salvar solicitação no sistema
    if (typeof gerenciadorSolicitacoes !== 'undefined') {
        gerenciadorSolicitacoes.adicionar({
            nome: nome,
            whatsapp: whatsapp,
            email: email
        });
    }
    
    // Mensagem para WhatsApp
    const mensagem = `🔥 *SOLICITAÇÃO DE TESTE GRÁTIS - CHAMA TV*\n\n` +
                    `👤 *Nome:* ${nome}\n` +
                    `📱 *WhatsApp:* ${whatsapp}\n` +
                    `📧 *E-mail:* ${email}\n\n` +
                    `Olá! Gostaria de receber meu teste grátis de 2 horas do Chama TV.`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Fechar modal
    fecharModal();
    
    // Resetar formulário
    document.getElementById('testeForm').reset();
    
    // Mostrar mensagem de sucesso
    alert('✅ Solicitação registrada! Redirecionando para o WhatsApp...');
}

// Funções de Contato
function contatar(plano) {
    const config = window.CHAMA_TV_CONFIG || {};
    const whatsapp = config.contato?.whatsapp || '5511999999999';
    const mensagem = `🔥 Olá! Tenho interesse no plano *${plano}* do Chama TV. Gostaria de mais informações!`;
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

function contatarWhatsApp() {
    const config = window.CHAMA_TV_CONFIG || {};
    const whatsapp = config.contato?.whatsapp || '5511999999999';
    const mensagem = `🔥 Olá! Gostaria de saber mais sobre o Chama TV!`;
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

function contatarTelegram() {
    const config = window.CHAMA_TV_CONFIG || {};
    const telegram = config.contato?.telegram || 'chamatv';
    window.open(`https://t.me/${telegram}`, '_blank');
}

function contatarEmail() {
    const config = window.CHAMA_TV_CONFIG || {};
    const email = config.contato?.email || 'contato@chamatv.com.br';
    window.location.href = `mailto:${email}?subject=Contato - Chama TV`;
}

// Animação de scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.sobre-card, .plano-card, .recurso-item, .faq-item, .contato-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar transparente/sólida no scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(255, 69, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Criar partículas de fogo no hero
function createFireParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fire-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    hero.appendChild(particlesContainer);
    
    setInterval(() => {
        if (document.querySelectorAll('.fire-particle').length < 20) {
            createParticle(particlesContainer);
        }
    }, 300);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'fire-particle';
    
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 1;
    
    particle.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #FFD700, #FF6B00, #FF4500);
        border-radius: 50%;
        opacity: 0.8;
        animation: riseUp ${duration}s ease-in ${delay}s forwards;
        filter: blur(2px);
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Adicionar CSS da animação
const style = document.createElement('style');
style.textContent = `
    @keyframes riseUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-50vh) scale(1.2);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar partículas quando a página carregar
window.addEventListener('load', () => {
    createFireParticles();
});

// Prevenir zoom no iOS ao focar em inputs
document.addEventListener('touchstart', function() {}, {passive: true});

// Adicionar efeito de toque nos botões mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

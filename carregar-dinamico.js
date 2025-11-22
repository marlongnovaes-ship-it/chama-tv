// Script para carregar configurações dinâmicas no site
(function() {
    // Carregar configurações
    const config = carregarConfig();
    
    // Aguardar o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aplicarConfiguracoes);
    } else {
        aplicarConfiguracoes();
    }
    
    function aplicarConfiguracoes() {
        // Atualizar título da página
        if (config.siteTitle) {
            document.title = config.siteTitle;
        }
        
        // Atualizar Hero Section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && config.heroTitle) {
            heroTitle.innerHTML = config.heroTitle.replace('Chama TV', '<span class="gradient-text">Chama TV</span>');
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && config.heroSubtitle) {
            heroSubtitle.textContent = config.heroSubtitle;
        }
        
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription && config.heroDescription) {
            heroDescription.textContent = config.heroDescription;
        }
        
        const badgeText = document.querySelector('.badge-text');
        if (badgeText && config.testeBadge) {
            badgeText.textContent = config.testeBadge;
        }
        
        // Atualizar preços dos planos
        const precoMensal = document.querySelector('.plano-card:nth-child(1) .value');
        if (precoMensal && config.planoMensal.preco) {
            precoMensal.textContent = config.planoMensal.preco;
        }
        
        const precoTrimestral = document.querySelector('.plano-card:nth-child(2) .value');
        if (precoTrimestral && config.planoTrimestral.preco) {
            precoTrimestral.textContent = config.planoTrimestral.preco;
        }
        
        const precoAnual = document.querySelector('.plano-card:nth-child(3) .value');
        if (precoAnual && config.planoAnual.preco) {
            precoAnual.textContent = config.planoAnual.preco;
        }
        
        // Atualizar email no rodapé de contato
        const emailElements = document.querySelectorAll('p');
        emailElements.forEach(el => {
            if (el.textContent.includes('@') && config.email) {
                el.textContent = config.email;
            }
        });
        
        // Atualizar funções de contato
        window.abrirWhatsApp = function() {
            const mensagem = `Olá! Gostaria de saber mais sobre os planos do ${config.siteName || 'Chama TV'}.`;
            const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(mensagem)}`;
            window.open(whatsappUrl, '_blank');
        };
        
        window.abrirTelegram = function() {
            window.open(`https://t.me/${config.telegram}`, '_blank');
        };
        
        window.abrirEmail = function() {
            window.location.href = `mailto:${config.email}?subject=Contato - ${config.siteName || 'Chama TV'}`;
        };
        
        // Atualizar função de criar teste
        window.criarTeste = function() {
            const modal = document.getElementById('testeModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        };
        
        // Atualizar função de enviar teste
        window.enviarTeste = function() {
            const nome = document.getElementById('testeNome').value;
            const whatsappTeste = document.getElementById('testeWhatsapp').value;
            const emailTeste = document.getElementById('testeEmail').value;
            
            if (!nome || !whatsappTeste || !emailTeste) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            const mensagem = `🔥 *SOLICITAÇÃO DE TESTE GRÁTIS*\n\n` +
                           `👤 *Nome:* ${nome}\n` +
                           `📱 *WhatsApp:* ${whatsappTeste}\n` +
                           `📧 *E-mail:* ${emailTeste}\n\n` +
                           `Olá! Gostaria de solicitar o teste grátis de 2 horas do ${config.siteName || 'Chama TV'}.`;
            
            const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(mensagem)}`;
            window.open(whatsappUrl, '_blank');
            
            fecharModal();
        };
    }
})();

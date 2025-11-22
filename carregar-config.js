// Script para carregar e aplicar configurações do painel admin
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aplicarConfiguracoes);
    } else {
        aplicarConfiguracoes();
    }

    function aplicarConfiguracoes() {
        const config = window.CHAMA_TV_CONFIG;
        
        if (!config) {
            console.warn('Configurações não carregadas');
            return;
        }

        // Aplicar cores
        aplicarCores(config.cores);

        // Aplicar configurações do site
        if (config.site) {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle && config.site.titulo) {
                heroTitle.innerHTML = `Bem-vindo ao <span class="gradient-text">${config.site.titulo}</span>`;
            }

            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle && config.site.subtitulo) {
                heroSubtitle.textContent = config.site.subtitulo;
            }

            const heroDescription = document.querySelector('.hero-description');
            if (heroDescription && config.site.descricao) {
                heroDescription.textContent = config.site.descricao;
            }

            const badgeText = document.querySelector('.badge-text');
            if (badgeText && config.site.teste_gratis) {
                badgeText.textContent = config.site.teste_gratis;
            }
        }

        // Aplicar planos
        if (config.planos) {
            aplicarPlano('mensal', config.planos.mensal);
            aplicarPlano('trimestral', config.planos.trimestral);
            aplicarPlano('anual', config.planos.anual);
        }

        // Aplicar recursos
        if (config.recursos) {
            aplicarRecursos(config.recursos);
        }

        // Aplicar FAQ
        if (config.faq) {
            aplicarFaq(config.faq);
        }
    }

    function aplicarCores(cores) {
        if (!cores) return;

        const root = document.documentElement;
        if (cores.primaria) root.style.setProperty('--primary-color', cores.primaria);
        if (cores.secundaria) root.style.setProperty('--secondary-color', cores.secundaria);
        if (cores.destaque) root.style.setProperty('--accent-color', cores.destaque);
    }

    function aplicarPlano(tipo, dados) {
        if (!dados) return;

        const planoCards = document.querySelectorAll('.plano-card');
        let planoCard = null;

        planoCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.textContent.toLowerCase().includes(tipo)) {
                planoCard = card;
            }
        });

        if (!planoCard) return;

        const valueElement = planoCard.querySelector('.value');
        if (valueElement && dados.preco) {
            valueElement.textContent = dados.preco;
        }

        const periodElement = planoCard.querySelector('.period');
        if (periodElement && dados.periodo) {
            periodElement.textContent = dados.periodo;
        }

        const features = planoCard.querySelectorAll('.plano-features li');
        if (features.length >= 2) {
            if (dados.qualidade) {
                features[1].innerHTML = `✓ Qualidade ${dados.qualidade}`;
            }
            if (dados.telas) {
                features[2].innerHTML = `✓ ${dados.telas}`;
            }
        }
    }

    function aplicarRecursos(recursos) {
        const container = document.querySelector('.recursos-grid');
        if (!container) return;

        container.innerHTML = '';

        recursos.forEach(recurso => {
            const div = document.createElement('div');
            div.className = 'recurso-item fade-in';
            div.innerHTML = `
                <div class="recurso-icon">${recurso.icone || '⭐'}</div>
                <h3>${recurso.titulo || ''}</h3>
                <p>${recurso.descricao || ''}</p>
            `;
            container.appendChild(div);
        });
    }

    function aplicarFaq(faq) {
        const container = document.querySelector('.faq-container');
        if (!container) return;

        container.innerHTML = '';

        faq.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'faq-item fade-in';
            div.innerHTML = `
                <button class="faq-question" onclick="toggleFaq(${index})">
                    <span>${item.pergunta || ''}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${item.resposta || ''}</p>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Função global para toggle do FAQ
    window.toggleFaq = function(index) {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems[index]) {
            faqItems[index].classList.toggle('active');
        }
    };
})();

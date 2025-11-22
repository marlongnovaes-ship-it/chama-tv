// Painel Administrativo Master - Chama TV
let config = {};

document.addEventListener('DOMContentLoaded', () => {
    carregarConfiguracoes();
    setupMenuNavigation();
    setupColorPickers();
});

// Navegação do menu
function setupMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            menuItems.forEach(mi => mi.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(`section-${sectionId}`).classList.add('active');
        });
    });
}

// Configurar seletores de cor
function setupColorPickers() {
    const colorInputs = ['cor_primaria', 'cor_secundaria', 'cor_destaque'];
    
    colorInputs.forEach(id => {
        const colorInput = document.getElementById(id);
        const textInput = document.getElementById(`${id}_text`);
        
        if (colorInput && textInput) {
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value.toUpperCase();
            });
            
            textInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    colorInput.value = value;
                }
            });
        }
    });
}

// Carregar configurações
async function carregarConfiguracoes() {
    try {
        const response = await fetch('/admin/api/config');
        if (!response.ok) throw new Error('Erro ao carregar');
        
        config = await response.json();
        preencherFormularios();
    } catch (error) {
        showAlert('❌ Erro ao carregar configurações: ' + error.message, 'error');
    }
}

// Preencher formulários
function preencherFormularios() {
    // Geral
    document.getElementById('titulo').value = config.site?.titulo || '';
    document.getElementById('subtitulo').value = config.site?.subtitulo || '';
    document.getElementById('descricao').value = config.site?.descricao || '';
    document.getElementById('teste_gratis').value = config.site?.teste_gratis || '';

    // Cores
    if (config.cores) {
        setCor('cor_primaria', config.cores.primaria || '#FF4500');
        setCor('cor_secundaria', config.cores.secundaria || '#FF6B00');
        setCor('cor_destaque', config.cores.destaque || '#FFD700');
    }

    // Planos
    if (config.planos) {
        ['mensal', 'trimestral', 'anual'].forEach(tipo => {
            if (config.planos[tipo]) {
                document.getElementById(`${tipo}_preco`).value = config.planos[tipo].preco || '';
                document.getElementById(`${tipo}_periodo`).value = config.planos[tipo].periodo || '';
                document.getElementById(`${tipo}_telas`).value = config.planos[tipo].telas || '';
                document.getElementById(`${tipo}_qualidade`).value = config.planos[tipo].qualidade || '';
            }
        });
    }

    // Recursos
    renderizarRecursos();

    // FAQ
    renderizarFaq();

    // Contato
    document.getElementById('whatsapp').value = config.contato?.whatsapp || '';
    document.getElementById('telegram').value = config.contato?.telegram || '';
    document.getElementById('email').value = config.contato?.email || '';
}

function setCor(id, valor) {
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(`${id}_text`);
    if (colorInput && textInput) {
        colorInput.value = valor;
        textInput.value = valor.toUpperCase();
    }
}

// Renderizar recursos
function renderizarRecursos() {
    const container = document.getElementById('recursos-container');
    container.innerHTML = '';
    
    const recursos = config.recursos || [];
    recursos.forEach((recurso, index) => {
        const div = document.createElement('div');
        div.className = 'recurso-item';
        div.innerHTML = `
            <button class="btn-remove" onclick="removerRecurso(${index})">🗑️ Remover</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Ícone (Emoji)</label>
                    <input type="text" class="emoji-input" value="${recurso.icone || '📺'}" 
                           onchange="atualizarRecurso(${index}, 'icone', this.value)" maxlength="2">
                </div>
                <div class="form-group" style="flex: 2;">
                    <label>Título</label>
                    <input type="text" value="${recurso.titulo || ''}" 
                           onchange="atualizarRecurso(${index}, 'titulo', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Descrição</label>
                <textarea rows="2" onchange="atualizarRecurso(${index}, 'descricao', this.value)">${recurso.descricao || ''}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

function adicionarRecurso() {
    if (!config.recursos) config.recursos = [];
    config.recursos.push({
        icone: '⭐',
        titulo: 'Novo Recurso',
        descricao: 'Descrição do recurso'
    });
    renderizarRecursos();
}

function removerRecurso(index) {
    if (confirm('Tem certeza que deseja remover este recurso?')) {
        config.recursos.splice(index, 1);
        renderizarRecursos();
    }
}

function atualizarRecurso(index, campo, valor) {
    if (config.recursos && config.recursos[index]) {
        config.recursos[index][campo] = valor;
    }
}

// Renderizar FAQ
function renderizarFaq() {
    const container = document.getElementById('faq-container');
    container.innerHTML = '';
    
    const faq = config.faq || [];
    faq.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <button class="btn-remove" onclick="removerFaq(${index})">🗑️ Remover</button>
            <div class="form-group">
                <label>Pergunta</label>
                <input type="text" value="${item.pergunta || ''}" 
                       onchange="atualizarFaq(${index}, 'pergunta', this.value)">
            </div>
            <div class="form-group">
                <label>Resposta</label>
                <textarea rows="3" onchange="atualizarFaq(${index}, 'resposta', this.value)">${item.resposta || ''}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

function adicionarFaq() {
    if (!config.faq) config.faq = [];
    config.faq.push({
        pergunta: 'Nova pergunta?',
        resposta: 'Resposta da pergunta.'
    });
    renderizarFaq();
}

function removerFaq(index) {
    if (confirm('Tem certeza que deseja remover esta pergunta?')) {
        config.faq.splice(index, 1);
        renderizarFaq();
    }
}

function atualizarFaq(index, campo, valor) {
    if (config.faq && config.faq[index]) {
        config.faq[index][campo] = valor;
    }
}

// Coletar dados
function coletarDados() {
    return {
        site: {
            titulo: document.getElementById('titulo').value,
            subtitulo: document.getElementById('subtitulo').value,
            descricao: document.getElementById('descricao').value,
            teste_gratis: document.getElementById('teste_gratis').value
        },
        cores: {
            primaria: document.getElementById('cor_primaria').value,
            secundaria: document.getElementById('cor_secundaria').value,
            destaque: document.getElementById('cor_destaque').value,
            fundo_escuro: config.cores?.fundo_escuro || '#0a0a0a',
            fundo_escuro_2: config.cores?.fundo_escuro_2 || '#1a1a1a'
        },
        planos: {
            mensal: {
                nome: 'Mensal',
                preco: document.getElementById('mensal_preco').value,
                periodo: document.getElementById('mensal_periodo').value,
                telas: document.getElementById('mensal_telas').value,
                qualidade: document.getElementById('mensal_qualidade').value,
                ativo: true
            },
            trimestral: {
                nome: 'Trimestral',
                preco: document.getElementById('trimestral_preco').value,
                periodo: document.getElementById('trimestral_periodo').value,
                telas: document.getElementById('trimestral_telas').value,
                qualidade: document.getElementById('trimestral_qualidade').value,
                destaque: true,
                ativo: true
            },
            anual: {
                nome: 'Anual',
                preco: document.getElementById('anual_preco').value,
                periodo: document.getElementById('anual_periodo').value,
                telas: document.getElementById('anual_telas').value,
                qualidade: document.getElementById('anual_qualidade').value,
                ativo: true
            }
        },
        recursos: config.recursos || [],
        faq: config.faq || [],
        contato: {
            whatsapp: document.getElementById('whatsapp').value,
            telegram: document.getElementById('telegram').value,
            email: document.getElementById('email').value
        },
        admin: config.admin
    };
}

// Salvar configurações
async function salvarConfiguracoes() {
    const btnSave = document.querySelector('.btn-save');
    const originalText = btnSave.innerHTML;

    try {
        btnSave.innerHTML = '<span>⏳</span> Salvando...';
        btnSave.disabled = true;

        const dados = coletarDados();
        const response = await fetch('/admin/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (result.success) {
            showAlert('✅ Configurações salvas com sucesso! O site foi atualizado.', 'success');
            config = dados;
        } else {
            showAlert('❌ ' + (result.message || 'Erro ao salvar'), 'error');
        }
    } catch (error) {
        showAlert('❌ Erro ao salvar: ' + error.message, 'error');
    } finally {
        btnSave.innerHTML = originalText;
        btnSave.disabled = false;
    }
}

// Alterar senha
async function alterarSenha() {
    const senhaAtual = document.getElementById('senha_atual').value;
    const senhaNova = document.getElementById('senha_nova').value;
    const senhaConfirma = document.getElementById('senha_confirma').value;

    if (!senhaAtual || !senhaNova || !senhaConfirma) {
        showAlert('❌ Preencha todos os campos', 'error');
        return;
    }

    if (senhaNova !== senhaConfirma) {
        showAlert('❌ As senhas não coincidem', 'error');
        return;
    }

    if (senhaNova.length < 6) {
        showAlert('❌ A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }

    try {
        const response = await fetch('/admin/api/senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha_atual: senhaAtual, senha_nova: senhaNova })
        });

        const result = await response.json();

        if (result.success) {
            showAlert('✅ Senha alterada com sucesso!', 'success');
            document.getElementById('senha_atual').value = '';
            document.getElementById('senha_nova').value = '';
            document.getElementById('senha_confirma').value = '';
        } else {
            showAlert('❌ ' + (result.message || 'Erro ao alterar senha'), 'error');
        }
    } catch (error) {
        showAlert('❌ Erro: ' + error.message, 'error');
    }
}

// Logout
async function logout() {
    if (!confirm('Tem certeza que deseja sair?')) return;
    
    try {
        await fetch('/admin/api/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    } catch (error) {
        window.location.href = '/admin/login';
    }
}

// Mostrar alerta
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => alertBox.classList.remove('show'), 5000);
}

// Atalho Ctrl+S
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        salvarConfiguracoes();
    }
});

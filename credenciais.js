// Sistema de gerenciamento de credenciais
class GerenciadorCredenciais {
    constructor() {
        this.chave = 'chamatv_credenciais';
        this.inicializar();
    }

    // Inicializar com credenciais padrão
    inicializar() {
        const credenciais = this.obter();
        if (!credenciais) {
            this.salvar({
                usuario: 'admin',
                senha: 'chamatv2025'
            });
        }
    }

    // Obter credenciais
    obter() {
        const dados = localStorage.getItem(this.chave);
        if (dados) {
            try {
                return JSON.parse(dados);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Salvar credenciais
    salvar(credenciais) {
        localStorage.setItem(this.chave, JSON.stringify(credenciais));
    }

    // Verificar login
    verificar(usuario, senha) {
        const credenciais = this.obter();
        if (!credenciais) return false;
        return credenciais.usuario === usuario && credenciais.senha === senha;
    }

    // Alterar senha
    alterarSenha(senhaAtual, novaSenha) {
        const credenciais = this.obter();
        if (!credenciais) return false;
        
        if (credenciais.senha !== senhaAtual) {
            return { sucesso: false, mensagem: 'Senha atual incorreta!' };
        }
        
        if (novaSenha.length < 6) {
            return { sucesso: false, mensagem: 'A nova senha deve ter no mínimo 6 caracteres!' };
        }
        
        credenciais.senha = novaSenha;
        this.salvar(credenciais);
        return { sucesso: true, mensagem: 'Senha alterada com sucesso!' };
    }

    // Alterar usuário
    alterarUsuario(novoUsuario) {
        const credenciais = this.obter();
        if (!credenciais) return false;
        
        if (novoUsuario.length < 3) {
            return { sucesso: false, mensagem: 'O usuário deve ter no mínimo 3 caracteres!' };
        }
        
        credenciais.usuario = novoUsuario;
        this.salvar(credenciais);
        return { sucesso: true, mensagem: 'Usuário alterado com sucesso!' };
    }

    // Resetar para padrão
    resetar() {
        this.salvar({
            usuario: 'admin',
            senha: 'chamatv2025'
        });
    }
}

// Instância global
const gerenciadorCredenciais = new GerenciadorCredenciais();

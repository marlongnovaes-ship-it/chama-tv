// Sistema de gerenciamento de solicitações de teste
class GerenciadorSolicitacoes {
    constructor() {
        this.chave = 'chamatv_solicitacoes';
    }

    // Adicionar nova solicitação
    adicionar(solicitacao) {
        const solicitacoes = this.listar();
        const novaSolicitacao = {
            id: Date.now(),
            nome: solicitacao.nome,
            whatsapp: solicitacao.whatsapp,
            email: solicitacao.email,
            data: new Date().toLocaleString('pt-BR'),
            status: 'pendente', // pendente, em_atendimento, atendido
            timestamp: Date.now()
        };
        
        solicitacoes.unshift(novaSolicitacao); // Adiciona no início
        this.salvar(solicitacoes);
        return novaSolicitacao;
    }

    // Listar todas as solicitações
    listar() {
        const dados = localStorage.getItem(this.chave);
        if (dados) {
            try {
                return JSON.parse(dados);
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    // Atualizar status de uma solicitação
    atualizarStatus(id, novoStatus) {
        const solicitacoes = this.listar();
        const index = solicitacoes.findIndex(s => s.id === id);
        if (index !== -1) {
            solicitacoes[index].status = novoStatus;
            this.salvar(solicitacoes);
            return true;
        }
        return false;
    }

    // Excluir uma solicitação
    excluir(id) {
        const solicitacoes = this.listar();
        const novaLista = solicitacoes.filter(s => s.id !== id);
        this.salvar(novaLista);
        return true;
    }

    // Salvar no localStorage
    salvar(solicitacoes) {
        localStorage.setItem(this.chave, JSON.stringify(solicitacoes));
    }

    // Contar solicitações pendentes
    contarPendentes() {
        const solicitacoes = this.listar();
        return solicitacoes.filter(s => s.status === 'pendente').length;
    }

    // Limpar todas as solicitações
    limparTodas() {
        localStorage.removeItem(this.chave);
    }
}

// Instância global
const gerenciadorSolicitacoes = new GerenciadorSolicitacoes();

// Configurações editáveis do site Chama TV
const CONFIG_PADRAO = {
  // Informações Gerais
  siteName: "Chama TV",
  siteTitle: "Chama TV - IPTV Premium | Teste Grátis 2 Horas",
  heroTitle: "Bem-vindo ao Chama TV",
  heroSubtitle: "O melhor serviço de IPTV Premium do Brasil",
  heroDescription: "Milhares de canais em HD/4K, filmes, séries, esportes ao vivo e muito mais!",
  testeBadge: "TESTE GRÁTIS 2 HORAS",
  
  // Contatos
  whatsapp: "5511999999999",
  telegram: "chamatv",
  email: "contato@chamatv.com.br",
  
  // Planos
  planoMensal: {
    nome: "Mensal",
    preco: "29",
    periodo: "mês",
    recursos: [
      "Todos os canais disponíveis",
      "Qualidade HD/Full HD",
      "1 tela simultânea",
      "Suporte técnico",
      "Sem fidelidade"
    ]
  },
  planoTrimestral: {
    nome: "Trimestral",
    preco: "69",
    periodo: "3 meses",
    popular: true,
    recursos: [
      "Todos os canais disponíveis",
      "Qualidade HD/Full HD/4K",
      "2 telas simultâneas",
      "Suporte prioritário",
      "Economia de 20%"
    ]
  },
  planoAnual: {
    nome: "Anual",
    preco: "199",
    periodo: "ano",
    recursos: [
      "Todos os canais disponíveis",
      "Qualidade HD/Full HD/4K",
      "3 telas simultâneas",
      "Suporte VIP 24/7",
      "Economia de 43%"
    ]
  },
  
  // Sobre - Cards
  sobreCards: [
    {
      icon: "📺",
      titulo: "IPTV Premium",
      descricao: "Acesso a milhares de canais de TV ao vivo, incluindo canais abertos, fechados, esportes, filmes e séries sob demanda."
    },
    {
      icon: "⚡",
      titulo: "Alta Velocidade",
      descricao: "Streaming em alta definição (HD/Full HD/4K) com servidores de alta performance para garantir estabilidade."
    },
    {
      icon: "🌐",
      titulo: "Multi-Dispositivos",
      descricao: "Compatível com Smart TV, Android, iOS, PC, notebook, TV Box e muito mais. Assista onde quiser!"
    },
    {
      icon: "🔒",
      titulo: "Seguro e Confiável",
      descricao: "Servidores seguros e criptografados. Suporte técnico disponível para ajudar você a qualquer momento."
    }
  ],
  
  // Recursos
  recursos: [
    {
      icon: "📺",
      titulo: "+10.000 Canais",
      descricao: "Acesso ilimitado a milhares de canais nacionais e internacionais"
    },
    {
      icon: "🎬",
      titulo: "Filmes e Séries",
      descricao: "Biblioteca completa com lançamentos e clássicos sob demanda"
    },
    {
      icon: "⚽",
      titulo: "Esportes ao Vivo",
      descricao: "Todos os campeonatos, lutas, corridas e eventos esportivos"
    },
    {
      icon: "🎮",
      titulo: "Interface Intuitiva",
      descricao: "Navegação fácil e rápida em todos os dispositivos"
    },
    {
      icon: "🚀",
      titulo: "Sem Travamentos",
      descricao: "Servidores de alta performance para streaming estável"
    },
    {
      icon: "💬",
      titulo: "Suporte 24/7",
      descricao: "Equipe sempre disponível para ajudar você"
    }
  ]
};

// Função para carregar configurações
function carregarConfig() {
  const configSalva = localStorage.getItem('chamatv_config');
  if (configSalva) {
    try {
      return JSON.parse(configSalva);
    } catch (e) {
      console.error('Erro ao carregar configurações:', e);
      return CONFIG_PADRAO;
    }
  }
  return CONFIG_PADRAO;
}

// Função para salvar configurações
function salvarConfig(config) {
  localStorage.setItem('chamatv_config', JSON.stringify(config));
}

// Função para resetar configurações
function resetarConfig() {
  localStorage.removeItem('chamatv_config');
  return CONFIG_PADRAO;
}

// Exportar configuração atual
const CONFIG = carregarConfig();

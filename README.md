# 🔥 Chama TV - Site IPTV Premium

Site profissional para serviço de IPTV com design temático de chama viva, otimizado para dispositivos móveis.

## 📋 Conteúdo do Site

- **Hero Section**: Banner principal com animações de chama e call-to-action
- **Sobre**: Informações sobre o serviço IPTV Premium
- **Planos**: Três opções de assinatura (Mensal, Trimestral, Anual)
- **Recursos**: Benefícios e diferenciais do serviço
- **FAQ**: 8 perguntas frequentes com respostas detalhadas
- **Contato**: Botões para WhatsApp, Telegram e E-mail
- **Teste Grátis**: Modal para solicitar teste de 2 horas

## 🚀 Como Usar

### Windows

1. Certifique-se de ter o Python instalado ([Download Python](https://www.python.org/downloads/))
2. Clique duas vezes no arquivo `iniciar-servidor.bat`
3. O navegador abrirá automaticamente com o site

### Linux / Mac

1. Abra o terminal na pasta do site
2. Execute: `./iniciar-servidor.sh`
3. Ou execute: `python3 iniciar-servidor.py`
4. O navegador abrirá automaticamente com o site

### Método Alternativo (Qualquer Sistema)

```bash
python3 iniciar-servidor.py
```

## 📱 Acessar pelo Celular

Para testar o site no seu celular na mesma rede Wi-Fi:

1. Inicie o servidor no computador
2. Descubra o IP local do seu computador:
   - **Windows**: `ipconfig` no CMD
   - **Linux/Mac**: `ifconfig` ou `ip addr` no terminal
3. No celular, acesse: `http://[SEU_IP]:8000`
   - Exemplo: `http://192.168.1.100:8000`

## 🎨 Características do Design

### Tema de Chama Viva
- Paleta de cores: Laranja (#FF4500), Vermelho, Dourado (#FFD700)
- Animações de chama fluidas e realistas
- Efeitos de brilho (glow) e partículas de fogo
- Gradientes animados que simulam movimento de chama

### Otimizado para Mobile
- Design mobile-first responsivo
- Tamanhos de fonte e espaçamentos otimizados para telas pequenas
- Botões grandes e fáceis de tocar
- Menu hambúrguer para navegação mobile
- Imagens de background específicas para mobile e desktop

### Animações e Interatividade
- Partículas de fogo flutuantes no hero
- Logo com efeito de brilho pulsante
- Botões com animações de hover e toque
- FAQ com accordion animado
- Modal de teste grátis com formulário

## 📂 Estrutura de Arquivos

```
chama-tv-site/
├── index.html              # Página principal
├── style.css               # Estilos e animações
├── script.js               # Funcionalidades JavaScript
├── logo-chama-tv.png       # Logo do Chama TV
├── hero-flames-bg.jpg      # Background de chamas (desktop)
├── hero-flames-mobile.jpg  # Background de chamas (mobile)
├── iniciar-servidor.py     # Script Python do servidor
├── iniciar-servidor.bat    # Script para Windows
├── iniciar-servidor.sh     # Script para Linux/Mac
└── README.md               # Este arquivo
```

## ⚙️ Personalização

### Alterar Número do WhatsApp

Edite o arquivo `script.js` e procure por:

```javascript
const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
```

Substitua `5511999999999` pelo seu número no formato internacional (código do país + DDD + número).

### Alterar E-mail de Contato

Edite o arquivo `index.html` e procure por:

```html
<p>contato@chamatv.com.br</p>
```

E também no `script.js`:

```javascript
window.location.href = 'mailto:contato@chamatv.com.br?subject=Contato - Chama TV';
```

### Alterar Telegram

Edite o arquivo `script.js` e procure por:

```javascript
window.open('https://t.me/chamatv', '_blank');
```

Substitua `chamatv` pelo seu username do Telegram.

### Alterar Preços dos Planos

Edite o arquivo `index.html` na seção de planos e modifique os valores:

```html
<span class="value">29</span>
```

## 🎯 Funcionalidades

### Botão "Criar Teste Automático"
- Abre modal com formulário
- Coleta: Nome, WhatsApp e E-mail
- Envia dados via WhatsApp automaticamente
- Mensagem pré-formatada para facilitar atendimento

### Botões de Contato
- **WhatsApp**: Abre conversa com mensagem pré-definida
- **Telegram**: Redireciona para canal/usuário
- **E-mail**: Abre cliente de e-mail padrão

### FAQ Interativo
- 8 perguntas frequentes sobre IPTV
- Sistema de accordion (abre/fecha)
- Animações suaves

### Menu Responsivo
- Menu hambúrguer em dispositivos móveis
- Navegação suave entre seções
- Fecha automaticamente ao clicar em um link

## 🔧 Requisitos

- **Python 3.x** (já vem instalado no Mac/Linux, precisa instalar no Windows)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregar fontes do Google)

## 💡 Dicas

1. **Teste no celular**: A maioria dos usuários acessará pelo celular, então teste sempre nele
2. **Personalize os textos**: Adapte o conteúdo para seu público
3. **Atualize as imagens**: Você pode substituir as imagens por outras de sua preferência
4. **Configure os contatos**: Não esqueça de atualizar WhatsApp, Telegram e E-mail

## 🌐 Hospedagem

Para colocar o site online (não apenas localhost):

### Opção 1: GitHub Pages (Grátis)
1. Crie uma conta no GitHub
2. Crie um repositório
3. Faça upload dos arquivos
4. Ative o GitHub Pages nas configurações

### Opção 2: Netlify (Grátis)
1. Crie uma conta no Netlify
2. Arraste a pasta do site para o Netlify
3. Pronto! Seu site estará online

### Opção 3: Vercel (Grátis)
1. Crie uma conta no Vercel
2. Importe o projeto
3. Deploy automático

## 📞 Suporte

Se tiver dúvidas ou problemas:

1. Verifique se o Python está instalado: `python3 --version`
2. Certifique-se de estar na pasta correta do site
3. Verifique se a porta 8000 não está em uso
4. Tente usar outra porta editando o arquivo `iniciar-servidor.py`

## 📝 Licença

Este projeto foi criado para uso pessoal/comercial. Sinta-se livre para modificar e adaptar conforme necessário.

---

**🔥 Desenvolvido com paixão para o Chama TV**

*Site otimizado para mobile, com design inspirado em chamas vivas e animações fluidas.*

// ============================================
// MENU MOBILE - Abrir e fechar menu
// ============================================

// Aguarda o carregamento completo da página antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona os elementos necessários usando seus IDs
    const menuToggle = document.getElementById('menuToggle'); // Botão do menu
    const navMenu = document.getElementById('navMenu'); // Menu de navegação
    
    // Adiciona um evento de clique no botão do menu
    menuToggle.addEventListener('click', function() {
        // Toggle (alterna) a classe 'active' no menu
        // Se tem a classe, remove. Se não tem, adiciona.
        navMenu.classList.toggle('active');
        
        // Muda o ícone do botão (de menu para fechar)
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        if (navMenu.classList.contains('active')) {
            icon.textContent = 'close'; // Ícone de fechar
        } else {
            icon.textContent = 'menu'; // Ícone de menu
        }
    });
    
    // Fecha o menu quando clica em um link de navegação (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove a classe 'active' do menu
            navMenu.classList.remove('active');
            // Volta o ícone para menu
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            icon.textContent = 'menu';
        });
    });
    
    // ============================================
    // SCROLL SUAVE - Animação ao clicar nos links
    // ============================================
    
    // Adiciona scroll suave para todos os links que começam com #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            
            // Pega o destino do link (ex: #sobre)
            const targetId = this.getAttribute('href');
            
            // Se o destino existe na página
            if (targetId !== '#' && document.querySelector(targetId)) {
                // Encontra o elemento de destino
                const targetElement = document.querySelector(targetId);
                
                // Faz scroll suave até o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Animação suave
                    block: 'start' // Alinha ao topo
                });
            }
        });
    });
    
    // ============================================
    // FORMULÁRIO DE CONTATO - Envio por Email (FormSubmit)
    // ============================================
    
    // FormSubmit é um serviço gratuito que envia emails diretamente
    // Não requer configuração adicional - apenas funciona!
    // Site: https://formsubmit.co/
    
    const contatoForm = document.getElementById('contatoForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    // Função para mostrar mensagem de status
    function mostrarStatus(mensagem, tipo) {
        formStatus.textContent = mensagem;
        formStatus.style.display = 'block';
        formStatus.style.color = tipo === 'sucesso' ? '#2d8650' : '#d32f2f';
        formStatus.style.padding = '10px';
        formStatus.style.borderRadius = '5px';
        formStatus.style.backgroundColor = tipo === 'sucesso' ? '#e8f5e9' : '#ffebee';
        
        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    // Função para criar e abrir link do WhatsApp
    function abrirWhatsApp(nome, email, telefone, mensagem) {
        // Monta a mensagem para o WhatsApp
        let textoWhatsApp = 'Olá! Quero saber mais sobre as aulas de inglês.\n\n';
        
        if (nome) {
            textoWhatsApp += `Nome: ${nome}\n`;
        }
        if (email) {
            textoWhatsApp += `E-mail: ${email}\n`;
        }
        if (telefone) {
            textoWhatsApp += `Telefone: ${telefone}\n`;
        }
        if (mensagem) {
            textoWhatsApp += `\nMensagem: ${mensagem}`;
        }
        
        // Codifica o texto para URL
        const textoCodificado = encodeURIComponent(textoWhatsApp);
        
        // Abre o WhatsApp em nova aba
        window.open(`https://wa.me/553182611517?text=${textoCodificado}`, '_blank');
    }
    
    // Função para criar e abrir cliente de email com mailto:
    function abrirEmailCliente(nome, email, telefone, mensagem) {
        // Monta o corpo do email com os dados
        let corpoEmail = `Nome: ${nome || 'Não informado'}\n`;
        corpoEmail += `Telefone: ${telefone || 'Não informado'}\n`;
        corpoEmail += `Email: ${email || 'Não informado'}\n`;
        
        if (mensagem) {
            corpoEmail += `\nMensagem:\n${mensagem}`;
        }
        
        // Codifica o assunto e o corpo do email para URL
        const assunto = encodeURIComponent('Dados do Cliente');
        const corpo = encodeURIComponent(corpoEmail);
        
        // Cria o link mailto com os dados
        const mailtoLink = `mailto:gabrielapascini17@gmail.com?subject=${assunto}&body=${corpo}`;
        
        // Abre o cliente de email padrão do usuário
        window.location.href = mailtoLink;
    }
    
    // Adiciona evento de submit no formulário
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o envio padrão para controlar o processo
        
        // Desabilita o botão para evitar múltiplos envios
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Pega os valores dos campos para validação
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validação básica antes de enviar
        if (!nome || !email || !mensagem) {
            mostrarStatus('Por favor, preencha pelo menos nome, e-mail e mensagem!', 'erro');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarStatus('Por favor, insira um e-mail válido!', 'erro');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
            return;
        }
        
        // Mostra mensagem de carregamento
        mostrarStatus('Enviando mensagem...', 'sucesso');
        
        // Prepara os dados do formulário para envio
        const formData = new FormData(contatoForm);
        
        // Envia o email via FormSubmit usando fetch
        fetch('https://formsubmit.co/ajax/gabrielapascini17@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Sucesso! Email enviado via FormSubmit
            mostrarStatus('Email enviado com sucesso!', 'sucesso');
            
            // Abre o cliente de email com mailto:
            abrirEmailCliente(nome, email, telefone, mensagem);
            
            // Abre o WhatsApp com os dados
            abrirWhatsApp(nome, email, telefone, mensagem);
            
            // Limpa o formulário
            contatoForm.reset();
            
            // Reabilita o botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        })
        .catch(error => {
            // Erro no envio
            console.error('Erro ao enviar email:', error);
            mostrarStatus('Erro ao enviar email. Tente novamente ou entre em contato pelo WhatsApp.', 'erro');
            
            // Mesmo com erro, abre o cliente de email e WhatsApp para não perder o contato
            abrirEmailCliente(nome, email, telefone, mensagem);
            abrirWhatsApp(nome, email, telefone, mensagem);
            
            // Reabilita o botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        });
    });
    
    // ============================================
    // MÁSCARA DE TELEFONE - Formata automaticamente
    // ============================================
    
    const telefoneInput = document.getElementById('telefone');
    
    // Adiciona evento de input (enquanto o usuário digita)
    telefoneInput.addEventListener('input', function(e) {
        // Remove tudo que não é número
        let value = e.target.value.replace(/\D/g, '');
        
        // Formata como (00) 00000-0000
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
        
        // Atualiza o valor do campo
        e.target.value = value;
    });
    
    // ============================================
    // ANIMAÇÃO AO ROLAR A PÁGINA (Scroll Animation)
    // ============================================
    
    // Função que verifica se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para adicionar animação aos elementos quando aparecem na tela
    function animateOnScroll() {
        // Seleciona todos os cards que devem ser animados
        const cards = document.querySelectorAll('.plano-card, .depoimento-card');
        
        cards.forEach(card => {
            // Se o card está visível na tela
            if (isElementInViewport(card)) {
                card.style.opacity = '1'; // Torna visível
                card.style.transform = 'translateY(0)'; // Volta à posição normal
            }
        });
    }
    
    // Inicializa os cards como invisíveis
    const cards = document.querySelectorAll('.plano-card, .depoimento-card');
    cards.forEach(card => {
        card.style.opacity = '0'; // Invisível inicialmente
        card.style.transform = 'translateY(30px)'; // Posicionado 30px abaixo
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Animação suave
    });
    
    // Executa a animação quando a página é rolada
    window.addEventListener('scroll', animateOnScroll);
    // Executa uma vez ao carregar a página
    animateOnScroll();
    
    // ============================================
    // DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO
    // ============================================
    
    // Função para destacar o link da seção atual
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]'); // Todas as seções com ID
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Pega a posição atual do scroll
        const scrollPosition = window.scrollY + 100; // +100 para ativar um pouco antes
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Posição do topo da seção
            const sectionHeight = section.offsetHeight; // Altura da seção
            const sectionId = section.getAttribute('id');
            
            // Se a seção está visível na tela
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove destaque de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adiciona destaque ao link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Executa ao rolar a página
    window.addEventListener('scroll', highlightActiveSection);
    
    // Adiciona estilo CSS para o link ativo (via JavaScript)
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #2d8650;
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
});

// ============================================
// FUNÇÕES ÚTEIS ADICIONAIS
// ============================================

// Função para copiar texto para área de transferência
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        alert('Texto copiado!');
    });
}

// Exemplo de uso: você pode adicionar botões "Copiar" nos números de telefone
// e chamar: copiarTexto('(00) 00000-0000');


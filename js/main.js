// JavaScript para destacar o item ativo no menu
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  const currentSection = window.location.hash || '#introducao';
  
  links.forEach(link => {
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
    
    link.addEventListener('click', function() {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Variável global para o gráfico
let grafico = null;

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    document.getElementById('calcularEmergiaBtn').addEventListener('click', calcularEmergia);
    document.getElementById('calcularImpactoBtn').addEventListener('click', calcularImpacto);
});

function calcularEmergia() {
    const input = document.getElementById('energia');
    const energia = parseFloat(input.value);
    const fatorEmergia = 2.5;
    
    if (isNaN(energia) || energia <= 0) {
        mostrarErro(input, "Por favor, insira um valor válido maior que zero.");
        return;
    }
    
    const emergia = energia * fatorEmergia;
    mostrarResultado(energia, emergia);
    atualizarGrafico(energia, emergia);
}

function mostrarErro(input, mensagem) {
    input.classList.add('error');
    document.getElementById('resultado').innerHTML = 
        `<span class="error-message"><i class="fas fa-exclamation-circle"></i> ${mensagem}</span>`;
}

function mostrarResultado(energia, emergia) {
    document.getElementById('resultado').innerHTML = `
        <div class="result-box">
            <p><i class="fas fa-bolt"></i> Energia: <strong>${energia.toFixed(2)} kWh</strong></p>
            <p><i class="fas fa-leaf"></i> Emergia: <strong>${emergia.toFixed(2)} seJ</strong></p>
        </div>
    `;
}

function atualizarGrafico(energia, emergia) {
  const canvas = document.getElementById('graficoEmergia');
  const ctx = canvas.getContext('2d');
  
  // Destruir gráfico anterior se existir
  if (grafico) {
    grafico.destroy();
  }

  // Criar novo gráfico com altura controlada
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Energia (kWh)', 'Emergia (seJ)'],
      datasets: [{
        label: 'Comparativo',
        data: [energia, emergia],
        backgroundColor: ['#26a69a', '#00796b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // Mantém proporções corretas
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Energia vs Emergia'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Mostrar o gráfico
  canvas.classList.add('mostrar');
}

document.getElementById('calcularImpactoBtn').addEventListener('click', function() {
  // Elementos do DOM
  const areaInput = document.getElementById('area');
  const consumoInput = document.getElementById('consumo');
  const areaError = document.getElementById('area-error');
  const consumoError = document.getElementById('consumo-error');
  const resultado = document.getElementById('resultado-impacto');
  
  // Reset estados
  areaInput.classList.remove('error');
  consumoInput.classList.remove('error');
  areaError.textContent = '';
  consumoError.textContent = '';
  
  // Validação
  let isValid = true;
  const area = parseFloat(areaInput.value);
  const consumo = parseFloat(consumoInput.value);
  
  if (isNaN(area) || area <= 0) {
    areaInput.classList.add('error');
    areaError.textContent = 'Insira uma área válida';
    isValid = false;
  }
  
  if (isNaN(consumo) || consumo < 0) {
    consumoInput.classList.add('error');
    consumoError.textContent = 'Insira um consumo válido';
    isValid = false;
  }
  
  if (!isValid) {
    resultado.style.display = 'none';
    return;
  }
  
  // Cálculo do impacto
  const consumoPorArea = (consumo / area).toFixed(2);
  let classificacao = '';
  let sugestao = '';
  
  if (consumoPorArea < 0.5) {
    classificacao = "Excelente";
    sugestao = "Continue com as boas práticas!";
  } else if (consumoPorArea < 1.0) {
    classificacao = "Bom";
    sugestao = "Considere auditoria energética para melhorias.";
  } else {
    classificacao = "Pode melhorar";
    sugestao = "Priorize medidas de eficiência energética.";
  }
  
  // Exibir resultado
  resultado.innerHTML = `
    <h4><i class="fas fa-chart-pie"></i> Resultado do Impacto</h4>
    <div class="result-grid">
      <div class="result-item">
        <span class="result-label">Consumo por m²:</span>
        <span class="result-value">${consumoPorArea} kWh/m²</span>
      </div>
      <div class="result-item">
        <span class="result-label">Classificação:</span>
        <span class="result-value ${classificacao.toLowerCase().replace(' ', '-')}">${classificacao}</span>
      </div>
      <div class="result-item full-width">
        <span class="result-label">Sugestão:</span>
        <span class="result-value">${sugestao}</span>
      </div>
    </div>
  `;
  resultado.style.display = 'block';
});

// Dados simulados para os gráficos (substitua com dados reais)
const dadosSolucoes = {
  energia: {
    antes: [1200, 800, 600],
    depois: [400, 300, 200],
    labels: ['Iluminação', 'Ar-condicionado', 'Equipamentos']
  },
  agua: {
    antes: [5000, 3000],
    depois: [2000, 1500],
    labels: ['Água potável', 'Água reutilizada']
  },
  residuos: {
    antes: [800, 200],
    depois: [300, 700],
    labels: ['Aterro sanitário', 'Reciclados']
  },
  educacao: {
    antes: [30, 70],
    depois: [80, 20],
    labels: ['Conscientizados', 'Não conscientizados']
  }
};

// Inicializar gráficos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  criarGraficoComparativo(
    'graficoEnergia', 
    'Consumo Energético (kWh/mês)',
    dadosSolucoes.energia
  );
  
  criarGraficoComparativo(
    'graficoAgua', 
    'Consumo de Água (litros/mês)',
    dadosSolucoes.agua
  );
  
  criarGraficoComparativo(
    'graficoResiduos', 
    'Gestão de Resíduos (%)',
    dadosSolucoes.residuos
  );
  
  criarGraficoComparativo(
    'graficoEducacao', 
    'Conscientização (%)',
    dadosSolucoes.educacao
  );
});

function criarGraficoComparativo(id, titulo, dados) {
  const ctx = document.getElementById(id).getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.labels,
      datasets: [
        {
          label: 'Antes',
          data: dados.antes,
          backgroundColor: '#a5d6a7',
          borderColor: '#81c784',
          borderWidth: 1
        },
        {
          label: 'Depois',
          data: dados.depois,
          backgroundColor: '#4db6ac',
          borderColor: '#26a69a',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: titulo,
          font: {
            size: 16
          }
        },
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Adicione este código ao seu arquivo JS existente
document.addEventListener('DOMContentLoaded', function() {
  // Accordion functionality
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const accordion = this.parentElement;
      accordion.classList.toggle('accordion-active');
      
      // Fecha os outros accordions
      if (accordion.classList.contains('accordion-active')) {
        document.querySelectorAll('.solucao-accordion').forEach(item => {
          if (item !== accordion) {
            item.classList.remove('accordion-active');
          }
        });
      }
      
      // Inicializa o gráfico apenas quando aberto (performance)
      const canvasId = accordion.querySelector('canvas')?.id;
      if (canvasId && !window[`grafico${canvasId.replace('grafico', '')}`]) {
        setTimeout(() => initGrafico(canvasId), 300); // Delay para animação
      }
    });
  });
  
  // Função para inicializar gráficos sob demanda
  function initGrafico(id) {
    if (!window.graficosIniciados) window.graficosIniciados = {};
    if (window.graficosIniciados[id]) return;
    
    window.graficosIniciados[id] = true;
    
    const dados = {
      energia: { antes: [1200, 800, 600], depois: [400, 300, 200], labels: ['Iluminação', 'Ar-condicionado', 'Equipamentos'] },
      agua: { antes: [5000, 3000], depois: [2000, 1500], labels: ['Água potável', 'Água reutilizada'] },
      residuos: { antes: [800, 200], depois: [300, 700], labels: ['Aterro sanitário', 'Reciclados'] },
      educacao: { antes: [30, 70], depois: [80, 20], labels: ['Conscientizados', 'Não conscientizados'] }
    };
    
    const tipo = id.replace('grafico', '').toLowerCase();
    criarGraficoComparativo(id, dados[tipo]);
  }
  
  function criarGraficoComparativo(id, dados) {
    const ctx = document.getElementById(id).getContext('2d');
    const titulos = {
      energia: 'Consumo Energético (kWh/mês)',
      agua: 'Consumo de Água (litros/mês)',
      residuos: 'Gestão de Resíduos (%)',
      educacao: 'Conscientização (%)'
    };
    const tipo = id.replace('grafico', '').toLowerCase();
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dados.labels,
        datasets: [
          {
            label: 'Antes',
            data: dados.antes,
            backgroundColor: '#a5d6a7',
            borderColor: '#81c784',
            borderWidth: 1
          },
          {
            label: 'Depois',
            data: dados.depois,
            backgroundColor: '#4db6ac',
            borderColor: '#26a69a',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: titulos[tipo],
            font: { size: 16 }
          },
          legend: { position: 'top' }
        },
        scales: { y: { beginAtZero: true } },
        animation: { duration: 1000, easing: 'easeOutQuart' }
      }
    });
  }
});

// Botão flutuante "Voltar ao Topo"
document.addEventListener('DOMContentLoaded', function() {
  const btnTopo = document.getElementById('btnTopo');
  
  // Mostrar/ocultar botão ao rolar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      btnTopo.classList.add('visible');
    } else {
      btnTopo.classList.remove('visible');
    }
  });
  
  // Rolagem suave ao clicar
  btnTopo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Adiciona efeito de clique
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 300);
  });
  
  // Se já estiver no topo, esconde o botão
  if (window.scrollY <= 300) {
    btnTopo.classList.remove('visible');
  }
});

// Função para abrir o modal
function openEcoModal(cardElement) {
  const modal = document.getElementById('ecoModal');
  const modalImg = document.getElementById('ecoModalImage');
  const modalTitle = document.getElementById('ecoModalTitle');
  const modalDesc = document.getElementById('ecoModalDesc');
  
  // Obtém os elementos da card clicada
  const imgSrc = cardElement.querySelector('img').src;
  const title = cardElement.querySelector('h3').textContent;
  const description = cardElement.querySelector('p').textContent;
  
  // Atualiza o modal com os dados
  modalImg.src = imgSrc;
  modalTitle.textContent = title;
  modalDesc.textContent = description;
  
  // Exibe o modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Desabilita scroll da página
  
  console.log('Modal aberto com:', imgSrc); // Para debug
}

// Função para fechar o modal
function closeEcoModal() {
  document.getElementById('ecoModal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Reabilita scroll
}

// Fechar modal ao clicar no X, fora da imagem ou pressionar ESC
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('ecoModal');
  
  // Fechar ao clicar no X
  document.querySelector('.eco-close').addEventListener('click', closeEcoModal);
  
  // Fechar ao clicar fora do conteúdo
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeEcoModal();
    }
  });
  
  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeEcoModal();
    }
  });
  
  // Debug: Verifica se os botões estão funcionando
  document.querySelectorAll('.eco-view-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Evita propagação do evento
      const card = this.closest('.eco-card');
      openEcoModal(card);
    });
  });
});

// Cards expansíveis
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.expansion-card');
  
  cards.forEach(card => {
    const header = card.querySelector('.expansion-header');
    
    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      
      // Fecha todos os cards primeiro
      cards.forEach(c => {
        c.classList.remove('active');
        c.querySelector('.expansion-header').setAttribute('aria-expanded', 'false');
      });
      
      // Abre o card clicado se não estava aberto
      if (!isOpen) {
        card.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
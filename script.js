const saudacao = document.querySelector("header p strong");

function atualizarSaudacao() {
  const hora = new Date().getHours();
  let mensagem = "";
  let emoji = "";

  if (hora >= 5 && hora < 12) {
    mensagem = "Bom dia";
    emoji = "☀️";
  } else if (hora >= 12 && hora < 18) {
    mensagem = "Boa tarde";
    emoji = "🌇";
  } else {
    mensagem = "Boa noite";
    emoji = "🌙";
  }

  saudacao.textContent = `Carlos Eduardo ${emoji}`;
}

atualizarSaudacao();

const input = document.querySelector(".form input");
const botao = document.querySelector(".form button");
const lista = document.querySelector(".minhas-tarefas");
const containerTarefas = document.createElement("div");
lista.appendChild(containerTarefas);

const tarefasFixas = document.querySelectorAll(".tarefa");
tarefasFixas.forEach(t => t.remove());

function verificarListaVazia() {
  if (containerTarefas.children.length === 0) {
    lista.innerHTML = `
      <div style="text-align:center; margin-top:20px; font-size:16px;">
        <span style="font-size:25px;">😢</span><br>
        Nenhum registro encontrado!
      </div>
    `;
  }
}

verificarListaVazia();

function adicionarTarefa() {
  const nomeTarefa = input.value.trim();
  if (nomeTarefa === "") return;

  if (lista.textContent.includes("Nenhum registro encontrado")) {
    lista.innerHTML = `
      <div class="titulo-tarefas">
        <h2>Minhas tarefas</h2>
        <span><strong></strong></span>
      </div>
      <p>Veja todas as suas tarefas criadas na plataforma.</p>
    `;
    lista.appendChild(containerTarefas);
  }

  const data = new Date();
  const dataFormatada = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const divTarefa = document.createElement("div");
  divTarefa.classList.add("tarefa", "pendente");

  divTarefa.innerHTML = `
    <div class="conteudo-tarefa">
      <input type="checkbox">
      <label>${nomeTarefa}</label>
      <span class="remover" style="margin-left:auto; cursor:pointer;">🗑️</span>
    </div>
    <p>Criada em: ${dataFormatada}</p>
  `;

  const checkbox = divTarefa.querySelector("input");
  checkbox.addEventListener("change", () => {
    divTarefa.classList.toggle("concluida");
  });

  const botaoRemover = divTarefa.querySelector(".remover");
  botaoRemover.addEventListener("click", () => {
    divTarefa.remove();
    if (containerTarefas.children.length === 0) {
      verificarListaVazia();
    }
  });

  containerTarefas.appendChild(divTarefa);
  input.value = "";
}

botao.addEventListener("click", adicionarTarefa);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});
async function carregarLancamentos() {
  const res = await fetch('/api/sheets?sheetName=Lançamentos');
  const dados = await res.json();
  
  const tbody = document.getElementById('tabelaLancamentos');
  tbody.innerHTML = '';

  dados.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.tipo}</td>
      <td>${l.categoria}</td>
      <td>${l.valor ?? ''}</td>
      <td>${l.data}</td>
      <td>${l.observacao}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('lancamentoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const data = document.getElementById('data').value;
  const observacao = document.getElementById('observacao').value;

  await fetch('/api/sheets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, categoria, valor, data, observacao })
  });

  e.target.reset();
  carregarLancamentos();
});

carregarLancamentos();

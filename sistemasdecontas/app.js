const formulario = document.getElementById('formulario')
const campoDescricao = document.getElementById('descricao')
const campoValor = document.getElementById('valor')
const campoVencimento = document.getElementById('vencimento')
const lista = document.getElementById('lista')
const avisoVazio = document.getElementById('aviso-vazio')
const totalGeralEL = document.getElementById('total-geral')
const totalRestante = document.getElementById('total-restante')

let gastos = carregarGastos()

    function formatarDinheiro(valor) {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function textoParaNumero(texto) {
    const trocado = texto.replace(',', '.')
    const numero = Number(trocado)
    return numero
}

function formatarData(data) {
    if (!data) return 'Sem data'
    const partes = data.split('-')
    return partes[2] + '/' + partes[1]
}

function desenharLista() {
    lista.innerHTML = ''
    if (gastos.legth === 0) {
        avisoVazio.style.display = 'block'
    } else {
        avisoVazio.style.display = 'none'
    }

for (const gasto of gastos) {
    const item = document.createElement('li')
    item.className = 'item'
    if (gasto.paga) {
        item.className = 'item pago'
    }

    const botaoMarcar = document.createElement('button')
    botaoMarcar.className = 'marcar'
    botaoMarcar.type = 'button'
    botaoMarcar.textContent = gasto.paga ? 'ok' : ''
    botaoMarcar.title = gasto.paga ? 'Marcar como não paga' : 'Marcar como paga'

    botaoMarcar.addEventListener('click', function () {
        alternarPaga(gasto.id)
    })

    const info = document.createElement('div')
    info.className = 'item-info'

    const descricao = document.createElemen('p')
    descricao.className = 'item-descricao'
    descricao.textContent = gasto.descricao
    
    const data = document.createElement('p')
    data.className = 'item-data'
    data.textContent = gasto.paga
    ? 'Pago -vence' + formatarData(gasto.vencimento)
    : 'Vence' + formatarData(gasto.vencimento)

   info.appendChild(descricao)
   info.appendChild(data)
   
   
   const valor = document.createElement('p')
   valor.className = 'item-valor'
   valor.textContent = formatarDinheiro(gasto.valor)
 }
}
/* Função que cria os Box das transações  */
function CreateBoxtransition(transações){
const BoxMain = document.createElement('div')
BoxMain.classList.add('BoxMain')

    const BoxDescription = document.createElement('div')
    BoxDescription.classList.add('BoxDescription')

    const Descriptiontext = document.createElement('p')
    Descriptiontext.textContent = `Descrição: ${transações.descricao}`

    const ValueText = document.createElement('p')
    ValueText.textContent = `Valor: R$ ${transações.valor}`

    const DateText = document.createElement('p')
    DateText.textContent = `Data: ${transações.data}`

    BoxDescription.append(Descriptiontext,ValueText,DateText)


    const BoxActions = document.createElement('div')
    BoxActions.classList.add('BoxActions')

    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.classList.add('btnDelete');
    btnDelete.textContent = '🗑️ Deletar';

    // Adiciona o id da transação ao botão de deletar
    btnDelete.setAttribute('data-id', transações.id);

    // Evento de click no botão de deletar
    btnDelete.addEventListener('click', async function () {
      
        const id = btnDelete.getAttribute('data-id');  // Recupera o id associado ao botão
        console.log("ID da transação a ser deletada:", id);
        await DeleteTransition(id);  // Passa o id para a função de deletar
       
    });

    const btnUpdate = document.createElement('button')
    btnUpdate.classList.add('btnUpdate')
    btnUpdate.textContent ='✏️ Editar'
    btnUpdate.addEventListener('click', async ()=> {
        console.log('Botão de Update Ativado')
    })

    BoxActions.append(btnUpdate,btnDelete)
    BoxMain.append(BoxDescription,BoxActions)

    document.querySelector("#ListTrasition").appendChild(BoxMain)

}

async function DeleteTransition(id) {
    try {
        const response = await fetch(`http://localhost:3000/transações/${id}`, {
            method: 'DELETE',
        });

        console.log(response.status);  // Verifique o código de status HTTP
        if (response.ok) {
            console.log('Transação deletada com sucesso');
            TransitionRead();  // Atualiza a lista após o delete
        } else {
            throw new Error('Falha ao deletar a transação');
        }
    } catch (error) {
        alert(` ${error}`);
    }
}



/* Função Assincrona que lê e retorna cada objeto do array  */
async function TransitionRead(){
    const transitions = await fetch ("http://localhost:3000/transa%C3%A7%C3%B5es").then(res => res.json())
    transitions.forEach(CreateBoxtransition);
}

document.addEventListener('DOMContentLoaded',()=>{
    TransitionRead()
})

/* Função assincrona para enviar dados ao db.json  */
async function AddNewTransition() {
    const description = document.getElementById('DescriptionTransition').value;  
    const valor = parseFloat(document.getElementById('ValueTransition').value);  
    const date = document.getElementById('DateTransition').value;
  
  
    // Verificar se o valor é válido antes de fazer a requisição
    if (isNaN(valor) || typeof description !== "string") {
      throw new Error("Por favor, insira um valores válidos");
     
    }
  
    try {
      const response = await fetch("http://localhost:3000/transações", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          descricao: description,
          valor: valor,  // Já convertendo para número antes de enviar
          data: date
        })
      });
  
      const data = await response.json();
      console.log(data);  // Exibir a resposta do servidor (geralmente com o 'id' gerado)
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
      alert('Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.');
    }
  }
  
  
  /* Evitar o comportamento padrão do Form */
document.querySelector('form').addEventListener('submit',(ev)=>{
    ev.preventDefault()
    AddNewTransition()
    })
    
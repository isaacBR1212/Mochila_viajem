const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'] ;
    const quantidade = evento.target.elements['quantidade'] ;

    const existe = itens.find(elemento => elemento.nome === nome.value );


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value 
    }

    if (existe) {
        itemAtual.id = existe.id
        

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else{

        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }
     

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "" ;
    quantidade.value = "" ;

});

function criaElemento(item){
   const novoItem = document.createElement('li');
   novoItem.classList.add("item"); //O classList cria uma classe para o novo item criado

   const numeroItem = document.createElement('strong'); // Cria um evento utilizando o strong
   numeroItem.innerHTML = item.quantidade; // modifica o elemento escolhido no evento  para quantidades
   numeroItem.dataset.id = item.id;      
   novoItem.appendChild(numeroItem); 

   novoItem.innerHTML += item.nome; // Esse comando esta adicionando o nome junto com a quantidade

   novoItem.appendChild(botaoDeleta(item.id))
   
   lista.appendChild(novoItem); // Esse comando juntou colocou o elemendo lista dentro do elemento novoItem

 
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade ;

}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        DeletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function DeletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}



var carrinhoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
   
    var botaoEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botaoEliminarItem.length; i++){
        var button = botaoEliminarItem[i];
        button.addEventListener('click',eliminarItemcarrinho);
    }

    
    var botaoSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botaoSumarCantidad.length; i++){
        var button = botaoSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     
    var botaoRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botaoRestarCantidad.length; i++){
        var button = botaoRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    
    var botaoAgregarAlcarrinho = document.getElementsByClassName('botao-item');
    for(var i=0; i<botaoAgregarAlcarrinho.length;i++){
        var button = botaoAgregarAlcarrinho[i];
        button.addEventListener('click', agregarAlcarrinhoClicked);
    }

    
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

function pagarClicked(){
    alert("Obrigado pela Compra");
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    while (carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild)
    }
    actualizarTotalcarrinho();
    ocultarcarrinho();
}
function agregarAlcarrinhoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preco = item.getElementsByClassName('preco-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlcarrinho(titulo, preco, imagenSrc);

    carrinhovisivel();
}
function carrinhovisivel(){
    carrinhoVisible = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items = document.getElementsByClassName('itens')[0];
    items.style.width = '60%';
}

function agregarItemAlcarrinho(titulo, preco, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemscarrinho = document.getElementsByClassName('carrinho-items')[0];

    var nombresItemscarrinho = itemscarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nombresItemscarrinho.length;i++){
        if(nombresItemscarrinho[i].innerText==titulo){
            alert("Esse item já está no carrinho");
            return;
        }
    }

    var itemcarrinhoContenido = `
        <div class="carrinho-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrinho-item-detalles">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrinho-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrinho-item-preco">${preco}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemcarrinhoContenido;
    itemscarrinho.append(item);
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemcarrinho);

    var botaoRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botaoRestarCantidad.addEventListener('click',restarCantidad);

    var botaoSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botaoSumarCantidad.addEventListener('click',sumarCantidad);

    atualizarTotalcarrinho();
}
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrinho-item-cantidad')[0].value = cantidadActual;
    atualizarTotalcarrinho();
}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrinho-item-cantidad')[0].value = cantidadActual;
        atualizarTotalcarrinho();
    }
}

function eliminarItemcarrinho(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    atualizarTotalcarrinho();

    ocultarcarrinho();
}
function ocultarcarrinho(){
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carrinhoItems.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carrinhoVisible = false;
    
        var items =document.getElementsByClassName('itens')[0];
        items.style.width = '100%';
    }
}
function atualizarTotalcarrinho(){
    var carrinhoContenedor = document.getElementsByClassName('carrinho')[0];
    var carrinhoItems = carrinhoContenedor.getElementsByClassName('carrinho-item');
    var total = 0;
    for(var i=0; i< carrinhoItems.length;i++){
        var item = carrinhoItems[i];
        var precoElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        var preco = parseFloat(precoElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrinho-item-cantidad')[0];
        console.log(preco);
        var cantidad = cantidadItem.value;
        total = total + (preco * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrinho-preco-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}
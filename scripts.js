function searchProducts() {
    // Obtém o valor digitado na barra de pesquisa
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase(); // Converte o texto para minúsculas para uma busca case-insensitive
    var products = document.getElementsByClassName("produto");
    var noResultsMessage = document.getElementById("noResultsMessage");
    var found = false;

    // Itera sobre os produtos e esconde os que não correspondem ao filtro
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var productName = product.getElementsByTagName("h3")[0].textContent.toLowerCase(); // Obtém o nome do produto

        // Verifica se o nome do produto contém o texto da pesquisa
        if (productName.indexOf(filter) > -1) {
            product.style.display = ""; // Exibe o produto
            found = true;
        } else {
            product.style.display = "none"; // Esconde o produto
        }
    }

    // Exibe ou esconde a mensagem de "Nenhum produto encontrado"
    if (noResultsMessage) {
        noResultsMessage.style.display = found ? "none" : "block";
    }
}

// Adiciona o evento de 'input' para realizar a pesquisa enquanto o usuário digita
document.getElementById("searchInput").addEventListener("input", searchProducts);

document.addEventListener('DOMContentLoaded', function () {
    const horaInput = document.getElementById('horario');
    const dataInput = document.getElementById('data');

    // Função para bloquear horários
    function bloquearHorarios() {
        const startTime1 = "08:00";
        const endTime1 = "11:00";
        const startTime2 = "13:00";
        const endTime2 = "17:00";

        // Definir o horário mínimo (não permitir agendar no passado)
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const minTime = `${currentHours}:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}`;
        
        // Atualiza o atributo min do horário para o horário atual
        horaInput.min = minTime;

        // Verifica se o horário selecionado está dentro dos intervalos permitidos
        horaInput.addEventListener('input', function () {
            const selectedTime = horaInput.value;

            // Condições para bloquear horários fora dos intervalos definidos
            if (
                (selectedTime < startTime1 || selectedTime > endTime1) && 
                (selectedTime < startTime2 || selectedTime > endTime2)
            ) {
                alert("Escolha um horário entre 08:00-11:00 ou 13:00-17:00.");
                horaInput.value = ''; // Limpa o campo caso o horário seja inválido
            }
        });

        // Definir o horário máximo para o agendamento
        horaInput.max = endTime2; // Limita até 17:00
    }

    // Função para bloquear datas anteriores
    function bloquearDatas() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Janeiro é 0, por isso soma 1
        const year = today.getFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        
        // Define o valor mínimo para o campo de data (não permite datas passadas)
        dataInput.setAttribute('min', formattedDate);
    }

    // Executa as funções de bloqueio
    bloquearHorarios();
    bloquearDatas();
});
window.addEventListener("resize", function() {
    if (window.innerWidth < 600) {
        document.body.style.backgroundColor = "#f0f0f0";
    } else {
        document.body.style.backgroundColor = "white";
    }
});

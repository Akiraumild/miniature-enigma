// itens.js
const itens disponiveis = ["Casco Verde", "Casco Vermelho", "Banana", "Cogumelo", "Estrela"];

export function sortearItem() {
    const index = Math.floor(Math.random() * itensDisponiveis.length);
    return itensDisponiveis[index];
}

export function aplicarEfeitoItem(item, usador, alvo) {
    console.log(`\n📦 ${usador.nome} conseguiu um(a) **${item}**!`);
    
    switch (item) {
        case "Casco Verde":
        case "Casco Vermelho":
            console.log(`🐢 ${usador.nome} lançou o casco em ${alvo.nome}! ${alvo.nome} perdeu 2 pontos.`);
            alvo.pontos = Math.max(0, alvo.pontos - 2);
            break;
        case "Banana":
            console.log(`🍌 ${usador.nome} deixou uma banana. ${alvo.nome} escorregou e perdeu 1 ponto.`);
            alvo.pontos = Math.max(0, alvo.pontos - 1);
            break;
        case "Cogumelo":
            console.log(`🍄 ${usador.nome} usou o Cogumelo e ganhou um impulso de +2 pontos!`);
            usador.pontos += 2;
            break;
        case "Estrela":
            console.log(`⭐ ${usador.nome} pegou a Estrela! Invencível! Ganhou +3 pontos.`);
            usador.pontos += 3;
            break;
    }
}
// index.js
import readline from 'readline';
import { personagens, rolarDado } from './personagens.js';
import { sortearItem, aplicarEfeitoItem } from './itens.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função utilitária para dar uma pausa dramática no terminal
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function iniciarCorrida(jogador, rival) {
    console.clear();
    console.log(`🏁 A corrida vai começar! **${jogador.nome}** VS **${rival.nome}** 🏁\n`);
    await delay(1500);

    const tiposBloco = ["RETA", "CURVA", "CONFRONTO"];

    // Simulação de 5 rodadas
    for (let rodada = 1; rodada <= 5; rodada++) {
        console.log(`--- 🏁 Rodada ${rodada} ---`);
        const blocoAtual = tiposBloco[Math.floor(Math.random() * tiposBloco.length)];
        console.log(`Pista: Um bloco de **${blocoAtual}** apareceu!`);

        // Rolagem de dados
        const dadoJogador = rolarDado();
        const dadoRival = rolarDado();

        let resultadoJogador = 0;
        let resultadoRival = 0;

        if (blocoAtual === "RETA") {
            resultadoJogador = dadoJogador + jogador.velocidade;
            resultadoRival = dadoRival + rival.velocidade;
            console.log(`🏎️ ${jogador.nome}: Dado(${dadoJogador}) + Vel(${jogador.velocidade}) = ${resultadoJogador}`);
            console.log(`🏎️ ${rival.nome}: Dado(${dadoRival}) + Vel(${rival.velocidade}) = ${resultadoRival}`);
        } 
        else if (blocoAtual === "CURVA") {
            resultadoJogador = dadoJogador + jogador.manobrabilidade;
            resultadoRival = dadoRival + rival.manobrabilidade;
            console.log(`🕹️ ${jogador.nome}: Dado(${dadoJogador}) + Manob(${jogador.manobrabilidade}) = ${resultadoJogador}`);
            console.log(`🕹️ ${rival.nome}: Dado(${dadoRival}) + Manob(${rival.manobrabilidade}) = ${resultadoRival}`);
        } 
        else if (blocoAtual === "CONFRONTO") {
            resultadoJogador = dadoJogador + jogador.poder;
            resultadoRival = dadoRival + rival.poder;
            console.log(`🥊 ${jogador.nome}: Dado(${dadoJogador}) + Pod(${jogador.poder}) = ${resultadoJogador}`);
            console.log(`🥊 ${rival.nome}: Dado(${dadoRival}) + Pod(${rival.poder}) = ${resultadoRival}`);
        }

        // Verificação de quem pontua na rodada
        if (resultadoJogador > resultadoRival) {
            console.log(`🏆 ${jogador.nome} venceu o bloco!`);
            jogador.pontos++;
            
            // Chance de pegar item (40%)
            if (Math.random() < 0.4) {
                const item = sortearItem();
                aplicarEfeitoItem(item, jogador, rival);
            }
        } else if (resultadoRival > resultadoJogador) {
            console.log(`🏆 ${rival.nome} venceu o bloco!`);
            rival.pontos++;
            
            // Chance de pegar item (40%)
            if (Math.random() < 0.4) {
                const item = sortearItem();
                aplicarEfeitoItem(item, rival, jogador);
            }
        } else {
            console.log("⚖️ Empate total! Ninguém pontua.");
        }

        console.log(`\nPlacar atual: ${jogador.nome}: ${jogador.pontos} pts | ${rival.nome}: ${rival.pontos} pts\n`);
        await delay(2500);
    }

    // Fim da corrida
    console.log("=============================");
    console.log("🏁 FIM DA CORRIDA! 🏁");
    console.log(`Resultado Final:\n${jogador.nome}: ${jogador.pontos} pontos\n${rival.nome}: ${rival.pontos} pontos`);
    
    if (jogador.pontos > rival.pontos) {
        console.log(`\n🎉 PARABÉNS! Você (${jogador.nome}) venceu a corrida! 🏆`);
    } else if (rival.pontos > jogador.pontos) {
        console.log(`\n😢 Que pena! ${rival.nome} cruzou a linha de chegada primeiro.`);
    } else {
        console.log("\n🤝 Incrível! A corrida terminou em um empate técnico!");
    }
    
    rl.close();
}

function menuSelecao() {
    console.log("=== 🏎️ MARIO KART TERMINAL SIMULATOR 🏎️ ===");
    console.log("Escolha o seu corredor:");
    
    personagens.forEach((p, idx) => {
        console.log(`${idx + 1}. ${p.nome} [Velocidade: ${p.velocidade} | Manobrabilidade: ${p.manobrabilidade} | Poder: ${p.poder}]`);
    });

    rl.question('\nDigite o número do seu personagem: ', (resposta) => {
        const escolhaIdx = parseInt(resposta) - 1;

        if (isNaN(escolhaIdx) || escolhaIdx < 0 || escolhaIdx >= personagens.length) {
            console.log("Escolha inválida! Tente novamente.\n");
            return menuSelecao();
        }

        const jogador = personagens[escolhaIdx];
        
        // Sorteia um rival diferente do jogador escolhido
        let restoDisponivel = personagens.filter((_, idx) => idx !== escolhaIdx);
        const rival = restoDisponivel[Math.floor(Math.random() * restoDisponivel.length)];

        iniciarCorrida(jogador, rival);
    });
}

menuSelecao();
// personagens.js
export const personagens = [
    { nome: "Mario", velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
    { nome: "Luigi", velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
    { nome: "Peach", velocidade: 3, manobrabilidade: 5, poder: 2, pontos: 0 },
    { nome: "Bowser", velocidade: 5, manobrabilidade: 2, poder: 5, pontos: 0 },
    { nome: "Donkey Kong", velocidade: 4, manobrabilidade: 2, poder: 5, pontos: 0 },
    { nome: "Yoshi", velocidade: 2, manobrabilidade: 5, poder: 3, pontos: 0 }
];

export function rolarDado() {
    return Math.floor(Math.random() * 6) + 1;
}
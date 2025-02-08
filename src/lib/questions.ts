export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  value: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correctAnswer: 2,
    value: 1000,
  },
  {
    id: 2,
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"],
    correctAnswer: 1,
    value: 2000,
  },
  {
    id: 3,
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Marte", "Saturno", "Júpiter"],
    correctAnswer: 3,
    value: 5000,
  },
  // Adicione mais perguntas aqui...
];

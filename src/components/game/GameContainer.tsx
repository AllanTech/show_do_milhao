import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question, questions } from "@/lib/questions";
import { supabase } from "@/lib/supabase";

interface GameContainerProps {
  userId: string;
  onGameEnd: (prize: number) => void;
}

export const GameContainer = ({ userId, onGameEnd }: GameContainerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [totalPrize, setTotalPrize] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = async (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQuestion.correctAnswer) {
      const newPrize = totalPrize + currentQuestion.value;
      setTotalPrize(newPrize);

      if (currentQuestionIndex === questions.length - 1) {
        await endGame(newPrize);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
        }, 1500);
      }
    } else {
      await endGame(totalPrize);
    }
  };

  const endGame = async (finalPrize: number) => {
    setGameEnded(true);

    // Salvar o resultado no Supabase
    await supabase.from("games").insert({
      user_id: userId,
      prize_amount: finalPrize,
    });

    onGameEnd(finalPrize);
  };

  if (gameEnded) {
    return (
      <Card className="p-6 max-w-2xl mx-auto bg-background">
        <h2 className="text-2xl font-bold text-center mb-4">Fim de Jogo!</h2>
        <p className="text-center text-xl mb-4">
          Você ganhou: R$ {totalPrize.toLocaleString()}
        </p>
        <Button onClick={() => onGameEnd(totalPrize)} className="w-full">
          Voltar ao Menu
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-background">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium">
            Prêmio atual: R$ {totalPrize.toLocaleString()}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={
                selectedAnswer === index
                  ? index === currentQuestion.correctAnswer
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className="w-full text-left justify-start"
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GameContainer;

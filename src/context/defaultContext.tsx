import React, { createContext, useContext, useEffect, useState } from "react";
export type Question = {
  question?: string;
  answer?: string;
  isCorrect?: string;
};
export type Quiz = {
  date?: string;
  category?: any;
  questions?: Question[];
};
export interface IQuizContext {
  globalQuiz: Quiz;
  updateGlobalQuiz(globalQuiz: Quiz): void | undefined;
  resetGlobalQuiz(): void | undefined;
}

const QuizContext = createContext<IQuizContext>({
  globalQuiz: {
    date: new Date().toISOString(),
  },
  updateGlobalQuiz: () => {},
  resetGlobalQuiz: () => {},
});
export const useGlobalQuiz = () => useContext(QuizContext);

const QuizProvider = ({ children }: any) => {
  const [globalQuiz, setGlobalQuiz] = useState<Quiz>({
    date: new Date().toISOString(),
  });
  useEffect(() => {
    console.log("🚀 ~~~~~~~~~~~~ globalQuiz ~~~~~~~~~~~~ ", globalQuiz);
  }, [globalQuiz]);
  const updateGlobalQuiz = (globalQuiz: Quiz) => {
    if (globalQuiz) {
      setGlobalQuiz({ ...globalQuiz });
    } else {
      console.log("globalQuiz is undefined");
    }
  };

  const resetGlobalQuiz = () => {
    setGlobalQuiz({
      date: new Date().toISOString(),
    });
  };

  return (
    <QuizContext.Provider
      value={{
        globalQuiz,
        updateGlobalQuiz,
        resetGlobalQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export { QuizProvider, QuizContext };

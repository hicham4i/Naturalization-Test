import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonNavLink,
  createAnimation,
  IonIcon,
  IonItem,
  IonInput,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonList,
} from "@ionic/react";
import { caretBack, checkmark } from "ionicons/icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useGlobalQuiz } from "@/context/defaultContext";
import { QuizResult } from ".";

interface Props {
  cancelModal?: RefObject<HTMLIonModalElement>;
}
const Quiz: React.FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [list, setList] = useState<any[]>();
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [userAnswer, setUserAnswer] = useState("");
  const { globalQuiz, updateGlobalQuiz } = useGlobalQuiz();
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  const fetchData = async () => {
    setIsLoading(true);

    // const response = await fetch("/api/stripe_intent/list-method", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         customer: props.profile.stripe_customer,
    //     }),
    // });
    // const res = await response.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL!}/${globalQuiz.category.data}`
    );

    // If the fetch was successful
    if (response.ok) {
      // Parse the response to JSON
      const data = await response.json();
      console.log("🚀 ~~~~~~~~~~~~ fetchData ~~~~~~~~~~~~ data:", data);
      setList(data.questions);
      // Use the data...
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!globalQuiz.category) return;
    fetchData();
  }, [globalQuiz.category]);
  useEffect(() => {
    if (!list || !!currentQuestion) return;
    generateRandomQuestion();
  }, [list]);
  const generateRandomQuestion = () => {
    if (!list) return;
    const questions = list.filter((q) => !q.userAnswer);
    console.log(
      "🚀 ~~~~~~~~~~~~ generateRandomQuestion ~~~~~~~~~~~~ questions:",
      questions.length
    );
    setRemaining(questions.length - 1);
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };
  const toggleAccordion = () => {
    if (!accordionGroup.current) {
      return;
    }
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === "first") {
      nativeEl.value = undefined;
    }
  };
  const confirmAnswer = () => {
    if (!userAnswer) return;
    console.log("===========", userAnswer);
    toggleAccordion();
    currentQuestion.userAnswer = userAnswer;
    if (
      !!currentQuestion.answer.find(
        (a: string) => a.toLocaleLowerCase() === userAnswer.toLocaleLowerCase()
      )
    )
      currentQuestion.isCorrect = true;
    else currentQuestion.isCorrect = false;
    if (remaining > 0) {
      let newList = list!.map((item) => {
        if (item.question === currentQuestion.question) {
          return currentQuestion;
        } else {
          return item;
        }
      });
      setList(newList);
    } else {
      globalQuiz.questions = list;
      updateGlobalQuiz(globalQuiz);
    }
    setUserAnswer("");
    generateRandomQuestion();
  };
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="mr-3" slot="start">
            <IonBackButton text="" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle>
            {!!globalQuiz.category?.title && globalQuiz.category.title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="h-full flex flex-col">
          {currentQuestion && (
            <div>
              <h2 className="mb-5 text-xl">{currentQuestion.question}</h2>
              {/* <input type="text" placeholder="Your answer here" /> */}
              <IonItem>
                <IonInput
                  placeholder="Enter text"
                  value={userAnswer}
                  aria-label="answer"
                  onIonInput={(e) => setUserAnswer(`${e.target.value}`)}
                  clearInput={true}
                ></IonInput>
              </IonItem>
            </div>
          )}
          {remaining > 0 && (
            <IonButton
              disabled={!userAnswer}
              onClick={confirmAnswer}
              className="w-full mt-5"
              color={"dark"}
            >
              next
            </IonButton>
          )}
          {remaining === 0 && (
            <IonNavLink
              className=""
              routerDirection="forward"
              component={() => <QuizResult questions={list} />}
            >
              <IonButton
                onClick={confirmAnswer}
                className="w-full mt-5"
                color={"dark"}
              >
                show result
              </IonButton>
            </IonNavLink>
          )}
          {/* <button onClick={generateRandomQuestion}>
            Generate Random Question
          </button>
          <button onClick={() => setUserAnswer("")}>Clear Answer</button> */}
          <IonAccordionGroup ref={accordionGroup} className="mt-auto mb-10">
            <IonAccordion value="first">
              <IonItem slot="header" color="light">
                <IonLabel>show answers</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonList>
                  {!!currentQuestion &&
                    currentQuestion.answer.map((answer: string, i: number) => (
                      <IonItem key={`answer-${i}`}>
                        <IonLabel>{answer}</IonLabel>
                      </IonItem>
                    ))}
                </IonList>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>
      </IonContent>
    </>
  );
};

export { Quiz };

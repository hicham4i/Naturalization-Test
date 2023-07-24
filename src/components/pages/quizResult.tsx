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
import { Meter } from "../ui/meter";

interface Props {
  questions?: any[];
}
const QuizResult: React.FC<Props> = () => {
  const { globalQuiz, updateGlobalQuiz } = useGlobalQuiz();

  const confirm = () => {};
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiz result</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Meter questions={globalQuiz.questions} />
      </IonContent>
    </>
  );
};

export { QuizResult };

import React, { RefObject, useEffect, useState } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { checkmark } from "ionicons/icons";

import {
  IonNavLink,
  IonItem,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  createAnimation,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { Quiz } from ".";
import { useGlobalQuiz } from "@/context/defaultContext";

interface Props {
  cancelModal?: RefObject<HTMLIonModalElement>;
}
const Categories: React.FC<Props> = ({ cancelModal }) => {
  //   const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>();
  const { globalQuiz, updateGlobalQuiz } = useGlobalQuiz();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log("🚀 ~~~~~~~~~~~~ fetchData ~~~~~~~~~~~~ res:", res);
      setCategories(res);
    };
    fetchData();
  }, []);
  const selectCat = (cat: any) => {
    globalQuiz.category = cat;
    updateGlobalQuiz(globalQuiz);
  };

  //   useEffect(() => {
  //     if (!isNextOpen) return;
  //     const animation = createAnimation()
  //       .addElement(document.querySelector(".nextButton")!)
  //       .duration(300)
  //       .iterations(1)
  //       .fromTo("transform", "translateY(100px)", "translateY(0px)")
  //       .fromTo("opacity", "0", "1");

  //     animation.play();
  //   }, [isNextOpen]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="pl-1 text-left">Choose a category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding col-12">
        {!!categories &&
          categories.map((category, i) => (
            <IonNavLink
              key={i}
              className=""
              routerDirection="forward"
              component={() => <Quiz />}
            >
              <IonItem onClick={() => selectCat(category)} button>
                <div>
                  <IonLabel className="my-2">{category.title}</IonLabel>
                  {/* <p className="text-xs mb-2">{category.description}</p> */}
                </div>
              </IonItem>
            </IonNavLink>
          ))}
      </IonContent>
    </>
  );
};

export { Categories };

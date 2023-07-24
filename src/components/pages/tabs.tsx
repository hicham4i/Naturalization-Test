import { useRef } from "react";

import { IonContent, IonButton, IonModal, IonNav } from "@ionic/react";
import Image from "next/image";
import { Categories } from "@/components/pages";

const Tabs = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonContent className="">
      <div className="bg-[#1e1e1d] p-4 h-full pt-20">
        <Image
          className="rounded-full m-auto "
          src="/wolfs-home-splashscreen.jpeg"
          alt="Vercel Logo"
          width={300}
          height={300}
        />
        <IonButton
          color="neutral"
          className="mt-16 capitalize"
          id="open-modal"
          expand="block"
        >
          start Now
        </IonButton>
      </div>
      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className="mainModal"
      >
        <div className="mainModal_block">
          <IonContent className="pb-[15vh]">
            <IonNav
              root={() => (
                <>
                  <Categories />
                </>
              )}
            ></IonNav>
          </IonContent>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default Tabs;

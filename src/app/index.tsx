import { useEffect, useState } from "react";
import { Add, Map } from "../component";
import styles from "./App.module.scss";
import { Context } from "../context";
import { Obj } from "../ts";
import ky from "ky";

export const App: React.FC = () => {
  const [massive, setMassive] = useState<Obj[]>([]);
  const [change, setChange] = useState<number | null>(null);

  useEffect(() => {
    if (!massive) return;
    const data = async () => {
      let data: Obj[] = await ky
        .get(process.env.REACT_APP_SITE + "/" + process.env.REACT_APP_DATA)
        .json();
      setMassive(data);
    };
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      let element = event.target as HTMLElement;
      
      if (element.className === styles.background) {
        return setChange(null);
      }
    };

    document.addEventListener("click", (event) => handleClick(event));

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <Context.Provider value={{ massive, setMassive, change, setChange }}>
      <div className={styles.background}>
        <Add />
        <div className={styles.container}>
          <Map />
        </div>
      </div>
    </Context.Provider>
  );
};

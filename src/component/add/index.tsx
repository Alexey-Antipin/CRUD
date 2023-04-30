import { useState, useContext } from "react";
import { ContextType, Obj } from "../../ts";
import { Context } from "../../context";
import styles from "./Add.module.scss";
import ky from "ky";

export const Add: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { massive, setMassive } = useContext(Context) as ContextType;

  const newItem = async () => {
    let newId = 0;
    let lengthArr = massive[massive.length - 1];

    if (lengthArr) {
      newId = massive[massive.length - 1].id;
    }

    const obj = {
      id: newId + 1,
      title: value.slice(0, 28),
    };

    await ky.post(
      process.env.REACT_APP_SITE + "/" + process.env.REACT_APP_DATA,
      {
        json: obj,
      }
    );

    setMassive((arr: Obj[]) => [...arr, obj]);
    setValue("");
  };

  return (
    <div className={styles.block}>
      <input
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className={styles.button} onClick={() => newItem()}>
        Добавить
      </button>
    </div>
  );
};

import { useState, useContext } from "react";
import { Context } from "../../context";
import { ContextType } from "../../ts";
import styles from "./Map.module.scss";
import ky from "ky";

export const Map: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { massive, setMassive, change, setChange } = useContext(
    Context
  ) as ContextType;

  const openItem = async (id: number) => {
    change === id ? setChange(null) : setChange(id);
    setValue("");
  };

  const updateItem = async (id: number) => {
    let obj = {
      id: id,
      title: value,
    };

    await ky.put(
      process.env.REACT_APP_SITE + "/" + process.env.REACT_APP_DATA + "/" + id,
      { json: obj }
    );
    let newList = massive.map((item) => (item.id === id ? obj : item));

    setMassive(newList);
    setChange(null);
  };

  const removeItem = async (id: number) => {
    await ky.delete(
      process.env.REACT_APP_SITE + "/" + process.env.REACT_APP_DATA + "/" + id
    );
    let data = massive.filter((item) => item.id !== id);
    setMassive(data);
  };

  return (
    <div className={styles.container}>
      {massive.map((item) => (
        <div className={styles.content} key={item.id}>
          <div className={styles.block}>
            <div className={styles.text}>{item.id}</div>
            <div className={styles.text}>{item.title}</div>
            <button className={styles.button} onClick={() => openItem(item.id)}>
              Обновить
            </button>
            <button
              className={styles.button}
              onClick={() => removeItem(item.id)}>
              Удалить
            </button>
          </div>
          {change === item.id && (
            <div className={styles.redaction}>
              <input
                className={styles.input}
                onChange={(event) => setValue(event.target.value)}
                value={value}
              />
              <button
                className={styles.done}
                onClick={() => updateItem(item.id)}>
                Принять изменение
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

import { useState } from "react";

export const Paginacion = ({ pagina, setPagina, maximo }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };

  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setPagina(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPagina(1);
        setInput(1);
      } else {
        setPagina(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex items-center justify-center h-fit gap-2">
      <button
        disabled={pagina === 1 || pagina < 1}
        onClick={prevPage}
        className="px-2 py-1 bg-gray-900 text-white rounded-md disabled:bg-gray-800 disabled:cursor-no-drop"
      >
        Prev
      </button>
      <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={input}
        className="rounded-md w-7 text-center h-7 border border-gray-800"
      />
      <p className="text-white font-semibold">de {maximo}</p>
      <button
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={nextPage}
        className="px-2 py-1 bg-gray-900 text-white rounded-md disabled:bg-gray-800 disabled:cursor-no-drop"
      >
        Next
      </button>
    </div>
  );
};

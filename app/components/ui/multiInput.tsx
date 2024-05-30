import { useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface MultiInputProps {
  name: string;
  error?: string;
  placeholder?: string;
  values?: string[];
}

export const MultiInput = ({
  name,
  placeholder,
  error,
  values,
}: MultiInputProps) => {
  const elementsRef = useRef<HTMLInputElement>(null);

  const [elements, setElements] = useState<string[]>(values || []);

  const handleAddElement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (elementsRef?.current?.value) {
      setElements([...elements, elementsRef.current.value]);
      elementsRef.current.value = "";
    }
  };

  const handleRemoveElement = (
    e: React.FormEvent<HTMLButtonElement>,
    element: string,
  ) => {
    e.preventDefault();

    setElements(elements.filter((g) => g !== element));
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-3">
        <Input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          ref={elementsRef}
          aria-invalid={error ? true : undefined}
          aria-errormessage={error ? "descripcion-error" : undefined}
        />
        <Button type="button" onClick={handleAddElement}>
          Agregar
        </Button>
      </div>
      <div className="flex w-full flex-row space-x-2">
        {elements.map((element) => (
          <div key={element}>
            <div className="flex flex-row space-x-3 items-center bg-zinc-950 px-4 py-1 rounded-full text-zinc-100">
              <p>{element}</p>
              <button
                className="mb-1"
                onClick={(e) => handleRemoveElement(e, element)}
              >
                x
              </button>
            </div>
            <input type="hidden" name={`${name}[]`} value={element} />
          </div>
        ))}
      </div>
      {error ? (
        <div className="pt-1 h-8 text-red-700" id="avatar-error">
          {error}
        </div>
      ) : (
        <div className="pt-1 h-8"></div>
      )}
    </>
  );
};

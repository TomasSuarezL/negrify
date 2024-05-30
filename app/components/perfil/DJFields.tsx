import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MultiInput } from "../ui/multiInput";

const FIELDS = ["descripcion", "rate", "generos", "referencias"] as const;

type DjFieldsProps = {
  [key in (typeof FIELDS)[number]]: {
    value?: string | string[];
    error?: string;
  };
};

const DJFields = ({
  descripcion,
  rate,
  generos,
  referencias,
}: DjFieldsProps) => {
  return (
    <>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="descripcion">Descripcion</Label>
        <Input
          type="text"
          id="descripcion"
          name="descripcion"
          placeholder="Descripcion"
          defaultValue={descripcion.value}
          aria-invalid={descripcion.error ? true : undefined}
          aria-errormessage={
            descripcion.error ? "descripcion-error" : undefined
          }
        />
        {descripcion.error ? (
          <div className="pt-1 min-h-8 text-red-700" id="avatar-error">
            {descripcion.error}
          </div>
        ) : (
          <div className="pt-1 min-h-8"></div>
        )}
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="rate">Precio Por Hora</Label>
        <Input
          type="number"
          step="any"
          id="rate"
          name="rate"
          defaultValue={rate.value}
          placeholder="Precio por hora"
          aria-invalid={rate.error ? true : undefined}
          aria-errormessage={rate.error ? "descripcion-error" : undefined}
        />

        {rate.error ? (
          <div className="pt-1 min-h-8 text-red-700" id="avatar-error">
            {rate.error}
          </div>
        ) : (
          <div className="pt-1 min-h-8"></div>
        )}
      </div>
      <Label htmlFor="generos">Generos</Label>
      <MultiInput
        name="generos"
        placeholder="Generos"
        error={generos.error}
        values={Array.isArray(generos.value) ? generos.value : []}
      />
      <Label htmlFor="referencias">Referencias</Label>
      <MultiInput
        name="referencias"
        placeholder="Artistas referencias"
        error={referencias.error}
        values={Array.isArray(referencias.value) ? referencias.value : []}
      />
    </>
  );
};

export default DJFields;

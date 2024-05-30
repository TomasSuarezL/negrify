import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FIELDS = [
  "nombre",
  "apellido",
  "pais",
  "ciudad",
  "direccion",
  "avatar",
] as const;

type ClienteFieldsProps = {
  [key in (typeof FIELDS)[number]]: {
    value?: string;
    error?: string;
  };
};

const ClienteFields = ({
  nombre,
  apellido,
  pais,
  avatar,
  ciudad,
  direccion,
}: ClienteFieldsProps) => {
  return (
    <>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          role="textbox"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          defaultValue={nombre.value}
          aria-invalid={nombre.error ? true : undefined}
          aria-errormessage={nombre.error ? "nombre-error" : undefined}
        />
        {nombre.error ? (
          <div className="pt-1 min-h-8 text-red-700" id="nombre-error">
            {nombre.error}
          </div>
        ) : (
          <div className="pt-1 min-h-8"></div>
        )}
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="apellido">Apellido</Label>
        <Input
          type="text"
          id="apellido"
          name="apellido"
          defaultValue={apellido.value}
          placeholder="Apellido"
          aria-invalid={apellido.error ? true : undefined}
          aria-errormessage={apellido.error ? "apellido-error" : undefined}
        />
        {apellido.error ? (
          <div className="pt-1 min-h-8 text-red-700" id="apellido-error">
            {apellido.error}
          </div>
        ) : (
          <div className="pt-1 min-h-8"></div>
        )}
      </div>
      <div className="flex flex-row w-full items-center space-x-2">
        <div className="flex-1 grid items-center gap-1.5">
          <Label htmlFor="pais">Pais</Label>
          <Input
            type="text"
            id="pais"
            name="pais"
            placeholder="Pais"
            defaultValue={pais.value}
            aria-invalid={pais.error ? true : undefined}
            aria-errormessage={pais.error ? "pais-error" : undefined}
          />
          {pais.error ? (
            <div className="pt-1 min-h-8 text-red-700" id="pais-error">
              {pais.error}
            </div>
          ) : (
            <div className="pt-1 min-h-8"></div>
          )}
        </div>
        <div className="flex-1 grid items-center gap-1.5">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            type="text"
            id="ciudad"
            name="ciudad"
            defaultValue={ciudad.value}
            placeholder="Ciudad"
            aria-invalid={ciudad.error ? true : undefined}
            aria-errormessage={ciudad.error ? "ciudad-error" : undefined}
          />
          {ciudad.error ? (
            <div className="pt-1 min-h-8 text-red-700" id="ciudad-error">
              {ciudad.error}
            </div>
          ) : (
            <div className="pt-1 min-h-8"></div>
          )}
        </div>
        <div className="flex-1 grid items-center gap-1.5">
          <Label htmlFor="direccion">Direccion</Label>
          <Input
            type="text"
            id="direccion"
            name="direccion"
            defaultValue={direccion.value}
            placeholder="Direccion"
            aria-invalid={direccion.error ? true : undefined}
            aria-errormessage={direccion.error ? "direccion-error" : undefined}
          />
          {direccion.error ? (
            <div className="pt-1 min-h-8 text-red-700" id="direccion-error">
              {direccion.error}
            </div>
          ) : (
            <div className="pt-1 min-h-8"></div>
          )}
        </div>
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="avatar">Avatar</Label>
        <Input
          type="text"
          id="avatar"
          name="avatar"
          defaultValue={avatar.value}
          placeholder="Avatar"
          aria-invalid={avatar.error ? true : undefined}
          aria-errormessage={avatar.error ? "avatar-error" : undefined}
        />
        {avatar.error ? (
          <div className="pt-1 min-h-8 text-red-700" id="avatar-error">
            {avatar.error}
          </div>
        ) : (
          <div className="pt-1 min-h-8"></div>
        )}
      </div>
    </>
  );
};

export default ClienteFields;

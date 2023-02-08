import { PageTitle } from "@components/dashboard/PageTitle";
import { Button } from "@components/ui/Button";
import { CurrencyInput, Input, Label, TextArea } from "@components/ui/Form";

export default function NewService() {
  return (
    <div>
      <PageTitle title="Novo serviço" />

      <form className="form-control w-full max-w-xs mt-4 gap-2">
        <fieldset>
          <Label htmlFor="title">Título</Label>
          <Input type="text" id="title" />
        </fieldset>
        <fieldset>
          <Label htmlFor="description">Descrição</Label>
          <TextArea id="description" maxLength={200} />
        </fieldset>
        <fieldset>
          <Label htmlFor="duration">Duração</Label>
          <Input id="duration" />
        </fieldset>
        <fieldset>
          <Label htmlFor="value">Valor</Label>
          <CurrencyInput id="value" />
        </fieldset>

        <div className="mt-4">
          <Button type="submit" bg="accent">
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
}

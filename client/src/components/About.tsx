import { ExternalLink } from "./ui/ExternalLink";

interface Props {
  transparentBg: boolean;
}
export function About({ transparentBg }: Props) {
  return (
    <div className={`${!transparentBg ? "bg-base-300" : ""} flex items-center justify-center gap-6`}>
      <span className="text-9xl">🐈</span>
      <div className="prose text-justify">
        <h2>
          Olá, me chamo <ExternalLink href="https://www.linkedin.com/in/gust4vo-sales/">Gustavo</ExternalLink>.
        </h2>
        <p>
          Bem-vindo ao demo do meu sistema de Petshop! <br /> No meu tempo livre gosto de desenvolver e criar projetos,
          aproveitando para aprender novas tecnologias no processo. Este é mais um deles. Veja mais informações no{" "}
          <ExternalLink href="https://github.com/Gust4voSales/petshop-project">repositório</ExternalLink>.
        </p>
        <p className="italic">
          Aviso: Este é um projeto fictício, não vinculado a um negócio real. Hospedado gratuitamente e utilizando
          recursos e armazenamentos também gratuitos. Portanto, a performance pode ser impactada...
        </p>
        <p>Sinta-se à vontade para explorar e compartilhar feedback!</p>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "react-query";

let counter = 0;
async function fetchApi(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      counter++;
      resolve("TESTE > " + counter);
    }, 1000);
  });
}

export default function Dashboard() {
  const query = useQuery("fetchAPI", fetchApi);

  async function handleClick() {
    query.refetch();
  }

  return (
    <div className="w-full">
      <article className="prose">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <button className="btn" onClick={handleClick}>
          BUSCAR
        </button>
        <span className="text-xl font-bold">API DATA: {query.data ?? "buscando"}</span>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with
          the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for
          Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up
          around the country.
        </p>
      </article>
    </div>
  );
}

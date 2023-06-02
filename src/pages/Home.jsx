import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Home</h1>
      <button>Check</button>
    </>
  );
}

export default Home;

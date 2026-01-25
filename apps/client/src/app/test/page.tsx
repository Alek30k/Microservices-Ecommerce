const TestPage = async () => {
  const res = await fetch("http://localhost:8000/test");
  const data = await res.json();

  console.log(data);

  return <div className="">TestPage</div>;
};

export default TestPage;

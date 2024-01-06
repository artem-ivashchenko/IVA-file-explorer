import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex 
      flexDir='column' 
      minH='100vh'
    >
      <Header/>
      <Hero />
    </Flex>
  );
}

export default App;

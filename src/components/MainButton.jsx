import { Icon, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Overlay from "./Overlay";

const MainButton = ({ icon, text, handleClick = () => {} }) => {
  const pendingID = useSelector((state) => state.items.pendingID);

  return (
    <VStack
      position="relative"
      justify="center"
      w="125px"
      h="125px"
      bgColor="gray.200"
      border="0.5px solid gray.500"
      borderRadius="5px"
      transition="all 0.3s linear"
      _hover={{
        bgColor: "gray.300",
        cursor: "pointer",
      }}
      textAlign="center"
      onClick={handleClick}
    >
      <Icon as={icon} boxSize={14} />
      <Text as="b">{text}</Text>

      {pendingID === text && <Overlay />}
    </VStack>
  );
};

export default MainButton;

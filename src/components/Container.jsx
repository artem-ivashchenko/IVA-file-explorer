import { Box } from "@chakra-ui/react";

const Container = ({children, ...restProps}) => {
  return (
      <Box
        px={{base: 3, sm: 6}}
        maxW="1200px"
        mx="auto"
        w="100%"
        {...restProps}
      >
        {children}
      </Box>
  );
};

export default Container;

import { Box, Spinner } from "@chakra-ui/react"

const Overlay = () => {
  return (
    <Box
    display="flex"
    position="absolute"
    w="100%"
    h="100%"
    inset="0"
    bgColor="rgba(0, 0, 0, 0.3)"
    justifyContent="center"
    alignItems="center"
    zIndex="5"
    onClick={(e) => e.stopPropagation()}
  >
    <Spinner color="white" />
  </Box>
  )
}

export default Overlay;
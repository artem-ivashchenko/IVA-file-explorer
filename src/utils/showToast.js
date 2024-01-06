import { useToast } from "@chakra-ui/react";

const useToastUtil = () => {
  const toast = useToast();

  const showToast = (response) => {
    toast({
      title: response.error ? "Error has occured" : "Success",
      description: response.payload,
      status: response.error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const showToastErrorPromise = (response) => {
    if (response.error) {
      toast({
        title: "Error has occurred",
        description: response.payload,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const showToastErrorMessage = (message) => {
    toast({
      title: "Error has occurred",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return { showToast, showToastErrorPromise, showToastErrorMessage};
};

export default useToastUtil;

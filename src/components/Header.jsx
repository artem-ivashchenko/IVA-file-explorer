import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import {
  Box,
  HStack,
  Heading,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import Container from "./Container";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from '@mui/icons-material/Close';

import searchItem from "../store/thunk/searchitems";
import { setQuery } from "../store/slice/filterSlice";
import { clearFilteredItems, setLoading } from "../store/slice/itemSlice";

const Header = () => {
  const query = useSelector((state) => state.filters.query);
  const dispatch = useDispatch();
  const toast = useToast();
  const [rawQuery, setRawQuery] = useState("");

  const applyQuery = useCallback(
    debounce((value) => {
      dispatch(setQuery(value));
    }, 800),
    []
  );

  const handleQueryChange = (e) => {
    dispatch(setLoading(true));
    setRawQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleNotImplemented = () => {
    toast({
      title: 'Warning',
      description: 'Feature is not implemented',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    if (!query) {
      dispatch(setLoading(false));
      dispatch(clearFilteredItems());
      return;
    }

    dispatch(searchItem({ query }));
  }, [query]);

  return (
    <Box boxShadow="xl">
      <Container>
        <HStack py={3} justify="space-between" spacing={{base: 3, sm: 6}}>
          <HStack spacing={2}>
            <Icon as={CloudDoneIcon} boxSize={{ base: 8, md: 10}} />
            <Heading fontSize={{base: 18, sm: 26}}>IVA</Heading>
          </HStack>
          <InputGroup>
            <Input
              variant='filled'
              placeholder="Search..."
              value={rawQuery}
              onChange={handleQueryChange}
            />

            {rawQuery && (
              <InputRightElement>
                <IconButton 
                  size="sm" 
                  as={CloseIcon} 
                  color="gray.600" 
                  cursor='pointer'
                  onClick={() => {
                    setRawQuery('');
                    dispatch(setQuery(''))
                  }}
                />
              </InputRightElement>
            )}
          </InputGroup>
          <HStack>
            <IconButton variant="outline" icon={<NotificationsActiveIcon />} onClick={handleNotImplemented}/>
            <IconButton variant="outline" icon={<AccountCircleIcon />} onClick={handleNotImplemented}/>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;

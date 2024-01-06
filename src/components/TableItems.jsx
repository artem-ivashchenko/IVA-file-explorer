import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";

import TableRow from "./TableRow";

import {
  setPreview,
  setQuery,
  setSortField,
  setType,
} from "../store/slice/filterSlice";
import { setPath } from "../store/slice/pathSlice";
import { clearFilteredItems } from "../store/slice/itemSlice";
import fetchThumbs from "../store/thunk/fetchThumbs";
import fetchItems from "../store/thunk/fetchItems";
import getVisibleItems from "../utils/getVisibleItems";

const TableItems = () => {
  const { items, filteredItems, loading, errorAlert, upload } = useSelector(
    (state) => state.items
  );
  const { type, sortField, preview, query } = useSelector(
    (state) => state.filters
  );
  const path = useSelector((state) => state.path);

  const dispatch = useDispatch();
  const toast = useToast();

  const chosenItems = query ? filteredItems : items;
  const visibleItems = getVisibleItems(chosenItems, type, sortField);

  useEffect(() => {
    dispatch(clearFilteredItems());
    dispatch(setQuery(""));

    dispatch(fetchItems(path))
      .then((response) => {
        if (preview === "thumbs") {
          handleFetchThumbs(response.payload);
        }
      })
  }, [path, upload]);

  const handleTypeChange = (e) => {
    switch (e.target.value) {
      case "foldersFirst":
      case "filesFirst":
        dispatch(setSortField({ name: "type", value: e.target.value }));
        dispatch(setType(e.target.value));
        break;
      case "folder":
      case "file":
        dispatch(setType(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleFetchThumbs = (payload) => {
    dispatch(fetchThumbs({ items: payload || items })).then((response) => {
      if (response.error) {
        toast({
          title: "Error has occured",
          description: response.payload,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const handlePreviewChange = (e) => {
    dispatch(setPreview(e.target.value));

    if (e.target.value === "thumbs") {
      handleFetchThumbs();
    }
  };

  const handleMoveUp = () => {
    const pathSlice = path.split("/");
    pathSlice.pop();
    const result = pathSlice.join("/");
    dispatch(setPath(result));
  };

  if (loading) {
    return (
      <HStack justify="center" flexGrow={1}>
        <Spinner size="xl" />
      </HStack>
    );
  }

  return (
    <Box>
      <HStack display={{base:'flex',md: 'none'}}>
        <Heading fontSize={20}>Sorry, viewing table is only possible on desktop</Heading>
      </HStack>


      <Table variant="simple" display={{base:'none',md: 'table'}}>
        <Thead>
          <Tr>
            <Th>
              <Select
                variant="unstyled"
                placeholder="Preview"
                value="Preview"
                onChange={handlePreviewChange}
              >
                <option value="thumbs">Thumbnails</option>
                <option value="icons">Icons</option>
              </Select>
            </Th>
            <Th>
              <Select
                variant="unstyled"
                placeholder="Name"
                value="Name"
                onChange={(e) =>
                  dispatch(
                    setSortField({ name: "name", value: e.target.value })
                  )
                }
              >
                <option value="asc">From A to Z</option>
                <option value="desc">From Z to A</option>
              </Select>
            </Th>
            <Th>
              <Select
                variant="unstyled"
                placeholder="Type"
                value="Type"
                onChange={handleTypeChange}
              >
                <option value="foldersFirst">Folders first</option>
                <option value="filesFirst">Files first</option>
                <option value="folder">Folders</option>
                <option value="file">Files</option>
              </Select>
            </Th>
            <Th>
              <Select
                variant="unstyled"
                placeholder="Size"
                value="Size"
                onChange={(e) =>
                  dispatch(
                    setSortField({ name: "size", value: e.target.value })
                  )
                }
              >
                <option value="asc">Small first</option>
                <option value="desc">Large first</option>
              </Select>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {path && (
            <Tr
              bgColor="gray.100"
              w="100%"
              _hover={{
                bgColor: "gray.300",
                cursor: "pointer",
              }}
              transition="all 0.3s linear"
              onClick={handleMoveUp}
            >
              <Th>
                <Icon as={TurnSlightLeftIcon} />
                <Icon as={FolderCopyIcon} />
              </Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          )}

          {!errorAlert &&
            chosenItems.length > 0 &&
            visibleItems.map((item) => <TableRow key={item.id} item={item} />)}
        </Tbody>
      </Table>

      {!chosenItems.length && !errorAlert && !query && (
        <Flex w="100%" mt={3}>
          <Alert status="info" justifyContent="center">
            <AlertIcon />
            <AlertDescription>
              Seems like your folder is empty....
            </AlertDescription>
          </Alert>
        </Flex>
      )}

      {!chosenItems.length && !errorAlert && query && (
        <Flex w="100%" mt={3}>
          <Alert status="warning" justifyContent="center">
            <AlertIcon />
            <AlertDescription>
              There is no right match for the query...
            </AlertDescription>
          </Alert>
        </Flex>
      )}

      {errorAlert && (
        <Flex w="100%" mt={3}>
          <Alert status="error" justifyContent="center">
            <AlertIcon />
            <AlertTitle>Error ocurred!</AlertTitle>
            <AlertDescription>{errorAlert}</AlertDescription>
          </Alert>
        </Flex>
      )}
    </Box>
  );
};

export default TableItems;

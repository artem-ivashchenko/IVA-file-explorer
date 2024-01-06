import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Badge,
  Box,
  Button,
  Card,
  FormControl,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import Breadcrumbs from "./Breadcrumbs";
import MainButton from "./MainButton";
import Container from "./Container";
import TableItems from "./TableItems";
import Overlay from "./Overlay";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from "@mui/icons-material/Replay";
import InfoIcon from "@mui/icons-material/Info";

import fetchContent from "../store/thunk/fetchContent";
import createFolder from "../store/thunk/createFolder";
import fetchItems from "../store/thunk/fetchItems";
import addFile from "../store/thunk/addFile";

import { setPending, setUpload } from "../store/slice/itemSlice";
import trimStr from "../utils/trimStr";

const Hero = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const { items, pendingID } = useSelector((state) => state.items);
  const path = useSelector((state) => state.path);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenCreate]);

  const handleDownloadFolder = () => {
    return dispatch(fetchContent({ path, type: "folder" })).then((response) => {
      if (response.payload) {
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

  const handleCreateFolder = (e) => {
    e.preventDefault();
    let errormessage = "";

    if (!inputText) {
      errormessage = "Folder name must not be empty string";
    } else if (items.some((el) => trimStr(el.name) === trimStr(inputText))) {
      errormessage = "An item with such name already exists in this directory";
    }

    if (errormessage) {
      toast({
        title: "Error has occured",
        description: errormessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    dispatch(setPending(e.target.name));
    dispatch(createFolder({ path, name: inputText }))
      .then((response) => {
        toast({
          title: response.error ? "Error has occured" : "Success",
          description: response.payload,
          status: response.error ? "error" : "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsOpenCreate(false);
        dispatch(setPending(""));
        dispatch(fetchItems(path));
      });
  };

  const handleAddFile = (e) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (items.some((el) => trimStr(el.name) === trimStr(file.name))) {
      toast({
        title: "Error has occured",
        description: "File with such name already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    dispatch(addFile({ path: `${path}/${file.name}`, contents: file })).then(
      (response) => {
        handleRefresh();

        toast({
          title: response.error ? "Error has occured" : "Success",
          description: response.payload,
          status: response.error ? "error" : "success",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  const handleRefresh = () => {
    dispatch(setUpload());
  };

  const hadleOpenCreate = () => {
    setIsOpenCreate((prev) => !prev);
  };

  const handleInfo = () => {
    setIsOpenInfo((prev) => !prev);
  };

  return (
    <Container display="flex" flexDir="column" flexGrow={1} py={4}>
      <Card display="flex" p={6} boxShadow="xl" flexGrow={1}>
        <VStack
          align="stretch"
          gap={2}
          flexGrow={1}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Breadcrumbs />

          <HStack gap={6} flexWrap="wrap">
            <Box position="relative">
              <label htmlFor="fileInput">
                <input
                  type="file"
                  id="fileInput"
                  style={{
                    position: "absolute",
                    w: "100%",
                    h: "100%",
                    opacity: "0",
                  }}
                  onChange={handleAddFile}
                />
                <MainButton icon={AddIcon} text={"Add file"} />
              </label>
            </Box>
            <MainButton
              icon={CreateNewFolderIcon}
              text={"Create folder"}
              handleClick={hadleOpenCreate}
            />
            <MainButton
              icon={DownloadIcon}
              text={"Download folder"}
              handleClick={handleDownloadFolder}
            />
            <MainButton
              icon={ReplayIcon}
              text={"Refresh"}
              handleClick={handleRefresh}
            />

            <MainButton
              icon={InfoIcon}
              text={"Info"}
              handleClick={handleInfo}
            />
          </HStack>

          {isOpenCreate && (
            <form
              action="#"
              name="folderCreation"
              onSubmit={handleCreateFolder}
            >
              <FormControl display="flex" gap={4}>
                <Input
                  variant="filled"
                  type="text"
                  placeholder="Type the name of a new folder here..."
                  onChange={(e) => setInputText(e.target.value)}
                  ref={inputRef}
                />

                <Button type="submit" position="relative">
                  Create
                  {pendingID === "folderCreation" && <Overlay />}
                </Button>
              </FormControl>
            </form>
          )}

          <TableItems />
        </VStack>

        <Modal isOpen={isOpenInfo} onClose={handleInfo}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Info</ModalHeader>
              <ModalCloseButton />
              <ModalBody p={5}>
                <VStack>
                <Badge>
                    <Link href="https://www.loom.com/share/a7d35f718d294d9c88a638dfe790ca9e?sid=f7840aca-f0b8-4262-994b-d553b7287a38">
                      Quick overview of the app
                    </Link>
                  </Badge>
                  <Badge>
                    <Link href="https://www.loom.com/share/51ac05bb506e4d46a26ae5468b79589c?sid=99b2ba57-04f5-412a-b864-0dc2bbbcd02d">
                      Tutorial how to get access token
                    </Link>
                  </Badge>
                  <Text>Email: jeff.dbb.file.explorer@gmail.com</Text>
                  <Text>Password: dropboxFile1!</Text>

                  <Link href="https://www.dropbox.com/developers">
                    https://www.dropbox.com/developers
                  </Link>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
      </Card>
    </Container>
  );
};

export default Hero;

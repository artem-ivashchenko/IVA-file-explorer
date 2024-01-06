import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Badge,
  Box,
  Button,
  Card,
  FormControl,
  HStack,
  Heading,
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
import useToastUtil from "../utils/showToast";

const Hero = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(true);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const { items, pendingID } = useSelector((state) => state.items);
  const path = useSelector((state) => state.path);
  const dispatch = useDispatch();
  const { 
    showToast, 
    showToastErrorPromise, 
    showToastErrorMessage 
  } = useToastUtil();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenCreate]);

  const handleDownloadFolder = () => {
    dispatch(setPending("Download folder"));

    dispatch(fetchContent({ path, type: "folder" }))
      .then(showToastErrorPromise)
      .finally(() => dispatch(setPending("")));
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
      showToastErrorMessage(errormessage);
      return;
    }

    dispatch(setPending(e.target.name));
    dispatch(createFolder({ path, name: inputText }))
      .then(showToastErrorPromise)
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
      showToastErrorMessage("File with such name already exists");
      return;
    }

    dispatch(addFile({ path: `${path}/${file.name}`, contents: file })).then(
      (response) => {
        handleRefresh();

        showToast(response);
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
    <Container 
      display="flex" 
      flexDir="column" 
      flexGrow={1} 
      py={4}
    >
      <Card 
        display="flex" 
        flexGrow={1}
        p={6} 
        boxShadow="xl" 
      >
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
                <Heading 
                  textAlign='center' 
                  fontSize={18}
                  mb={8}
                >
                  ATTENTION! I AM NOT RESPONSIBLE FOR THE CONTENT IN MY APP, EVERYONE HAS ACCESS TO EDIT FILES AND FOLDERS
                </Heading>
                <Badge>
                  <Link 
                    href="https://www.loom.com/share/a7d35f718d294d9c88a638dfe790ca9e?sid=f7840aca-f0b8-4262-994b-d553b7287a38"
                    target="_blank"
                  >
                    Quick overview of the app
                  </Link>
                </Badge>
                <Badge>
                  <Link 
                    href="https://www.loom.com/share/51ac05bb506e4d46a26ae5468b79589c?sid=99b2ba57-04f5-412a-b864-0dc2bbbcd02d"
                    target="_blank"
                  >
                    Tutorial how to get an access token
                  </Link>
                </Badge>
                <Text>Email: jeff.dbb.file.explorer@gmail.com</Text>
                <Text>Password: dropboxFile1!</Text>

                <Link href="https://www.dropbox.com/developers" target="_blank">
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

import { useDispatch, useSelector } from "react-redux";

import {
  Icon,
  IconButton,
  Image,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";

import Overlay from "./Overlay";

import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from "@mui/icons-material/Download";

import { setPath } from "../store/slice/pathSlice";
import { setPending, setUpload } from "../store/slice/itemSlice";
import fetchLink from "../store/thunk/fetchLink";
import fetchContent from "../store/thunk/fetchContent";
import deleteItem from "../store/thunk/deleteItem";

const TableRow = ({ item }) => {
  const { pendingID, thumbs } = useSelector((state) => state.items);
  const { preview } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const toast = useToast();
  const thumbnailObj = thumbs.find((element) => element.id === item.id);

  const showToast = (response) => {
    if (response.error) {
      toast({
        title: "Error has occured",
        description: response.payload,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRedirect = () => {
    if (item[".tag"] === "folder") {
      dispatch(setPath(item["path_lower"]));
    } else {
      dispatch(setPending(item.id));
      dispatch(fetchLink({ path: item["path_lower"] }))
        .then(showToast)
        .finally(() => dispatch(setPending("")));
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    dispatch(setPending(item.id));
    dispatch(
      fetchContent({
        path: item["path_lower"],
        type: item[".tag"],
      })
      )
      .then(showToast)
      .finally(() => dispatch(setPending("")));
    };
    
  const handleDelete = (e) => {
    e.stopPropagation();

    dispatch(setPending(item.id));
    dispatch(deleteItem({
      path: item["path_lower"],
    }))
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
      dispatch(setPending(""))
      dispatch(setUpload())
    });
  }

  return (
    <Tr
      _hover={{
        bgColor: "gray.300",
        cursor: "pointer",
      }}
      transition="all 0.3s linear"
      position="relative"
      onClick={() => handleRedirect()}
    >
      <Th>
        {preview === "thumbs" && thumbnailObj && (
          <Image src={thumbnailObj.thumbnail} alt={item.name} />
        )}

        {(preview !== "thumbs" || !thumbnailObj) &&
          (item[".tag"] === "folder" ? (
            <Icon as={FolderIcon} />
          ) : (
            <Icon as={DescriptionIcon} />
          ))}
      </Th>
      <Th>{item.name}</Th>
      <Th>{item[".tag"]}</Th>
      <Th>
        {item[".tag"] === "file" && `${(item.size / 1024).toFixed(2)} KB`}
      </Th>
      <Th display='flex' gap={3}>
        <IconButton as={DownloadIcon} size="sm" onClick={handleDownload} />
        <IconButton as={DeleteIcon} size="sm" onClick={handleDelete} />
        {pendingID === item.id && <Overlay />}
      </Th>
    </Tr>
  );
};

export default TableRow;

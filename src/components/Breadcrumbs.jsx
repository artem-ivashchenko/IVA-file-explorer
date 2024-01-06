import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../store/slice/pathSlice";

const Breadcrumbs = () => {
  const path = useSelector((state) => state.path);
  const pathItems = path.split("/").filter(i => i);

  const dispatch = useDispatch();

  const handleRedirect = (newPath) => {
    const index = pathItems.indexOf(newPath);

    if(index === -1) {
      return;
    }

    const redirectTo = '/' + [...pathItems].slice(0, index + 1).join('/');

    dispatch(setPath(redirectTo));
  }

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => dispatch(setPath(''))}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathItems.map((item) => (
        <BreadcrumbItem key={item}>
          <BreadcrumbLink onClick={() => handleRedirect(item)}>
            {item}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

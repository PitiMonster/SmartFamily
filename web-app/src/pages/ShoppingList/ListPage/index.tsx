import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useParams } from "react-router-dom";

import shopImgPath from "../../../assets/images/shoppingListShop.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddShoppingItemModal from "./components/AddShoppingItemModal";

import { ShoppingItem as ShoppingItemType } from "../../../types";
import {
  deleteShoppingItem,
  getFamilyShoppingItems,
  updateShoppingItem,
} from "../../../store/shopping/actions";
import { toastSuccess } from "../../../utils/toasts";
import { setStatus } from "../../../store/utils/actions";

interface RenderItemOptions extends ShoppingItemType {
  handleRemoveItem: (name: string) => void;
  onClick: () => void;
}

interface SelectedItemType extends ShoppingItemType {
  title: string;
}

const ListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const shoppingList = useAppSelector((state) => state.shopping.shoppingList);
  const status = useAppSelector((state) => state.utils.status);
  const [currentAction, setCurrentAction] = useState<"delete" | "">("");

  const checkedShoppingList = useAppSelector(
    (state) => state.shopping.checkedShoppingList
  );
  const { groupId } = useParams<{ groupId: string }>();

  const [selectedShoppingItemData, setSelectedShoppingItemData] =
    useState<SelectedItemType>({
      _id: "",
      authorName: "",
      title: "Add item",
      name: "",
      count: 0,
      description: "",
      checked: false,
    });
  const [isAddShoppingItemModal, setIsAddShoppingItemModal] =
    useState<boolean>(false);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    dispatch(getFamilyShoppingItems(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddShoppingItemModal(false);
      setSelectedShoppingItemData({
        _id: "",
        authorName: "",
        title: "Add item",
        name: "",
        count: 0,
        description: "",
        checked: false,
      });
    }
  }, [isBackdrop]);

  useEffect(() => {
    if (status === "success") {
      if (currentAction === "delete") {
        toastSuccess("Item deleted successfully");
        dispatch(setStatus(null));
        setCurrentAction("");
      }
    }
  }, [status, currentAction, dispatch]);

  const handleOnItemClick = (type: "check" | "uncheck", itemId: string) => {
    dispatch(updateShoppingItem(groupId, itemId, type));
  };

  const handleRemoveItem = (itemId: string) => {
    if (itemId) {
      setCurrentAction("delete");
      dispatch(deleteShoppingItem(groupId, itemId));
    }
  };

  const renderItem = ({
    _id,
    name,
    authorName,
    count,
    checked,
    description,
    handleRemoveItem,
    onClick,
  }: RenderItemOptions) => (
    <ListItem
      sx={{ paddingLeft: 0 }}
      secondaryAction={
        <Stack direction="row" alignItems="center">
          <ListItemText
            primary={`${count} szt.`}
            sx={{ paddingRight: "1rem" }}
          />
          <IconButton
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveItem(_id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="info"
            title="Info"
            onClick={() => {
              setSelectedShoppingItemData({
                title: "Modify item",
                _id,
                authorName,
                name,
                count,
                description,
              });
              setIsAddShoppingItemModal(true);
            }}
            sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": name }}
            color={checked ? "info" : "primary"}
          />
        </ListItemIcon>
        <ListItemText id={name} primary={name} secondary={authorName} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.container__image}>
          <img className={classes.image} src={shopImgPath} alt="shop" />
          <p className={classes.attribution}>
            Building vector created by user15245033 - www.freepik.com
          </p>
        </div>
        <div className={classes.container__list}>
          <div className={classes.header}>
            <p className={classes.header__title}>Shopping List</p>
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddShoppingItemModal(true);
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.lists}>
            <List>
              <TransitionGroup>
                {shoppingList.map((item) => (
                  <Collapse key={item._id} in={!item.checked}>
                    {renderItem({
                      ...item,
                      handleRemoveItem: () => handleRemoveItem(item._id),
                      onClick: () => handleOnItemClick("check", item._id),
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            <List>
              <TransitionGroup>
                {checkedShoppingList.map((item) => (
                  <Collapse key={item._id} in={item.checked}>
                    {renderItem({
                      ...item,
                      handleRemoveItem: () => handleRemoveItem(item._id),
                      onClick: () => handleOnItemClick("uncheck", item._id),
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </div>
        </div>
      </div>
      {isAddShoppingItemModal && (
        <AddShoppingItemModal {...selectedShoppingItemData} groupId={groupId} />
      )}
    </ContentLayout>
  );
};

export default ListPage;

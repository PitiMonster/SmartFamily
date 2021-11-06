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

import { useAppSelector } from "../../../hooks";

import shopImgPath from "../../../assets/images/shoppingListShop.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddShoppingItemModal from "./components/AddShoppingItemModal";

interface RenderItemOptions {
  name: string;
  username: string;
  price: number;
  checked: boolean;
  description: string;
  handleRemoveItem: (name: string) => void;
  onClick: () => void;
}

interface SelectedShoppingItemData {
  title: string;
  name: string;
  price: number;
  description: string;
}

const ListPage: React.FC = () => {
  const [selectedShoppingItemData, setSelectedShoppingItemData] =
    useState<SelectedShoppingItemData>({
      title: "Add item",
      name: "",
      price: 0,
      description: "",
    });
  const [isAddShoppingItemModal, setIsAddShoppingItemModal] =
    useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<
    {
      name: string;
      username: string;
      price: number;
      checked: boolean;
      description: string;
    }[]
  >([]);
  const [checkedShoppingList, setCheckedShoppingList] = useState<
    {
      name: string;
      username: string;
      price: number;
      checked: boolean;
      description: string;
    }[]
  >([]);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddShoppingItemModal(false);
      setSelectedShoppingItemData({
        title: "Add item",
        name: "",
        price: 0,
        description: "",
      });
    }
  }, [isBackdrop]);

  useEffect(() => {
    const items = [
      {
        name: "Name1",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name2",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name3",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name4",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name5",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name6",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name7",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
      {
        name: "Name10",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
        description: "Temp description",
      },
    ];
    setShoppingList(items);
  }, []);

  const renderItem = ({
    name,
    username,
    price,
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
            primary={`${price.toFixed(2)}zł`}
            sx={{ paddingRight: "1rem" }}
          />
          <IconButton
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveItem(name)}
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
                name,
                price,
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
        <ListItemText id={name} primary={name} secondary={username} />
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
                  <Collapse in={item.checked}>
                    {renderItem({
                      name: item.name,
                      username: item.username,
                      price: item.price,
                      checked: item.checked,
                      description: item.description,
                      handleRemoveItem: (name) => {},
                      onClick: () => {
                        setShoppingList((prev) => {
                          const firstItem = prev[0];
                          firstItem.checked = !firstItem.checked;
                          const newList = prev.slice(1);
                          setCheckedShoppingList((prev) => [
                            firstItem,
                            ...prev,
                          ]);
                          return [...newList];
                        });
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            <List>
              <TransitionGroup>
                {checkedShoppingList.map((item) => (
                  <Collapse in={item.checked}>
                    {renderItem({
                      name: item.name,
                      username: item.username,
                      price: item.price,
                      checked: item.checked,
                      description: item.description,
                      handleRemoveItem: (name) => {},
                      onClick: () => {
                        setCheckedShoppingList((prev) => {
                          const firstItem = prev[0];
                          firstItem.checked = !firstItem.checked;
                          const newList = prev.slice(1);
                          setShoppingList((prev) => [firstItem, ...prev]);
                          return [...newList];
                        });
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </div>
        </div>
      </div>
      {isAddShoppingItemModal && (
        <AddShoppingItemModal {...selectedShoppingItemData} />
      )}
    </ContentLayout>
  );
};

export default ListPage;

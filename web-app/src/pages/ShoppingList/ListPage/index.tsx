import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
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

import classes from "./index.module.scss";

import shopImgPath from "../../../assets/images/shoppingListShop.jpg";
import { HtmlElements } from "../../../types";

import ContentLayout from "../../../layout/ContentLayout";

const ListPage: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<
    {
      name: string;
      username: string;
      price: number;
      checked: boolean;
    }[]
  >([]);
  const [checkedShoppingList, setCheckedShoppingList] = useState<
    {
      name: string;
      username: string;
      price: number;
      checked: boolean;
    }[]
  >([]);

  useEffect(() => {
    const items = [
      {
        name: "Name1",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name2",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name3",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name4",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name5",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name6",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name7",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
      {
        name: "Name8",
        username: "Pitimonster",
        price: 12.3,
        checked: false,
      },
    ];
    setShoppingList(items);
  }, []);

  interface RenderItemOptions {
    name: string;
    username: string;
    price: number;
    checked: boolean;
    handleRemoveItem: (name: string) => void;
    onClick: () => void;
  }

  const renderItem = ({
    name,
    username,
    price,
    checked,
    handleRemoveItem,
    onClick,
  }: RenderItemOptions) => (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveItem(name)}
        >
          <DeleteIcon />
        </IconButton>
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
        <ListItemText id={name} primary={name} />
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
            <IconButton color="primary" onClick={() => {}}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.list}>
            <List>
              <TransitionGroup>
                {shoppingList.map((item) => (
                  <Collapse in={item.checked}>
                    {renderItem({
                      name: item.name,
                      username: item.username,
                      price: item.price,
                      checked: item.checked,
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
          </div>
          <div className={classes.list}>
            <List>
              <TransitionGroup>
                {checkedShoppingList.map((item) => (
                  <Collapse in={item.checked}>
                    {renderItem({
                      name: item.name,
                      username: item.username,
                      price: item.price,
                      checked: item.checked,
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
    </ContentLayout>
  );
};

export default ListPage;

import * as MUIcon from "@mui/icons-material";
import { Stack, Rating, Link } from "@mui/material";
import "./ModalItem.scss";

interface ItemProps {
  title: string;
  value?: string | number;
  icon?: keyof typeof MUIcon;
  link?: string; // Nueva prop para el enlace
}
interface MyComponentProps {
  value: string | number | undefined;
  url: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ value, url }) => {
  const externalLink = url;

  return (
    <Link href={externalLink} target="_blank" rel="noopener noreferrer">
      {value}
    </Link>
  );
};

const ModalItem: React.FC<ItemProps> = ({ title, value, icon }) => {
  const Icon = icon && MUIcon[icon];

  return (
    <Stack
      className="modal-item"
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <div className="icon-title-container">
        {Icon && <Icon fontSize="medium" sx={{ px: 1 }} />}
        <h3 className="modal-item-title">{title}</h3>
      </div>
      {title === "Rating" && typeof value === "number" ? (
        <Rating name="read-only" value={value} readOnly />
      ) : null}
      {title === "Doc" && typeof value === "string" ? (
        <MyComponent url={value} value={value}></MyComponent>
      ) : (
        <p>{value}</p>
      )}
    </Stack>
  );
};

export default ModalItem;

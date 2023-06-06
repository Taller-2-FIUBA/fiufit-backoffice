import * as MUIcon from "@mui/icons-material";
import { Stack, Rating } from "@mui/material";
import "./ModalItem.scss";

interface ItemProps {
  title: string;
  value?: string | number;
  icon?: keyof typeof MUIcon;
}

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
      ) : (
        <p>{value}</p>
      )}
    </Stack>
  );
};

export default ModalItem;

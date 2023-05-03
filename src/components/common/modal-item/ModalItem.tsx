import * as MUIcon from "@mui/icons-material";
import {Stack} from '@mui/material';

interface ItemProps {
    title: string;
    value?: string;
    icon?: keyof typeof MUIcon
}

const ModalItem: React.FC<ItemProps> = ({title, value, icon}) => {
    const Icon = icon && MUIcon[icon]
    return (
        <Stack className='profile-item' spacing={2} direction="row" alignItems="center" justifyContent="space-between" >
            <div className='icon-title-container'>
                {Icon && <Icon fontSize="medium" sx={{ px: 1 }}/>}
                <h3 className='profile-item-title'>{title}</h3>
            </div>
            <p>{value}</p>
        </Stack>
    )
}

export default ModalItem;
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cardOptions = [
    { value: "5738", label: "Visa", logo: "https://res.cloudinary.com/du312ufuo/image/upload/v1740568396/visa_cmcgaf.svg" },
    { value: "2521", label: "AMEX", logo: "https://res.cloudinary.com/du312ufuo/image/upload/v1740568397/AMEX_q9stcu.svg" },
    { value: "0000", label: "MasterCard", logo: "https://res.cloudinary.com/du312ufuo/image/upload/v1740568397/mastercard_gmswdz.svg" },
];

export default function SelectLabels() {
    const [selectedCard, setSelectedCard] = React.useState(cardOptions[0]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const newCard = cardOptions.find(card => card.value === selectedValue);
        setSelectedCard(newCard);
    };

    return (
        <div>
            <FormControl sx={{ mt: 3, mb: 3, minWidth: 560 }}>
                <Select
                    value={selectedCard.value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={(selected) => {
                        const selectedItem = cardOptions.find(card => card.value === selected);
                        return selectedItem ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={selectedItem.logo} alt={selectedItem.label} style={{ width: 42, marginRight: 18 }} />
                                •••• {selectedItem.value}
                            </div>
                        ) : (
                            <em>Select a Payment Method</em>
                        );
                    }}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    {cardOptions.map((card) => (
                        <MenuItem key={card.value} value={card.value} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={card.logo} alt={card.label} style={{ width: 24, marginRight: 8 }} />
                            •••• {card.value}
                        </MenuItem>
                    ))}
                    <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

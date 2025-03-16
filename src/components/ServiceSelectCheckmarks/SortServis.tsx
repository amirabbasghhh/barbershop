"use client"
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Service {
  slug: string;
  title: string;
}

interface ServiceSelectCheckmarksProps {
  onChange: (slug: string[]) => void;
  selectedServices: string[];
}

const ServiceSelectCheckmarks: React.FC<ServiceSelectCheckmarksProps> = ({ onChange, selectedServices }) => {
  const [services, setServices] = React.useState<Service[]>([]);

  React.useEffect(() => {
    fetch('https://lookee.nwhco.ir/aapi/services/')
      .then((response) => response.json())
      .then((data) => setServices(data.results))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedServices>) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;
    onChange(selected);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="service-select-label">خدمات</InputLabel>
      <Select
        labelId="service-select-label"
        id="service-select"
        multiple
        value={selectedServices}
        onChange={handleChange}
        input={<OutlinedInput label="خدمات" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {services.map((service) => (
          <MenuItem key={service.slug} value={service.slug}>
            <Checkbox checked={selectedServices?.includes(service.slug)} />
            <ListItemText primary={service.title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceSelectCheckmarks;

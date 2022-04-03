import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import React, { ChangeEvent, useState } from 'react';
import { useImageInfo } from '../../../hooks/useImageInfo';

interface Props {
  onInsert: (e: string) => void;
  values: { files?: string[] | null; newFiles?: File[] | null };
}

const FILE_REPLACE_TEMPLATE = '{auto-link}';

export const InsertImage: React.FC<Props> = ({ onInsert, values }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [image, setImage] = useState('');
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageRatio, setImageRatio] = useState(1);
  const [imageAlign, setImageAlign] = useState('center');
  const { getImageDimensions } = useImageInfo();

  const files = React.useMemo(
    () =>
      [
        ...(values.files?.map((x) => ({ file: x, fileName: x, name: x.split('/')[1] ?? x })) ?? []),
        ...(values.newFiles?.map((x) => ({ file: x, fileName: x.name, name: x.name })) ?? []),
      ].filter((x) => /.(jpg|jpeg|png|gif)$/i.test(x.name)),
    [values.newFiles, values.files]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setImageWidth(0);
      setImageHeight(0);
      return;
    }

    const value = Number(e.target.value);
    if (value) {
      setImageHeight(value);
      setImageWidth(Math.round(value * imageRatio));
    }
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setImageWidth(0);
      setImageHeight(0);
      return;
    }

    const value = Number(e.target.value);
    if (value) {
      setImageWidth(value);
      setImageHeight(Math.round(value / imageRatio));
    }
  };

  const handleInsert = () => {
    if (!image) {
      return;
    }

    const isStatic = typeof files.find((x) => x.fileName === image)?.file === 'string';
    const src = `src="${isStatic ? process.env.REACT_APP_STATIC_URL : FILE_REPLACE_TEMPLATE}/${image}"`;
    const width = `width="${imageWidth}"`;
    const height = `height="${imageHeight}"`;
    const style = `style="${
      imageAlign === 'center'
        ? 'display:block;margin:auto'
        : `float:${imageAlign};margin-${imageAlign === 'left' ? 'right' : 'left'}:1rem`
    }"`;

    const img = `<img ${style} ${width} ${height} ${src} alt="" />`;

    onInsert(img);
    handleClose();

    setImage('');
    setImageWidth(0);
    setImageHeight(0);
  };

  return (
    <>
      <Button onClick={handleClick}>Insert image</Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 700, display: 'flex', gap: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="imageId-label">Image</InputLabel>
            <Select
              labelId="imageId-label"
              id="imageId"
              value={image}
              label="Image"
              onChange={(e) => {
                setImage(e.target.value);

                const image = files.find((x) => x.fileName === e.target.value)!;

                getImageDimensions(image.file).then((x) => {
                  setImageHeight(x.height);
                  setImageWidth(x.width);
                  setImageRatio(x.width / x.height);
                });
              }}
            >
              {files.map((x, i) => {
                return (
                  <MenuItem key={x.fileName} value={x.fileName}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="image-align-label">Align</InputLabel>
            <Select
              labelId="image-align-label"
              id="image-align"
              value={imageAlign}
              label="Image align"
              onChange={(e) => {
                setImageAlign(e.target.value);
              }}
            >
              <MenuItem value={'center'}>Center</MenuItem>
              <MenuItem value={'left'}>Left</MenuItem>
              <MenuItem value={'right'}>Right</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="image-width"
            label="Width"
            variant="outlined"
            value={imageWidth}
            onChange={handleWidthChange}
          />

          <TextField
            id="image-height"
            label="Height"
            variant="outlined"
            value={imageHeight}
            onChange={handleHeightChange}
          />

          <Button onClick={handleInsert}>Ok</Button>
        </Box>
      </Popover>
    </>
  );
};

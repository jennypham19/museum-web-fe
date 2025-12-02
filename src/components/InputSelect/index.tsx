import React from 'react';



import { Chip, CircularProgress, FormControl, FormHelperText, InputLabel, ListItem, ListSubheader, MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Theme } from '@mui/material';





export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode | React.ComponentType<any>;
}

export interface OptionGroup {
  label: string;
  value: string;
  options: Option[];
}

interface InputSelectProps {
  name: string;
  label: string;
  value: string | number | (string | number)[];
  onChange: (name: string, value: any) => void;
  options?: any[]; // dùng khi không group
  optionGroups?: OptionGroup[]; // dùng khi có group
  transformOptions?: (data: any[]) => Option[] | OptionGroup[];
  placeholder?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  multiple?: boolean;
  loading?:boolean;
  sx?: SxProps<Theme>;
  MenuProps?: SelectProps["MenuProps"];
  title?: string,
  loadingTitle?: string,
  renderChips?: boolean // hiển thị selected dưới dạng Chip
}

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  value,
  onChange,
  options = [],
  optionGroups,
  transformOptions,
  placeholder,
  error = false,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  multiple = false,
  loading=false,
  sx = {},
  MenuProps = undefined,
  title,
  loadingTitle,
  renderChips = false // default = text
}) => {

  const [visibleCount, setVisibleCount] = React.useState(10);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const handleScrollMenu = (event: any) => {
    const bottom =
      Math.abs(
        event.target.scrollTop +
        event.target.clientHeight -
        event.target.scrollHeight
      ) < 5;

    if (bottom && !isLoadingMore) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setVisibleCount((prev) => prev + 10);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = multiple ? event.target.value : event.target.value;
    onChange(name, selectedValue);
  };


  const finalOptions = React.useMemo(() => {
    if (transformOptions) return transformOptions(options);
    if (optionGroups) return optionGroups;
    return options;
  }, [options, optionGroups, transformOptions]);

  //Hàm render icon linh hoạt
  const renderIcon = (icon?: React.ReactNode | React.ComponentType<any>) => {
    if(!icon) return null;
    if(React.isValidElement(icon)) {
      // Nếu là JSX element, icon: <EventIcon color="error" />
      return React.cloneElement(icon as React.ReactElement, {
        style: { marginRight: 8, ...(icon.props.style || {})},
      });
    }

    if(typeof icon === 'function') {
      // Nếu là component function/class, icon: EventIcon
      const IconComp = icon as React.ComponentType<any>;
      return <IconComp style={{ marginRight: 8 }} fontSize="small"/>
    }

    return null;
  }

  const renderOptions = () => {
    if ( Array.isArray(finalOptions) && finalOptions.length > 0 && finalOptions[0] && 'options' in finalOptions[0]) {
      return (finalOptions as OptionGroup[]).map((group, i) => [
        <ListSubheader key={`group-${i}`}>{group.label}</ListSubheader>,
        ...group.options.slice(0, visibleCount).map((option) => {
          return(
            <MenuItem key={option.value} value={option.value}>
              {renderIcon(option.icon)}
              {`● ${option.label}`}
            </MenuItem>
          )
        }),
      ]);
    }

    
    


    if ((finalOptions as Option[]).length > 0) {
      const displayList = finalOptions.slice(0, visibleCount);
      return (displayList as Option[]).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {renderIcon(option.icon)}
          {option.label}
        </MenuItem>
      ));
    }
    
    if (isLoadingMore) {
      return (
        <MenuItem disabled sx={{ justifyContent: 'center' }}>
          <CircularProgress size={20} />
        </MenuItem>
      );
    }
    return <MenuItem sx={{ fontSize: '14px'}} disabled>{title}</MenuItem>;
    
  };

  const getSelectedLabel = () => {
    const allOptions = Array.isArray(finalOptions) && finalOptions[0] && 'options' in finalOptions[0]
      ? (finalOptions as OptionGroup[]).flatMap((g) => g.options)
      : (finalOptions as Option[]);

    if (multiple && Array.isArray(value)) {
      if(renderChips){
        return (
          value.map((val) => {
            const opt = allOptions.find((o) => o.value === val);
            return (
              <Chip
                key={val}
                label={opt?.label || val}
                size="small"
                onDelete={() =>
                  onChange(
                    name,
                    (value as (string | number)[]).filter((s) => s !== val)
                  )
                }
              />
            );
          })
        )
      }else{
        return value
        .map((v) => allOptions.find((o) => o.value === v)?.label || v)
        .join(', ');
      }
    }
    return allOptions.find((o) => o.value === value)?.label || '';
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgb(53, 50, 50)',
          borderRadius: '8px',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgb(53, 50, 50)',
        },
        ...sx,
      }}
    >
      <InputLabel sx={{ fontSize: '14px', mt: 0.5 }} id={`${name}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        value={multiple ? (Array.isArray(value) ? value : value ? [value] : []) : value}
        onChange={handleChange}
        label={label}
        multiple={multiple}
        displayEmpty
        onOpen={() => {
          setVisibleCount(10);
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': { fontSize: '13px', py: 0.7 },
              maxHeight: 300,
            },
            onScroll: handleScrollMenu,
          }
        }}
        renderValue={(selected) => {
          if ((multiple && Array.isArray(selected) && selected.length === 0) || !selected) {
            return <span style={{ color: '#aaa' }}>{placeholder}</span>;
          }

          return getSelectedLabel();
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} /> &nbsp; {loadingTitle}
          </MenuItem>
        ) : (
          renderOptions()
        )}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputSelect;
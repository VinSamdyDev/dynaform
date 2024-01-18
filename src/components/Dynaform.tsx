import React from 'react'
import { ErrorMessage, Form, useFormikContext } from 'formik'
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'
import axios from 'axios'
import { get } from 'lodash'

export type FieldOption = {
  label: string
  value: string
}

export type FieldConfig =
  | {
      type: 'radio'
      name: string
      label: string
      options: FieldOption[]
      defaultValue: FieldOption
    }
  | {
      type: 'checkbox'
      name: string
      label: string
      options: FieldOption[]
      defaultValue: FieldOption[]
    }
  | {
      type: 'text' | 'email' | 'password'
      name: string
      label: string
      defaultValue: string
    }
  | {
      type: 'number'
      name: string
      label: string
      defaultValue: number
    }
  | {
      type: 'switch'
      name: string
      label: string
      defaultValue: boolean
    }
  | {
      type: 'slider'
      name: string
      label: string
      defaultValue: number
      max: number
      min: number
    }
  | {
      type: 'autocomplete'
      name: string
      label: string
      multiple: true
      options: FieldOption[]
      defaultValue: FieldOption[]
    }
  | {
      type: 'autocomplete'
      name: string
      label: string
      multiple: false
      options: FieldOption[]
      defaultValue: FieldOption
    }
  | {
      type: 'date'
      name: string
      label: string
      defaultValue: Date | null
    }
  | {
      type: 'time'
      name: string
      label: string
      defaultValue: Date | null
    }
  | {
      type: 'datetime'
      name: string
      label: string
      defaultValue: Date | null
    }
  | {
      type: 'editor'
      name: string
      label: string
      defaultValue: string
    }

export interface DynamicFormProps {
  formConfig: FieldConfig[]
  size?: 'small' | 'medium'
}

export const useDynaform = (formConfig: FieldConfig[]) => {
  const formikInitialValues = formConfig.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }), {})
  const RenderForm = (size?: 'small' | 'medium') => <Dynaform formConfig={formConfig} size={size} />

  return {
    dynaformConfig: formConfig,
    formikInitialValues,
    RenderForm,
  }
}

type CrudConfig = {
  readOne: string
  readAll: string
  create: string
  update: string
  remove: string
}

type CrudRes = {
  readOne: (id: string) => Promise<any>
  readAll: () => Promise<any>
  create: (data: any) => Promise<any>
  update: (id: string, data: any) => Promise<any>
  remove: (id: string) => Promise<any>
}

export const useCrud = (config: CrudConfig): CrudRes => {
  const readOne = async (id: string) => {
    try {
      const res = await axios.get(config.readOne + id)
      return res.data
    } catch (error) {
      return null
    }
  }

  const readAll = async () => {
    try {
      const res = await axios.get(config.readAll)
      return res.data
    } catch (error) {
      return []
    }
  }

  const create = async (data: any) => {
    try {
      const res = await axios.post(config.create, data)
      return res.data
    } catch (error) {
      return null
    }
  }

  const update = async (id: string, data: any) => {
    try {
      const res = await axios.put(config.update + id, data)
      return res.data
    } catch (error) {
      return null
    }
  }

  const remove = async (id: string) => {
    try {
      const res = await axios.delete(config.remove + id)
      return res.data
    } catch (error) {
      return null
    }
  }

  return {
    readOne,
    readAll,
    create,
    update,
    remove,
  }
}

export const Dynaform = ({ formConfig, size = 'medium' }: DynamicFormProps) => {
  const formik = useFormikContext()
  const { setFieldValue } = formik

  const renderField = (field: FieldConfig) => {
    const value = get(formik.values, field.name, field.defaultValue) as any

    switch (field.type) {
      case 'text':
        return (
          <div>
            <TextField
              label={field.label}
              name={field.name}
              fullWidth
              size={size}
              type='text'
              onChange={(event) => setFieldValue(field.name, event.target.value)}
              defaultValue={field.defaultValue}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'email':
        return (
          <div>
            <TextField
              label={field.label}
              name={field.name}
              fullWidth
              size={size}
              type='email'
              defaultValue={field.defaultValue}
              onChange={(event) => setFieldValue(field.name, event.target.value)}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'password':
        return (
          <div>
            <TextField
              label={field.label}
              name={field.name}
              fullWidth
              size={size}
              type='password'
              defaultValue={field.defaultValue}
              onChange={(event) => setFieldValue(field.name, event.target.value)}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'number':
        return (
          <div>
            <TextField
              label={field.label}
              name={field.name}
              fullWidth
              size={size}
              type='number'
              defaultValue={field.defaultValue}
              onChange={(event) => setFieldValue(field.name, event.target.value)}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'autocomplete':
        return (
          <div>
            <Autocomplete
              multiple={field.multiple}
              options={field.options}
              getOptionLabel={(option: any) => option.label}
              renderInput={(params: any) => <TextField {...params} label={field.label} />}
              defaultValue={field.defaultValue}
              size={size}
              onChange={(_, newValue) => {
                setFieldValue(field.name, newValue)
              }}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'checkbox':
        return (
          <div>
            <Typography variant='subtitle2'>{field.label}</Typography>
            <Grid container spacing={1}>
              {field.options.map((option: FieldOption) => (
                <Grid item xs={12} md={6} key={option.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={size}
                        defaultChecked={field.defaultValue.some((v: FieldOption) => v.value === option.value)}
                      />
                    }
                    label={option.label}
                    name={option.value}
                    onChange={(_, checked) => {
                      if (checked) {
                        setFieldValue(field.name, [...value, option])
                      } else {
                        setFieldValue(
                          field.name,
                          value.filter((v: FieldOption) => v.value !== option.value),
                        )
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'radio':
        return (
          <div>
            <Typography variant='subtitle2'>{field.label}</Typography>
            <RadioGroup
              row
              defaultValue={field.defaultValue.value}
              onChange={(event) => {
                setFieldValue(
                  field.name,
                  field.options.find((option: FieldOption) => option.value === event.target.value),
                )
              }}
            >
              <Grid container spacing={1}>
                {field.options.map((option: FieldOption) => (
                  <Grid item xs={12} md={6} key={option.value}>
                    <FormControlLabel
                      control={<Radio size={size} />}
                      label={option.label}
                      name={field.name}
                      value={option.value}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'slider':
        return (
          <div>
            <Typography variant='subtitle2'>{field.label}</Typography>
            <Slider
              defaultValue={field.defaultValue}
              size={size}
              max={field.max}
              min={field.min}
              valueLabelDisplay='auto'
              onChange={(_, newValue) => {
                setFieldValue(field.name, newValue)
              }}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'switch':
        return (
          <div>
            <FormControlLabel
              name={field.name}
              control={
                <Switch
                  size={size}
                  defaultChecked={field.defaultValue}
                  onChange={(_, checked) => {
                    if (checked) {
                      setFieldValue(field.name, true)
                    } else {
                      setFieldValue(field.name, false)
                    }
                  }}
                />
              }
              label={field.label}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'date':
        return (
          <div>
            <DatePicker
              label={field.label}
              defaultValue={dayjs(field.defaultValue)}
              onChange={(newValue) => setFieldValue(field.name, newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
              format='DD/MM/YYYY'
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'time':
        return (
          <div>
            <TimePicker
              label={field.label}
              defaultValue={dayjs(field.defaultValue)}
              onChange={(newValue) => setFieldValue(field.name, newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )
      case 'datetime':
        return (
          <div>
            <DateTimePicker
              label={field.label}
              defaultValue={dayjs(field.defaultValue)}
              onChange={(newValue) => setFieldValue(field.name, newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
              format='DD/MM/YYYY hh:mm A'
            />
            <ErrorMessage name={field.name} component={Typography} />
          </div>
        )

      case 'editor':
        return (
          <Box
            sx={{
              '& .ql-toolbar': {
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              },
              '& .ql-container': {
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                minHeight: '400px',
              },
            }}
          >
            <ReactQuill
              theme='snow'
              defaultValue={field.defaultValue}
              onChange={(content) => setFieldValue(field.name, content)}
            />
            <ErrorMessage name={field.name} component={Typography} />
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Form>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          {formConfig.map((field, index) => (
            <Grid
              item
              key={index}
              {...(field.type === 'editor'
                ? { xs: 12, sm: 12, md: 12 }
                : {
                    xs: 12,
                    sm: 6,
                    md: 4,
                  })}
            >
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </LocalizationProvider>
    </Form>
  )
}

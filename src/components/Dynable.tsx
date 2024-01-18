import React, { useState } from 'react'
import {
  Checkbox,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const icon = (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'>
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='32'
      d='M352 176L217.6 336L160 272'
    />
    <rect
      width='384'
      height='384'
      x='64'
      y='64'
      fill='none'
      stroke='currentColor'
      strokeLinejoin='round'
      strokeWidth='32'
      rx='48'
      ry='48'
    />
  </svg>
)
const checkedIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'>
    <path
      fill='currentColor'
      d='M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58'
    />
  </svg>
)
const filterIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
    <path
      fill='currentColor'
      d='M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m2 5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m2 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1'
    />
  </svg>
)

interface Column {
  id: string
  label: string
}

interface TableConfig {
  columns: Column[]
  data: Record<string, any>[]
  actions?: (row: Record<string, any>) => React.ReactNode
}

export const Dynable: React.FC<TableConfig> = ({ columns, data, actions }) => {
  const [filterMenu, setFilterMenu] = useState<any>(null)
  const [selectedColumns, setSelectedColumns] = useState<string[]>(() => columns.map((column) => column.id))
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  })

  const handleSort = (columnId: string) => {
    const direction = sortConfig.key === columnId && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key: columnId, direction })
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const keyA = a[sortConfig.key]
    const keyB = b[sortConfig.key]

    if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1
    if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1

    return 0
  })

  return (
    <Stack gap={1} py={1}>
      <Stack direction='row' alignItems='center' justifyContent='flex-end'>
        <Button
          variant='contained'
          onClick={(e) => setFilterMenu(e.currentTarget)}
          color='primary'
          endIcon={filterIcon}
        >
          Filter Columns
        </Button>
        <Popover
          open={Boolean(filterMenu)}
          anchorEl={filterMenu}
          onClose={() => setFilterMenu(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              minWidth: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
            },
          }}
        >
          {columns.map((column) => (
            <MenuItem
              key={column.id}
              onClick={() =>
                setSelectedColumns((prev) =>
                  prev.includes(column.id) ? prev.filter((id) => id !== column.id) : [...prev, column.id],
                )
              }
              sx={{ cursor: 'pointer', minWidth: '200px' }}
            >
              <Checkbox checked={selectedColumns.includes(column.id)} icon={icon} checkedIcon={checkedIcon} />
              <div>{column.label}</div>
            </MenuItem>
          ))}
        </Popover>
      </Stack>
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => selectedColumns.includes(column.id))
                .map((column) => (
                  <TableCell key={column.id} onClick={() => handleSort(column.id)}>
                    {column.label}
                    {sortConfig.key === column.id && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
                  </TableCell>
                ))}
              {actions && <TableCell align='right'>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns
                  .filter((column) => selectedColumns.includes(column.id))
                  .map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                {actions && <TableCell align='right'>{actions(row)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

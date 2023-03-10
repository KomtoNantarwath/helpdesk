// ** React Imports
import {  useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/invoice'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import SupportIssueTotal from 'src/views/support/SupportIssueTotal'
import SupportCardStatics from 'src/views/support/SupportCardStatics'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import SupportCardPieTotal from 'src/views/support/SupportCardPieTotal'

interface InvoiceStatusObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}


interface CellType {
  row: InvoiceType
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj: InvoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'mdi:send' },
  Paid: { color: 'success', icon: 'mdi:check' },
  Draft: { color: 'primary', icon: 'mdi:content-save-outline' },
  'Partial Payment': { color: 'warning', icon: 'mdi:chart-pie' },
  'Past Due': { color: 'error', icon: 'mdi:information-outline' },
  Downloaded: { color: 'info', icon: 'mdi:arrow-down' }
}

// ** renders client column
const renderClient = (row: InvoiceType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: '#',
    renderCell: ({ row }: CellType) => <StyledLink href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</StyledLink>
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'invoiceStatus',
    renderHeader: () => (
      <Box sx={{ display: 'flex', color: 'action.active' }}>
        <Icon icon='mdi:trending-up' fontSize={20} />
      </Box>
    ),
    renderCell: ({ row }: CellType) => {
      const { dueDate, balance, invoiceStatus } = row

      const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

      return (
        <Tooltip
          title={
            <div>
              <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                {invoiceStatus}
              </Typography>
              <br />
              <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                Balance:
              </Typography>{' '}
              {balance}
              <br />
              <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                Due Date:
              </Typography>{' '}
              {dueDate}
            </div>
          }
        >
          <CustomAvatar skin='light' color={color} sx={{ width: 34, height: 34 }}>
            <Icon icon={invoiceStatusObj[invoiceStatus].icon} fontSize='1.25rem' />
          </CustomAvatar>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 300,
    headerName: 'Client',
    renderCell: ({ row }: CellType) => {
      const { name, companyEmail } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {name}
            </Typography>
            <Typography noWrap variant='caption'>
              {companyEmail}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'total',
    headerName: 'Total',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`$${row.total || 0}`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'issuedDate',
    headerName: 'Issued Date',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.issuedDate}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }: CellType) => {
      return row.balance !== 0 ? (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.balance}
        </Typography>
      ) : (
        <CustomChip size='small' skin='light' color='success' label='Paid' />
      )
    }
  }
]


const SupportDashbord = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.invoice)

  useEffect(() => {
    dispatch(
      fetchData({
        dates:[],
        q: '',
        status: ''
      })
    )
  }, [dispatch])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Send Message'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => alert('Send Message : '+row.id)}>
              <Icon icon='carbon:send-alt' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
          <SupportIssueTotal />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <SupportCardStatics
            stats='10'
            color='success'
            trendNumber='+22%'
            title='Task Open'
            chipText='Today'
            icon={<Icon icon='pajamas:issue-new' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <SupportCardStatics
            stats='15'
            color='primary'
            trendNumber='+38%'
            title='Task Total'
            chipText='Last 1 Month'
            icon={<Icon icon='pajamas:issue-update' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <SupportCardPieTotal />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rows={store.data}
              columns={columns}
              disableSelectionOnClick
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default SupportDashbord

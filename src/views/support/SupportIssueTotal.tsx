// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Styled component for the trophy image
const TrophyImg = styled('img')(({ theme }) => ({
  right: 22,
  bottom: 0,
  width: 106,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 95
  }
}))

const SupportIssueTotal = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>
          ภาพรวมระบบตั่วระบบ{' '}
          <Box component='span' sx={{ fontWeight: 'bold' }}>
          NAV
          </Box>
          ! 🎉
        </Typography>
        <Typography variant='body2' sx={{ mb: 3.25 }}>
          แจ้งปัญหามาทั้งหมด
        </Typography>
        <Box sx={{display:"flex" , alignItems:'center' ,mb: 8.25}}>
          <Typography variant='h5' sx={{ fontWeight: 600, color: 'primary.main' }}>
            350
          </Typography>
          <Typography variant='body2' sx={{ml:1.25}}>
            รายการ
          </Typography>
        </Box>
        <Button size='small' variant='contained'>
          เปิดตั๋ว
        </Button>
        <TrophyImg alt='trophy' src='/images/cards/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default SupportIssueTotal

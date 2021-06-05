import Calendar from 'react-github-contribution-calendar'

interface GraphProps {
  values: { [key: string]: number }
  until: string
}

export function Graph({ values, until }: GraphProps) {
  const panelColors = ['#EEEEEE', '#D6E685', '#8CC665', '#44A340', '#1E6823']
  const weekNames: string[] = ['', 'Mon', '', 'Wed', '', 'Fri', '']
  const monthNames: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return (
    <Calendar
      values={values}
      until={until}
      panelColors={panelColors}
      weekNames={weekNames}
      monthNames={monthNames}
      dateFormat={'YYYY-MM-DD'}
    />
  )
}

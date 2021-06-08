import React, { ReactElement } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Measure, { BoundingRect } from 'react-measure'
import ReactTooltip from 'react-tooltip'

interface Props {
  weekNames: string[]
  monthNames: string[]
  panelColors: string[]
  values: { [date: string]: number }
  until: string
  dateFormat: string
}

interface State {
  columns: number
  maxWidth: number
  contribution: string
}

export default class GitHubCalendar extends React.Component<Props, State> {
  monthLabelHeight: number
  weekLabelWidth: number
  panelSize: number
  panelMargin: number

  constructor(props: any) {
    super(props)

    this.monthLabelHeight = 15
    this.weekLabelWidth = 15
    this.panelSize = 11
    this.panelMargin = 2
    this.state = {
      columns: 53,
      maxWidth: 53,
      contribution: '',
    }
  }

  getPanelPosition(row: number, col: number) {
    const bounds = this.panelSize + this.panelMargin
    return {
      x: this.weekLabelWidth + bounds * row,
      y: this.monthLabelHeight + bounds * col,
    }
  }

  makeCalendarData(
    history: { [k: string]: number },
    lastDay: string,
    columns: number
  ) {
    const d = dayjs(lastDay, { format: this.props.dateFormat })
    const lastWeekend = d.endOf('week')
    const endDate = d.endOf('day')

    var result: ({ value: number; month: number; date: Dayjs } | null)[][] = []
    for (var i = 0; i < columns; i++) {
      result[i] = []
      for (var j = 0; j < 7; j++) {
        var date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day')
        if (date <= endDate) {
          result[i][j] = {
            value: history[date.format(this.props.dateFormat)] || 0,
            month: date.month(),
            date,
          }
        } else {
          result[i][j] = null
        }
      }
    }

    return result
  }

  componentDidUpdate(prevState: any, nextState: any) {
    ReactTooltip.rebuild()
  }

  render() {
    const columns = this.state.columns
    const values = this.props.values
    const until = this.props.until

    var contributions = this.makeCalendarData(values, until, columns)
    var innerDom: ReactElement[] = []

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j]
        if (contribution === null) continue
        const pos = this.getPanelPosition(i, j)
        const color = this.props.panelColors[contribution.value]
        const { value, date } = contribution
        const dom = (
          <rect
            key={'panel_key_' + i + '_' + j}
            data-for={'panel_key_' + i + '_' + j}
            data-tip
            x={pos.x}
            y={pos.y}
            rx="4"
            width={this.panelSize}
            height={this.panelSize}
            fill={color}
            onMouseEnter={() => {
              this.setState({
                ...this.state,
                contribution: `${value} tasks done on ${date.format(
                  'MMM DD, YYYY'
                )}`,
              })
              this.forceUpdate()
            }}
          ></rect>
        )
        innerDom.push(dom)
      }
    }

    // week texts
    for (var i = 0; i < this.props.weekNames.length; i++) {
      const textBasePos = this.getPanelPosition(0, i)
      const dom = (
        <text
          key={'week_key_' + i}
          style={{
            fontSize: 9,
            color: 'black',
            alignmentBaseline: 'central',
            fill: '#AAA',
          }}
          x={textBasePos.x - this.panelSize / 2 - 2}
          y={textBasePos.y + this.panelSize / 2}
          textAnchor={'middle'}
        >
          {this.props.weekNames[i]}
        </text>
      )
      innerDom.push(dom)
    }

    // month texts
    var prevMonth = -1
    for (var i = 1; i < columns; i++) {
      const c = contributions[i][0]
      if (c === null) continue
      if (c.month != prevMonth) {
        var textBasePos = this.getPanelPosition(i, 0)
        innerDom.push(
          <text
            key={'month_key_' + i}
            style={{
              fontSize: 10,
              color: 'black',
              alignmentBaseline: 'central',
              fill: '#AAA',
            }}
            x={textBasePos.x + this.panelSize / 2}
            y={textBasePos.y - this.panelSize / 2 - 2}
            textAnchor={'middle'}
          >
            {this.props.monthNames[c.month]}
          </text>
        )
      }
      prevMonth = c.month
    }

    return (
      <Measure bounds onResize={(rect) => this.updateSize(rect.bounds)}>
        {({ measureRef }: any) => (
          <div ref={measureRef} style={{ width: '100%' }}>
            <svg
              data-for={'panel_key_'}
              data-tip
              style={{
                fontFamily:
                  'Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif',
                width: '100%',
              }}
              height="110"
            >
              {innerDom}
            </svg>
            <ReactTooltip id={'panel_key_'}>
              <span> {this.state.contribution}</span>
            </ReactTooltip>
          </div>
        )}
      </Measure>
    )
  }

  updateSize(size?: BoundingRect) {
    if (!size) return

    const visibleWeeks = Math.floor((size.width - this.weekLabelWidth) / 13)
    this.setState({
      columns: Math.min(visibleWeeks, this.state.maxWidth),
    })
  }
}

// @ts-ignore
GitHubCalendar.defaultProps = {
  weekNames: ['', 'M', '', 'W', '', 'F', ''],
  monthNames: [
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
  ],
  panelColors: ['#EEE', '#DDD', '#AAA', '#444'],
  dateFormat: 'YYYY-MM-DD',
}

interface TooltipProps {
  contributions: number
  day: string
  isHide: boolean
}

const Tooltip = ({ contributions, day, isHide }: TooltipProps) => {
  // if (isHide) return null
  const contributionText = contributions ? (
    <p>No contributions on {day}</p>
  ) : (
    <p>
      {contributions} contributions on {day}
    </p>
  )

  return (
    <ReactTooltip id="happyFace">
      <span
        style={{
          backgroundColor: 'black',
          borderRadius: '5px',
          fontWeight: 'bolder',
        }}
      >
        {contributionText}
      </span>
    </ReactTooltip>
  )
}

import { useMemo } from "react"

import { Card, Grid, CardContent, CardProps } from "@mui/material"

import LabelText from "./label-text"

import type { LabelTextProps } from "./types"

type LabelTextContainerProps = {
  listText: LabelTextProps[]
  col?: number
  cardProps?: CardProps
}

const LabelTextContainer = ({ listText, col = 4, cardProps }: LabelTextContainerProps) => {

  const md = useMemo(() => {
    function getMappedValue(input: number) {
      if (input > 0 && input <= 12) {
        return 12 / input;
      }

      return 12
    }

    return getMappedValue(col)
  }, [col])

  return (
    <Card variant="outlined" {...cardProps}>
      <CardContent>
        <Grid container spacing={2}>
          {
            listText.map((it, index) => {
              return (
                <Grid item xs={12} md={md * (it.colSpan || 1)} key={index} >
                  <LabelText {...it} />
                </Grid>
              )
            })
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LabelTextContainer
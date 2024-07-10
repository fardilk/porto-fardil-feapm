import { useMemo } from "react"

import { Card, CardContent, Grid } from "@mui/material"

import LabelText from "./label-text"
import type { LabelTextContainerProps } from "./types"
import { getGridLayoutMappedValue } from "src/utils/helper"

const LabelTextContainer = ({ listText, col = 4, cardProps }: LabelTextContainerProps) => {

  const md = useMemo(() => {
    return getGridLayoutMappedValue(col)
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
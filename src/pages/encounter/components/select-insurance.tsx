import { LabelTextContainer } from "src/components/label-text"
import { LabelTextProps } from "src/components/label-text/types"
import { fDate } from "src/utils/format-time"

const SelectInsurance = () => {

  const listInsuranceAvailable = [
    {
      "Benefit": "Mandiri Inhealth Gold",
      "Masa Berlaku": fDate(new Date(), "DD-MM-YYYY"),
      "No Polis": "100200",
      "No Jaminan": "1002001",
      "No Inhealth": "10020011",
      "Hak Kelas Inhealth": "Gold"
    }
  ]

  const listInsuranceToCard = (param: typeof listInsuranceAvailable[0]): LabelTextProps[] => {
    return Object.keys(param).map((key, value) => {
      return {
        title: key,
        body: (param as any)[key]
      }
    })
  }



  return (
    <>
      {
        listInsuranceAvailable.map((row) => {
          const textData = listInsuranceToCard(row)

          return (
            <LabelTextContainer
              col={1}
              cardProps={{ variant: "elevation" }}
              orientation="horizontal"
              listText={textData}
            />
          )
        })
      }
    </>
  )
}

export default SelectInsurance